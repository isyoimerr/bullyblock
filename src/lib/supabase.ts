import { createClient } from '@supabase/supabase-js'
import type { Mensaje, Nota, Perfil, Reporte, Rol } from './types'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
const DEMO_MODE = !url || !key || /TU-PROYECTO|tu-clave/i.test(String(url + key))

const STORAGE_KEY = 'bullyblock-demo-db-v1'

type DemoUser = {
  id: string
  email: string
  password: string
  user_metadata: Record<string, unknown>
}

type DemoState = {
  users: DemoUser[]
  profiles: Perfil[]
  reports: Reporte[]
  mensajes: Mensaje[]
  notas: Nota[]
  session: { user: { id: string; email: string; app_metadata?: Record<string, unknown> }; access_token: string } | null
}

const iso = () => new Date().toISOString()

function recordar(sesion: DemoState) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sesion))
  }
}

function leerEstado(): DemoState {
  if (typeof window === 'undefined') {
    return crearEstadoBase()
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return crearEstadoBase()
    const parsed = JSON.parse(raw) as DemoState
    if (parsed.users && parsed.profiles && parsed.reports) return parsed
  } catch {
    // ignore
  }

  return crearEstadoBase()
}

function obtenerRol(email: string): Rol {
  const e = email.toLowerCase()
  if (e.includes('admin')) return 'admin'
  if (e.includes('orientacion') || e.includes('psico') || e.includes('personal')) return 'psicoorientador'
  if (e.includes('docente')) return 'docente'
  return 'estudiante'
}

function crearEstadoBase(): DemoState {
  const base = new Date().toISOString()
  const estudianteId = 'demo-estudiante-id'
  const orientadorId = 'demo-orientador-id'
  const adminId = 'demo-admin-id'

  const perfiles: Perfil[] = [
    {
      id: estudianteId,
      nombre: 'Ana Gómez',
      documento: '10000001',
      grado: 9,
      grupo: 'A',
      rol: 'estudiante',
      activo: true,
      aprobado: true,
      creado_en: base,
    },
    {
      id: orientadorId,
      nombre: 'Lucía Morales',
      documento: '20000001',
      grado: null,
      grupo: null,
      rol: 'psicoorientador',
      activo: true,
      aprobado: true,
      creado_en: base,
    },
    {
      id: adminId,
      nombre: 'Carlos Ruiz',
      documento: '30000001',
      grado: null,
      grupo: null,
      rol: 'admin',
      activo: true,
      aprobado: true,
      creado_en: base,
    },
  ]

  const reports: Reporte[] = [
    {
      id: 'demo-reporte-1',
      codigo: 'BB-2026-0001',
      reportante_id: estudianteId,
      tipo: 'acoso',
      descripcion: 'Me empujaron y me dijeron comentarios ofensivos en el patio durante el descanso.',
      lugar: 'patio',
      fecha_hecho: iso(),
      involucrados: 'Mateo y otros dos estudiantes',
      urgente: false,
      prioridad: 'normal',
      estado: 'nuevo',
      asignado_a: orientadorId,
      creado_en: base,
      actualizado_en: base,
      reportante: { nombre: 'Ana Gómez', grado: 9, grupo: 'A' },
    },
  ]

  const users: DemoUser[] = [
    { id: estudianteId, email: 'demo@estudiante.com', password: 'demo1234', user_metadata: { nombre: 'Ana Gómez', documento: '10000001', grado: 9, grupo: 'A' } },
    { id: orientadorId, email: 'orientacion@estudiante.com', password: 'demo1234', user_metadata: { nombre: 'Lucía Morales' } },
    { id: adminId, email: 'admin@estudiante.com', password: 'demo1234', user_metadata: { nombre: 'Carlos Ruiz' } },
  ]

  return { users, profiles: perfiles, reports, mensajes: [], notas: [], session: null }
}

function clonar<T>(valor: T): T {
  return JSON.parse(JSON.stringify(valor)) as T
}

function normalizarPerfil(user: DemoUser): Perfil {
  const rol = obtenerRol(user.email)
  return {
    id: user.id,
    nombre: String(user.user_metadata.nombre ?? user.email.split('@')[0]),
    documento: (user.user_metadata.documento as string | undefined) ?? null,
    grado: typeof user.user_metadata.grado === 'number' ? Number(user.user_metadata.grado) : null,
    grupo: (user.user_metadata.grupo as string | undefined) ?? null,
    rol,
    activo: true,
    aprobado: true,
    creado_en: iso(),
  }
}

