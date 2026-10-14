export type Rol = 'estudiante' | 'docente' | 'psicoorientador' | 'admin'
export type Estado = 'nuevo' | 'en_revision' | 'en_atencion' | 'cerrado'
export type Prioridad = 'normal' | 'alta' | 'urgente'
export type ModoAcceso = 'estudiante' | 'docente' | 'personal' | 'admin'

export interface Perfil {
  id: string
  nombre: string
  documento: string | null
  grado: number | null
  grupo: string | null
  rol: Rol
  cargo?: string | null
  horario?: string | null
  sede?: string | null
  activo: boolean
  aprobado: boolean
  creado_en: string
}

export interface Reporte {
  id: string
  codigo: string
  reportante_id: string
  tipo: string
  descripcion: string
  lugar: string | null
  fecha_hecho: string | null
  involucrados: string | null
  urgente: boolean
  prioridad: Prioridad
  estado: Estado
  asignado_a: string | null
  creado_en: string
  actualizado_en: string
  reportante?: Pick<Perfil, 'nombre' | 'grado' | 'grupo'> | null
}

export interface Mensaje {
  id: string
  reporte_id: string
  autor_id: string
  autor_rol: Rol
  texto: string
  creado_en: string
}

export interface Nota {
  id: string
  reporte_id: string
  autor_id: string
  texto: string
  creado_en: string
  autor?: { nombre: string } | null
}

export const esEstudiante = (rol?: Rol | null) => rol === 'estudiante'
export const esDocente = (rol?: Rol | null) => rol === 'docente'
export const esPersonal = (rol?: Rol | null) => rol === 'psicoorientador' || rol === 'admin'

export const rutaPorRol = (rol?: Rol | null): string => {
  if (rol === 'docente') return '/docente'
  if (rol === 'psicoorientador' || rol === 'admin') return '/panel'
  return '/app'
}

export const rolPorCorreo = (email: string): Rol => {
  const correo = email.toLowerCase()
  if (correo.includes('admin')) return 'admin'
  if (correo.includes('orientacion') || correo.includes('psico') || correo.includes('personal')) return 'psicoorientador'
  if (correo.includes('docente')) return 'docente'
  return 'estudiante'
}
