export type Rol = 'estudiante' | 'maestro' | 'docente' | 'psicoorientador' | 'admin'
export type Estado = 'nuevo' | 'en_revision' | 'en_atencion' | 'cerrado'
export type Prioridad = 'normal' | 'alta' | 'urgente'
export type ModoAcceso = 'estudiante' | 'maestro' | 'personal' | 'admin'

const LEGACY_ROLES: Record<string, Rol> = {
  docente: 'maestro',
  maestro: 'maestro',
  psicoorientador: 'maestro',
  personal: 'maestro',
  admin: 'maestro',
  estudiante: 'estudiante',
}

export const normalizarRol = (rol?: string | null): Rol => {
  const valor = String(rol ?? '').trim().toLowerCase()
  return LEGACY_ROLES[valor] ?? (valor === 'estudiante' ? 'estudiante' : 'maestro')
}

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

export const esEstudiante = (rol?: Rol | null) => normalizarRol(rol) === 'estudiante'
export const esDocente = (rol?: Rol | null) => normalizarRol(rol) === 'maestro'
export const esMaestro = (rol?: Rol | null) => normalizarRol(rol) === 'maestro'
export const esPersonal = (rol?: Rol | null) => normalizarRol(rol) === 'maestro'

export const rutaPorRol = (rol?: Rol | null): string => {
  if (normalizarRol(rol) === 'maestro') return '/panel'
  return '/app'
}

export const formatoCurso = (grado?: number | null, grupo?: string | null): string => {
  if (grado == null) return 'Docente'
  const rawGrupo = String(grupo ?? '').trim()
  if (!rawGrupo) return `${grado}`
  const grupoNormalizado = rawGrupo.toUpperCase().replace(/[^A-Z0-9-]/g, '')
  return `${grado}-${grupoNormalizado}`
}

export const rolPorCorreo = (email: string): Rol => {
  const correo = email.toLowerCase()
  if (correo.includes('admin') || correo.includes('orientacion') || correo.includes('psico') || correo.includes('personal') || correo.includes('docente') || correo.includes('maestro')) {
    return 'maestro'
  }
  return 'estudiante'
}
