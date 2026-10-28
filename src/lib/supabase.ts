import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabaseConfigurada = Boolean(
  url && key && !/TU-PROYECTO|tu-clave/i.test(String(url + key)),
)

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
  const msg = (e as { message?: string } | null)?.message ?? ''
  if (/invalid login credentials/i.test(msg)) return 'El correo o la clave no son correctos.'
  if (/already registered|already been registered/i.test(msg)) return 'Ese correo ya tiene una cuenta. Intenta ingresar.'
  if (/email not confirmed/i.test(msg)) return 'Falta confirmar tu correo. Revisa tu bandeja de entrada.'
  if (/password/i.test(msg) && /characters|weak|short/i.test(msg)) return 'La clave debe tener al menos 8 caracteres.'
  if (/muchos reportes/i.test(msg)) return 'Has enviado muchos reportes seguidos. Intenta de nuevo en un rato.'
  if (/rate limit/i.test(msg)) return 'Hiciste muchos intentos. Espera unos minutos e inténtalo de nuevo.'
  if (/row-level security|permission denied/i.test(msg)) return 'No tienes permiso para hacer esto.'
  if (/failed to fetch|network|fetch failed/i.test(msg)) {
    return 'No se pudo comunicar con Supabase. Revisa la conexión y la configuración del proyecto.'
  }
  return 'Algo no salió bien. Inténtalo de nuevo.'
}