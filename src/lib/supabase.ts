import { createClient } from '@supabase/supabase-js'
import type { Perfil, Rol } from './types'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
export const DEMO_MODE = String(import.meta.env.VITE_DEMO_MODE ?? 'true').toLowerCase() === 'true'

export const supabaseConfigurada = Boolean(
  url && key && !/TU-PROYECTO|tu-clave/i.test(String(url + key)),
)

if (!supabaseConfigurada) {
  console.warn(
    'Supabase no configurado: define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en Vercel (Project Settings > Environment Variables).',
  )
}

export const demoUsers: Array<{ email: string; password: string; rol: Rol; nombre: string; grado: number; grupo: string }> = [
  { email: 'demo@estudiante.com', password: 'demo1234', rol: 'estudiante', nombre: 'Estudiante demo', grado: 9, grupo: '01' },
  { email: 'docente@estudiante.com', password: 'demo1234', rol: 'docente', nombre: 'Docente demo', grado: 9, grupo: '01' },
  { email: 'orientacion@estudiante.com', password: 'demo1234', rol: 'psicoorientador', nombre: 'Orientación demo', grado: 9, grupo: '01' },
  { email: 'admin@estudiante.com', password: 'demo1234', rol: 'admin', nombre: 'Admin demo', grado: 9, grupo: '01' },
]

export function credencialDemoValida(email: string, password: string) {
  const valueEmail = email.trim().toLowerCase()
  return demoUsers.some((u) => u.email.toLowerCase() === valueEmail && u.password === password)
}

export function iniciarDemoSesion(email: string, password: string) {
  const usuario = demoUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password)
  if (!usuario) return null

  const perfil: Perfil = {
    id: `demo-${usuario.rol}`,
    nombre: usuario.nombre,
    documento: `demo-${usuario.rol}`,
    grado: usuario.grado,
    grupo: usuario.grupo,
    rol: usuario.rol,
    activo: true,
    aprobado: true,
    creado_en: new Date().toISOString(),
  }

  const payload = { session: { user: { id: perfil.id, email: email.trim().toLowerCase() } }, perfil }
  localStorage.setItem('bullyblock-demo-session', JSON.stringify(payload))
  window.dispatchEvent(new CustomEvent('bullyblock-demo-session:changed', { detail: payload }))
  return payload
}

export function leerDemoSesion() {
  try {
    const raw = localStorage.getItem('bullyblock-demo-session')
    if (!raw) return null
    return JSON.parse(raw) as { session: { user: { id: string; email: string } }; perfil: Perfil }
  } catch {
    return null
  }
}

export function limpiarDemoSesion() {
  localStorage.removeItem('bullyblock-demo-session')
  window.dispatchEvent(new CustomEvent('bullyblock-demo-session:changed'))
}

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
)

export function mensajeError(e: unknown): string {
  const raw = e instanceof Error ? e.message : typeof e === 'string' ? e : (e as { message?: string } | null)?.message ?? ''
  const msg = String(raw)

  if (msg) console.error('[Supabase]', msg)

  if (/invalid login credentials|invalid email or password|user not found|wrong password|email not confirmed/i.test(msg)) {
    return 'El correo o la clave no son correctos. Verifica los datos e intenta nuevamente.'
  }
  if (/already registered|already been registered|user already exists|duplicate key/i.test(msg)) {
    return 'Ese correo ya tiene una cuenta. Intenta ingresar.'
  }
  if (/email not confirmed/i.test(msg)) return 'Falta confirmar tu correo. Revisa tu bandeja de entrada.'
  if (/password/i.test(msg) && /characters|weak|short|minimum/i.test(msg)) return 'La clave debe tener al menos 8 caracteres.'
  if (/muchos reportes/i.test(msg)) return 'Has enviado muchos reportes seguidos. Intenta de nuevo en un rato.'
  if (/rate limit/i.test(msg)) return 'Hiciste muchos intentos. Espera unos minutos e inténtalo de nuevo.'
  if (/row-level security|permission denied|not authorized|policy/i.test(msg)) {
    return 'La base de datos o las políticas de acceso no permiten esta acción. Revisa el esquema de Supabase y los permisos de las tablas.'
  }
  if (/relation .* does not exist|column .* does not exist|type .* does not exist|table .* does not exist|missing column|missing table/i.test(msg)) {
    return 'La base de datos no coincide con la estructura que espera la app. Revisa las tablas public.perfiles, public.reportes, public.mensajes y public.notas_internas.'
  }
  if (!supabaseConfigurada) {
    return 'Supabase no está configurado en producción. En Vercel define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY con los valores reales del proyecto.'
  }
  if (/failed to fetch|network|fetch failed|timeout|unexpected end of json|network error/i.test(msg)) {
    return 'No se pudo comunicar con Supabase. Revisa que el proyecto de Vercel use la misma URL y anon key del proyecto real.'
  }

  if (msg) return `Error de Supabase: ${msg}`
  return 'Algo no salió bien. Inténtalo de nuevo.'
}