function obtenerPorTablas(tabla: string, estado: DemoState) {
  const map = {
    perfiles: estado.profiles,
    reportes: estado.reports,
    mensajes: estado.mensajes,
    notas_internas: estado.notas,
  } as const
  return map[tabla as keyof typeof map] ?? []
}

function seleccionarCampos<T extends Record<string, any>>(obj: T, campos: string): T {
  if (!campos || campos === '*') return obj
  if (campos.includes('codigo')) return { codigo: obj.codigo } as unknown as T
  return obj
}

class MockQuery {
  private table: string
  private state: DemoState
  private filters: Array<{ tipo: 'eq' | 'in'; campo: string; valor: unknown }> = []
  private orderBy?: { campo: string; asc: boolean }
  private limitValue?: number
  private selectValue = '*'
  private action?: 'select' | 'insert' | 'update'
  private insertPayload?: Record<string, unknown>
  private updatePayload?: Record<string, unknown>
  private lastInserted?: unknown

  constructor(tabla: string, estado: DemoState) {
    this.table = tabla
    this.state = estado
  }

  select(campos = '*') {
    this.selectValue = campos
    return this
  }

  eq(campo: string, valor: unknown) {
    this.filters.push({ tipo: 'eq', campo, valor })
    return this
  }

  in(campo: string, valores: unknown[]) {
    this.filters.push({ tipo: 'in', campo, valor: valores })
    return this
  }

  order(campo: string, opciones: { ascending?: boolean } = {}) {
    this.orderBy = { campo, asc: opciones.ascending ?? true }
    return this
  }

  limit(valor: number) {
    this.limitValue = valor
    return this
  }

  insert(payload: Record<string, unknown>) {
    this.action = 'insert'
    this.insertPayload = payload
    return this
  }

  update(payload: Record<string, unknown>) {
    this.action = 'update'
    this.updatePayload = payload
    return this
  }

  maybeSingle() {
    return Promise.resolve(this.ejecutar()).then((res) => ({ data: Array.isArray(res.data) ? res.data[0] ?? null : res.data ?? null, error: res.error }))
  }

  single() {
    return Promise.resolve(this.ejecutar()).then((res) => ({ data: Array.isArray(res.data) ? res.data[0] ?? null : res.data ?? null, error: res.error }))
  }

  then(resolve: (value: { data: unknown; error: null }) => unknown, reject?: (reason?: unknown) => unknown) {
    return Promise.resolve(this.ejecutar()).then(resolve, reject)
  }

