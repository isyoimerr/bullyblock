import { Backpack, Hand, MessageSquare, PenLine, Smartphone, UserX, type LucideIcon } from 'lucide-react'
import type { Estado } from './types'

export const TIPOS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'fisica', label: 'Física', icon: Hand },
  { id: 'verbal', label: 'Verbal', icon: MessageSquare },
  { id: 'exclusion', label: 'Me excluyen', icon: UserX },
  { id: 'ciberacoso', label: 'Ciberacoso', icon: Smartphone },
  { id: 'objetos', label: 'Daño a mis cosas', icon: Backpack },
  { id: 'otra', label: 'Otra', icon: PenLine },
]

export const LUGARES: { id: string; label: string }[] = [
  { id: 'salon', label: 'Salón' },
  { id: 'patio', label: 'Patio' },
  { id: 'bano', label: 'Baño' },
  { id: 'cafeteria', label: 'Cafetería' },
  { id: 'ruta', label: 'Ruta escolar' },
  { id: 'redes', label: 'Redes sociales' },
  { id: 'otro', label: 'Otro lugar' },
]

export const tipoLabel = (id: string) => TIPOS.find((t) => t.id === id)?.label ?? id
export const lugarLabel = (id: string | null) => (id ? LUGARES.find((l) => l.id === id)?.label ?? id : 'Sin indicar')

export const ESTADOS: Estado[] = ['nuevo', 'en_revision', 'en_atencion', 'cerrado']

export const ESTADO_PERSONAL: Record<Estado, string> = {
  nuevo: 'Nuevo',
  en_revision: 'En revisión',
  en_atencion: 'En atención',
  cerrado: 'Cerrado',
}

export const ESTADO_ESTUDIANTE: Record<Estado, string> = {
  nuevo: 'Recibido',
  en_revision: 'Lo estamos revisando',
  en_atencion: 'Te estamos acompañando',
  cerrado: 'Caso cerrado',
}

export const ESTADO_CLASE: Record<Estado, string> = {
  nuevo: 'bg-azul-100 text-azul-700',
  en_revision: 'bg-ambar-100 text-ambar-800',
  en_atencion: 'bg-verde-100 text-verde-700',
  cerrado: 'bg-slate-100 text-suave',
}

export const horasDesde = (iso: string) => (Date.now() - new Date(iso).getTime()) / 36e5

export const fmtFecha = (iso: string) =>
  new Date(iso).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' })

export const fmtDia = (iso: string | null) =>
  iso ? new Date(iso + 'T12:00:00').toLocaleDateString('es-CO', { dateStyle: 'long' }) : 'Sin indicar'

export const isoLocal = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
