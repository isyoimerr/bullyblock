import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabaseConfigurada = Boolean(
  url && key && !/TU-PROYECTO|tu-clave/i.test(String(url + key)),
)

if (!supabaseConfigurada) {
  console.warn(
    'Supabase no configurado: define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en Vercel (Project Settings > Environment Variables).',
  )
}

const authStorage = typeof window !== 'undefined' ? window.localStorage : undefined

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: authStorage,
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