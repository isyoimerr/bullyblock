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

const HORARIO_DEMO = [
  { dia: 1, horaInicio: '7:00', horaFin: '7:55', materia: 'Matemáticas', docente: 'Carlos Mendoza', salon: '8A-02' },
  { dia: 1, horaInicio: '8:00', horaFin: '8:55', materia: 'Ciencias', docente: 'Paula Rojas', salon: '8A-05' },
  { dia: 1, horaInicio: '9:15', horaFin: '10:10', materia: 'Lenguaje', docente: 'María López', salon: '8A-04' },
  { dia: 1, horaInicio: '10:15', horaFin: '11:10', materia: 'Historia', docente: 'Diego Salazar', salon: '8A-06' },
  { dia: 1, horaInicio: '11:15', horaFin: '12:10', materia: 'Ética', docente: 'Sofía Ramírez', salon: '8A-03' },
  { dia: 2, horaInicio: '7:00', horaFin: '7:55', materia: 'Inglés', docente: 'Rosa García', salon: '8B-01' },
  { dia: 2, horaInicio: '8:00', horaFin: '8:55', materia: 'Biología', docente: 'Alicia Torres', salon: '8A-07' },
  { dia: 2, horaInicio: '9:15', horaFin: '10:10', materia: 'Educación física', docente: 'Daniel Castro', salon: 'Gimnasio 2' },
  { dia: 2, horaInicio: '10:15', horaFin: '11:10', materia: 'Física', docente: 'Camilo Paredes', salon: '8A-08' },
  { dia: 2, horaInicio: '11:15', horaFin: '12:10', materia: 'Tecnología', docente: 'Laura Peña', salon: 'Lab 3' },
  { dia: 3, horaInicio: '7:00', horaFin: '7:55', materia: 'Geografía', docente: 'Elena Vega', salon: '8A-09' },
  { dia: 3, horaInicio: '8:00', horaFin: '8:55', materia: 'Química', docente: 'Nicolás Díaz', salon: 'Lab 4' },
  { dia: 3, horaInicio: '9:15', horaFin: '10:10', materia: 'Sociales', docente: 'Isabel Mora', salon: '8A-10' },
  { dia: 3, horaInicio: '10:15', horaFin: '11:10', materia: 'Artes', docente: 'Valentina Ruiz', salon: 'Taller 1' },
  { dia: 3, horaInicio: '11:15', horaFin: '12:10', materia: 'Religión', docente: 'Mónica Cifuentes', salon: '8A-05' },
  { dia: 4, horaInicio: '7:00', horaFin: '7:55', materia: 'Matemáticas', docente: 'Carlos Mendoza', salon: '8A-02' },
  { dia: 4, horaInicio: '8:00', horaFin: '8:55', materia: 'Español', docente: 'Marta Ocampo', salon: '8A-03' },
  { dia: 4, horaInicio: '9:15', horaFin: '10:10', materia: 'Cívica', docente: 'Sandra Beltrán', salon: '8A-06' },
  { dia: 4, horaInicio: '10:15', horaFin: '11:10', materia: 'Filosofía', docente: 'José Arango', salon: '8A-04' },
  { dia: 4, horaInicio: '11:15', horaFin: '12:10', materia: 'Informática', docente: 'Ana Torrez', salon: 'Lab 1' },
  { dia: 5, horaInicio: '7:00', horaFin: '7:55', materia: 'Taller', docente: 'Lucía Ortiz', salon: 'Taller 2' },
  { dia: 5, horaInicio: '8:00', horaFin: '8:55', materia: 'Biología', docente: 'Alicia Torres', salon: '8A-07' },
  { dia: 5, horaInicio: '9:15', horaFin: '10:10', materia: 'Inglés', docente: 'Rosa García', salon: '8B-01' },
  { dia: 5, horaInicio: '10:15', horaFin: '11:10', materia: 'Matemáticas', docente: 'Carlos Mendoza', salon: '8A-02' },
  { dia: 5, horaInicio: '11:15', horaFin: '12:10', materia: 'Ciencias', docente: 'Paula Rojas', salon: '8A-05' },
]

function horaEnMinutos(hora: string) {
  const [h, m] = hora.split(':').map(Number)
  return h * 60 + m
}

export function obtenerContextoAula(perfil: Perfil | null, fecha = new Date()): ContextoAula {
  const grado = perfil?.grado ?? 9
  const grupo = perfil?.grupo ?? 'A'
  const horaActual = `${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')}`
  const diaSemana = fecha.getDay() === 0 || fecha.getDay() === 6 ? 0 : fecha.getDay()
  const item = HORARIO_DEMO.find((h) => h.dia === diaSemana && horaEnMinutos(horaActual) >= horaEnMinutos(h.horaInicio) && horaEnMinutos(horaActual) < horaEnMinutos(h.horaFin))

  if (item) {
    return {
      grado,
      grupo,
      materia: item.materia,
      salon: item.salon,
      docente: item.docente,
      hora: horaActual,
      enClase: true,
      ubicacion: 'en_clase',
    }
  }

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