  private ejecutar() {
    if (this.action === 'insert' && this.insertPayload) {
      const nuevo = { ...this.insertPayload } as Record<string, unknown>
      const baseId = crypto.randomUUID ? crypto.randomUUID() : `mock-${Date.now()}`
      const now = iso()

      if (this.table === 'reportes') {
        const numero = (this.state.reports.length + 1).toString().padStart(4, '0')
        const codigo = `BB-2026-${numero}`
        const creado: Reporte = {
          id: baseId,
          codigo,
          reportante_id: String(nuevo.reportante_id ?? ''),
          tipo: String(nuevo.tipo ?? 'acoso'),
          descripcion: String(nuevo.descripcion ?? ''),
          lugar: (nuevo.lugar as string | null) ?? null,
          fecha_hecho: (nuevo.fecha_hecho as string | null) ?? now,
          involucrados: (nuevo.involucrados as string | null) ?? null,
          urgente: Boolean(nuevo.urgente),
          prioridad: (nuevo.prioridad as Reporte['prioridad']) ?? 'normal',
          estado: 'nuevo',
          asignado_a: null,
          creado_en: now,
          actualizado_en: now,
          reportante: null,
        }
        this.lastInserted = clonar(creado)
        this.state.reports.unshift(creado)
        const perfil = this.state.profiles.find((p) => p.id === creado.reportante_id)
        if (perfil) {
          creado.reportante = { nombre: perfil.nombre, grado: perfil.grado, grupo: perfil.grupo }
        }
        recordar(this.state)
        return { data: seleccionarCampos(clonar(creado), this.selectValue), error: null }
      }

      if (this.table === 'mensajes') {
        const item: Mensaje = {
          id: baseId,
          reporte_id: String(nuevo.reporte_id ?? ''),
          autor_id: String(nuevo.autor_id ?? ''),
          autor_rol: this.state.profiles.find((p) => p.id === nuevo.autor_id)?.rol ?? 'estudiante',
          texto: String(nuevo.texto ?? ''),
          creado_en: now,
        }
        this.state.mensajes.push(item)
        recordar(this.state)
        return { data: seleccionarCampos(clonar(item), this.selectValue), error: null }
      }

      if (this.table === 'notas_internas') {
        const item: Nota = {
          id: baseId,
          reporte_id: String(nuevo.reporte_id ?? ''),
          autor_id: String(nuevo.autor_id ?? ''),
          texto: String(nuevo.texto ?? ''),
          creado_en: now,
          autor: this.state.profiles.find((p) => p.id === nuevo.autor_id) ? { nombre: this.state.profiles.find((p) => p.id === nuevo.autor_id)!.nombre } : null,
        }
        this.state.notas.push(item)
        recordar(this.state)
        return { data: seleccionarCampos(clonar(item), this.selectValue), error: null }
      }

      if (this.table === 'perfiles') {
        const perfil = normalizarPerfil({
          id: baseId,
          email: String(nuevo.email ?? 'demo@estudiante.com'),
          password: String(nuevo.password ?? 'demo1234'),
          user_metadata: { ...(nuevo as Record<string, unknown>) },
        })
        this.state.profiles.push(perfil)
        this.state.users.push({
          id: perfil.id,
          email: perfil.nombre.toLowerCase().replace(/\s+/g, '.') + '@estudiante.com',
          password: String(nuevo.password ?? 'demo1234'),
          user_metadata: { nombre: perfil.nombre },
        })
        recordar(this.state)
        return { data: seleccionarCampos(clonar(perfil), this.selectValue), error: null }
      }

      return { data: seleccionarCampos(clonar(nuevo), this.selectValue), error: null }
    }

    if (this.action === 'update' && this.updatePayload) {
      const datos = this.aplicarFiltrado(this.state[this.table as keyof DemoState] as unknown as Record<string, unknown>[])
      for (const fila of datos) {
        Object.assign(fila, this.updatePayload)
      }
      recordar(this.state)
      return { data: null, error: null }
    }

    const datos = this.aplicarFiltrado(this.obtenerTabla())
    return { data: datos, error: null }
  }

  private obtenerTabla() {
    const arr = obtenerPorTablas(this.table, this.state)
    return clonar(arr) as unknown as Record<string, unknown>[]
  }

  private aplicarFiltrado(datos: Record<string, unknown>[]) {
    let resultado = [...datos]

    for (const filtro of this.filters) {
      if (filtro.tipo === 'eq') {
        resultado = resultado.filter((fila) => String(fila[filtro.campo as string]) === String(filtro.valor))
      }
      if (filtro.tipo === 'in') {
        const valores = filtro.valor as unknown[]
        resultado = resultado.filter((fila) => valores.includes(fila[filtro.campo as string]))
      }
    }

    if (this.orderBy) {
      resultado.sort((a, b) => {
        const av = a[this.orderBy!.campo] as string | number | null | undefined
        const bv = b[this.orderBy!.campo] as string | number | null | undefined
        if (av === bv) return 0
        if (av == null) return 1
        if (bv == null) return -1
        return this.orderBy!.asc ? Number(av > bv) - Number(av < bv) : Number(bv > av) - Number(bv < av)
      })
    }

    if (this.limitValue) resultado = resultado.slice(0, this.limitValue)
    return resultado
  }
}

