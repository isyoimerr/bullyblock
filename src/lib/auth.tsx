import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import type { Perfil } from './types'

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
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setSesionLista(true)
    })
    const { data } = supabase.auth.onAuthStateChange((_evento, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  const uid = session?.user.id

  const cargarPerfil = useCallback(async () => {
    if (!uid) return setPerfil(null)
    const { data } = await supabase.from('perfiles').select('*').eq('id', uid).maybeSingle()
    setPerfil((data as Perfil | null) ?? null)
  }, [uid])

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
      cargando: !sesionLista || (!!session && perfil === undefined),
      refrescar: cargarPerfil,
      salir,
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
