import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase, supabaseConfigurada } from './supabase'
import type { Perfil } from './types'

async function crearPerfilSiFalta(uid: string, session?: Session | null) {
  const { data: existente } = await supabase
    .from('perfiles')
    .select('id')
    .eq('id', uid)
    .maybeSingle()

  if (existente?.id) return existente as Perfil

  const userMeta = session?.user?.user_metadata ?? {}
  const nombre = String(userMeta.nombre ?? session?.user?.email?.split('@')[0] ?? 'Sin nombre').trim() || 'Sin nombre'

  const { data, error } = await supabase
    .from('perfiles')
    .insert([
      {
        id: uid,
        nombre,
        documento: userMeta.documento ?? null,
        grado: userMeta.grado ?? null,
        grupo: userMeta.grupo ?? null,
        rol: 'estudiante',
        activo: true,
        aprobado: true,
      },
    ])
    .select()
    .single()

  if (error && !/duplicate|already exists/i.test(error.message)) {
    throw error
  }

  return (data ?? null) as Perfil | null
}

interface AuthCtx {
  session: Session | null
  perfil: Perfil | null
  cargando: boolean
  refrescar: () => Promise<void>
  salir: () => Promise<void>
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [sesionLista, setSesionLista] = useState(false)
  // undefined = cargando, null = no existe
  const [perfil, setPerfil] = useState<Perfil | null | undefined>(undefined)

  useEffect(() => {
    if (!supabaseConfigurada) {
      setSesionLista(true)
      setPerfil(null)
      return
    }

    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session)
        setSesionLista(true)
      })
      .catch(() => {
        setSession(null)
        setSesionLista(true)
      })

    const { data } = supabase.auth.onAuthStateChange((_evento, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  const uid = session?.user.id

  const cargarPerfil = useCallback(async () => {
    if (!uid) return setPerfil(null)

    try {
      const { data } = await supabase.from('perfiles').select('*').eq('id', uid).maybeSingle()
      if (data) {
        setPerfil(data as Perfil)
        return
      }

      const creado = await crearPerfilSiFalta(uid, session)
      setPerfil(creado)
    } catch {
      setPerfil(null)
    }
  }, [uid, session])

  useEffect(() => {
    setPerfil(undefined)
    void cargarPerfil()
  }, [cargarPerfil])

  const salir = useCallback(async () => {
    await supabase.auth.signOut()
    setPerfil(null)
  }, [])

  const value = useMemo<AuthCtx>(
    () => ({
      session,
      perfil: perfil ?? null,
      cargando: !supabaseConfigurada ? false : !sesionLista || (!!session && perfil === undefined),
      refrescar: async () => {
        if (!supabaseConfigurada) return
        await cargarPerfil()
      },
      salir: async () => {
        if (!supabaseConfigurada) return
        await supabase.auth.signOut()
        setPerfil(null)
      },
    }),
    [session, perfil, sesionLista, cargarPerfil, salir],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return c
}
