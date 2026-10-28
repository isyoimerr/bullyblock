import type { Perfil } from './types'

export type OpcionAyuda =
  | 'sacarme_de_clase'
  | 'cita_orientacion'
  | 'avisar_docente'
  | 'que_me_llamen'
  | 'solo_registrar'
  | 'acompanar_descanso'

export type UbicacionActual = 'en_clase' | 'descanso' | 'fuera_del_colegio' | 'ruta' | 'en_casa' | 'otro'

export interface ContextoAula {
  grado: number
  grupo: string
  materia: string | null
  salon: string | null
  docente: string | null
  hora: string
  enClase: boolean
  ubicacion: UbicacionActual
}

export interface AyudaEnviada {
  id: string
  folio: string
  estudiante: string
  grado: number
  grupo: string
  materia: string | null
  salon: string | null
  docente: string | null
  ubicacion: UbicacionActual
  opciones: OpcionAyuda[]
  discreto: boolean
  compartirDetalleDocente: boolean
  urgente: boolean
  creado_en: string
}

const STORAGE_KEY = 'bullyblock-ayudas-enviadas-v1'

export function obtenerContextoAula(perfil: Perfil | null, fecha = new Date()): ContextoAula {
  const grado = perfil?.grado ?? 9
  const grupo = perfil?.grupo ?? 'A'
  const horaActual = `${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')}`

  return {
    grado,
    grupo,
    materia: null,
    salon: null,
    docente: null,
    hora: horaActual,
    enClase: false,
    ubicacion: 'descanso',
  }
}

export const AYUDA_LABELS: Record<OpcionAyuda, string> = {
  sacarme_de_clase: 'Que me saquen de clase sin que se note',
  cita_orientacion: 'Quiero una cita con Orientación',
  avisar_docente: 'Que le avisen a mi profe, en privado',
  que_me_llamen: 'Que alguien me llame o me busque',
  solo_registrar: 'Solo quiero que alguien sepa',
  acompanar_descanso: 'Acompáñenme en el descanso',
}

export function leerAyudasEnviadas(): AyudaEnviada[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as AyudaEnviada[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function guardarAyudaEnviada(input: Omit<AyudaEnviada, 'id' | 'folio' | 'creado_en'> & { folio?: string }): AyudaEnviada {
  const lista = leerAyudasEnviadas()
  const folio = input.folio ?? `CIT-${new Date().getFullYear()}-${String(lista.length + 1).padStart(4, '0')}`
  const nuevo: AyudaEnviada = {
    ...input,
    id: crypto.randomUUID ? crypto.randomUUID() : `ayuda-${Date.now()}`,
    folio,
    creado_en: new Date().toISOString(),
  }

  const siguiente = [nuevo, ...lista].slice(0, 10)
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(siguiente))
  }

  return nuevo
}