function crearSupabaseMock() {
  let estado = leerEstado()
  const listeners = new Set<(event: string, session: { user: { id: string; email: string }; access_token: string } | null) => void>()

  const auth = {
    async getSession() {
      const session = estado.session
      const demoSession: any = session
        ? {
            access_token: session.access_token,
            refresh_token: `refresh-${session.user.id}`,
            expires_in: 3600,
            expires_at: Math.floor(Date.now() / 1000) + 3600,
            token_type: 'bearer',
            user: {
              id: session.user.id,
              email: session.user.email,
              app_metadata: {},
              user_metadata: {},
              aud: 'authenticated',
              created_at: iso(),
              role: 'authenticated',
            },
          }
        : null
      return { data: { session: demoSession } }
    },
    onAuthStateChange(callback: (event: string, session: any) => void) {
      listeners.add(callback)
      return { data: { subscription: { unsubscribe: () => { listeners.delete(callback) } } } }
    },
    async signInWithPassword({ email, password }: { email: string; password: string }) {
      const user = estado.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password)
      if (!user) {
        return { data: { user: null, session: null }, error: { message: 'invalid login credentials' } }
      }
      const perfil = estado.profiles.find((p) => p.id === user.id) ?? normalizarPerfil(user)
      const session: any = {
        access_token: `mock-${user.id}`,
        refresh_token: `refresh-${user.id}`,
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: 'bearer',
        user: {
          id: user.id,
          email: user.email,
          app_metadata: {},
          user_metadata: user.user_metadata,
          aud: 'authenticated',
          created_at: iso(),
          role: 'authenticated',
        },
      }
      estado.session = { user: { id: user.id, email: user.email }, access_token: session.access_token }
      if (!estado.profiles.some((p) => p.id === perfil.id)) estado.profiles.push(perfil)
      recordar(estado)
      listeners.forEach((fn) => fn('SIGNED_IN', session))
      return { data: { user: session.user, session }, error: null }
    },
    async signUp({ email, password, options }: { email: string; password: string; options?: { data?: Record<string, unknown> } }) {
      const normalizedEmail = email.trim().toLowerCase()
      if (estado.users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
        return { data: { user: null, session: null }, error: { message: 'already registered' } }
      }
      const user: DemoUser = {
        id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
        email: normalizedEmail,
        password,
        user_metadata: { ...(options?.data ?? {}) },
      }
      const perfil = normalizarPerfil(user)
      const session: any = {
        access_token: `mock-${user.id}`,
        refresh_token: `refresh-${user.id}`,
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: 'bearer',
        user: {
          id: user.id,
          email: normalizedEmail,
          app_metadata: {},
          user_metadata: user.user_metadata,
          aud: 'authenticated',
          created_at: iso(),
          role: 'authenticated',
        },
      }
      estado.users.push(user)
      estado.profiles.push(perfil)
      estado.session = { user: { id: user.id, email: normalizedEmail }, access_token: session.access_token }
      recordar(estado)
      listeners.forEach((fn) => fn('SIGNED_UP', session))
      return { data: { user: session.user, session }, error: null }
    },
    async resetPasswordForEmail(email: string) {
      const existe = estado.users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())
      return { data: existe ? { email } : null, error: existe ? null : { message: 'user not found' } }
    },
    async updateUser({ password }: { password: string }) {
      if (!estado.session) return { data: { user: null }, error: { message: 'not authenticated' } }
      const current = estado.users.find((u) => u.id === estado.session?.user.id)
      if (current) current.password = password
      recordar(estado)
      return { data: { user: { id: current?.id, email: current?.email } }, error: null }
    },
    async signOut() {
      estado.session = null
      recordar(estado)
      listeners.forEach((fn) => fn('SIGNED_OUT', null))
      return { error: null }
    },
  }

  const api = {
    auth,
    from(tabla: string) {
      return new MockQuery(tabla, estado)
    },
    rpc(nombre: string) {
      if (nombre === 'registrar_vista') return Promise.resolve({ data: null, error: null })
      return Promise.resolve({ data: null, error: null })
    },
  }

  return api
}

const mockSupabase = DEMO_MODE ? crearSupabaseMock() : createClient(url!, key!, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
})

export const supabase = mockSupabase

export function mensajeError(e: unknown): string {
  const msg = (e as { message?: string } | null)?.message ?? ''
  if (/invalid login credentials/i.test(msg)) return 'El correo o la clave no son correctos.'
  if (/already registered|already been registered/i.test(msg)) return 'Ese correo ya tiene una cuenta. Intenta ingresar.'
  if (/email not confirmed/i.test(msg)) return 'Falta confirmar tu correo. Revisa tu bandeja de entrada.'
  if (/password/i.test(msg) && /characters|weak|short/i.test(msg)) return 'La clave debe tener al menos 8 caracteres.'
  if (/muchos reportes/i.test(msg)) return 'Has enviado muchos reportes seguidos. Intenta de nuevo en un rato.'
  if (/rate limit/i.test(msg)) return 'Hiciste muchos intentos. Espera unos minutos e inténtalo de nuevo.'
  if (/row-level security|permission denied/i.test(msg)) return 'No tienes permiso para hacer esto.'
  if (/failed to fetch|network/i.test(msg)) return 'No hay conexión. Revisa tu internet e inténtalo de nuevo.'
  return 'Algo no salió bien. Inténtalo de nuevo.'
}
