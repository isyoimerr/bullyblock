import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BellRing, CalendarClock, DoorOpen, Eye, EyeOff, LifeBuoy, MapPin, PhoneCall, ShieldCheck, Users } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { AYUDA_LABELS, guardarAyudaEnviada, leerAyudasEnviadas, obtenerContextoAula, type OpcionAyuda } from '../lib/ayuda'
import { formatoCurso } from '../lib/types'

const ICONS = {
  sacarme_de_clase: DoorOpen,
  cita_orientacion: CalendarClock,
  avisar_docente: BellRing,
  que_me_llamen: PhoneCall,
  solo_registrar: Eye,
  acompanar_descanso: Users,
} as const

export default function AyudaAhora() {
  const { perfil } = useAuth()
  const contexto = useMemo(() => obtenerContextoAula(perfil), [perfil])
  const [opciones, setOpciones] = useState<OpcionAyuda[]>(contexto.enClase ? ['sacarme_de_clase', 'cita_orientacion'] : ['solo_registrar'])
  const [discreto, setDiscreto] = useState(contexto.enClase)
  const [compartirDetalleDocente, setCompartirDetalleDocente] = useState(false)
  const [texto, setTexto] = useState('')
  const [urgente, setUrgente] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [ultima, setUltima] = useState(() => leerAyudasEnviadas()[0] ?? null)

  function toggleOpcion(opcion: OpcionAyuda) {
    setOpciones((actual) => actual.includes(opcion) ? actual.filter((item) => item !== opcion) : [...actual, opcion])
  }

  function enviar() {
    const nueva = guardarAyudaEnviada({
      estudiante: perfil?.nombre ?? 'Estudiante',
      grado: contexto.grado,
      grupo: contexto.grupo,
      materia: contexto.materia,
      salon: contexto.salon,
      docente: contexto.docente,
      ubicacion: contexto.ubicacion,
      opciones,
      discreto,
      compartirDetalleDocente,
      urgente,
      folio: `CIT-${new Date().getFullYear()}-${String((leerAyudasEnviadas().length || 0) + 1).padStart(4, '0')}`,
    })

    setUltima(nueva)
    setEnviado(true)
  }

  if (enviado && ultima) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <div className="rounded-3xl border border-[var(--brand-green)]/20 bg-[var(--superficie)] p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-3 text-emerald-700">
            <ShieldCheck size={28} aria-hidden="true" />
            <h1 className="text-2xl font-bold text-[var(--texto-principal)]">Aviso enviado</h1>
          </div>
          <p className="text-[15px] text-[var(--texto-secundario)]">Enviado. Alguien se acercará pronto.</p>
          <p className="mt-3 text-sm text-[var(--texto-suave)]">Folio de citación</p>
          <p className="text-2xl font-bold tracking-wide text-[var(--texto-principal)]">{ultima.folio}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-[15px] text-amber-900">
          <p className="mb-1 flex items-center gap-2 font-bold"><LifeBuoy size={18} aria-hidden="true" />Si estás en peligro ahora</p>
          Busca a un adulto de tu colegio o llama al <a href="tel:123" className="font-bold underline">123</a>.
        </div>

        <div className="card space-y-2 text-[15px]">
          <p><strong>Curso:</strong> {formatoCurso(contexto.grado, contexto.grupo)}</p>
          <p><strong>Materia:</strong> {contexto.materia ?? 'Sin materia'}</p>
          <p><strong>Salón:</strong> {contexto.salon ?? 'Sin salón'}</p>
          <p><strong>Docente:</strong> {contexto.docente ?? 'Sin docente asignado'}</p>
          <p><strong>Qué pediste:</strong> {opciones.map((item) => AYUDA_LABELS[item]).join(', ')}</p>
        </div>

        <div className="flex gap-3">
          <Link to="/app" className="btn btn-azul flex-1">Volver al inicio</Link>
          <Link to="/app/ayuda" className="btn btn-sec flex-1">Ver ayuda</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="rounded-3xl border border-[var(--borde)] bg-[var(--superficie)] p-4 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--texto-suave)]">Ahora estás en</p>
        <h1 className="mt-2 text-2xl font-bold text-[var(--texto-principal)]">{formatoCurso(contexto.grado, contexto.grupo)} · {contexto.materia ?? 'Clase'}</h1>
        <p className="mt-1 text-[15px] text-[var(--texto-secundario)]">{contexto.salon ? `Salón ${contexto.salon}` : 'Sin salón asignado'} · {contexto.docente ?? 'Docente por confirmar'}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="btn btn-verde">Sí, es correcto</button>
          <button type="button" className="btn btn-sec">Cambiar</button>
        </div>
      </div>

      <div className="rounded-2xl bg-amber-50 p-4 text-[15px] text-amber-900">
        <button type="button" onClick={() => setUrgente((valor) => !valor)} className="flex w-full items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-[var(--superficie)] px-3 py-3 text-left font-bold">
          <span className="flex items-center gap-2"><LifeBuoy size={18} aria-hidden="true" />Estoy en peligro ahora</span>
          <span className={`rounded-full px-2 py-1 text-xs ${urgente ? 'bg-amber-200 text-amber-900' : 'bg-[var(--superficie-alt)] text-[var(--texto-secundario)]'}`}>
            {urgente ? 'Activo' : 'No'}
          </span>
        </button>
        {urgente && (
          <p className="mt-3 rounded-xl bg-[var(--superficie)] p-3 text-sm">
            Busca a un adulto del colegio o llama al <a href="tel:123" className="font-bold underline">123</a>.
          </p>
        )}
      </div>

      <div className="card space-y-3">
        <h2 className="text-xl font-bold text-[var(--texto-principal)]">¿Qué necesitas que pase?</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(ICONS) as OpcionAyuda[]).map((opcion) => {
            const Icon = ICONS[opcion]
            const activo = opciones.includes(opcion)
            return (
              <button
                key={opcion}
                type="button"
                onClick={() => toggleOpcion(opcion)}
                className={`flex min-h-[88px] flex-col items-start justify-between rounded-2xl border-2 p-3 text-left ${activo ? 'border-emerald-700 bg-emerald-50 text-emerald-800' : 'border-[var(--borde)] bg-[var(--superficie)] text-[var(--texto-principal)]'}`}
              >
                <Icon size={22} aria-hidden="true" />
                <span className="text-sm font-semibold">{AYUDA_LABELS[opcion]}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="card space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-[var(--superficie-alt)] p-3">
          <div className="flex items-center gap-2 font-semibold text-[var(--texto-principal)]"><EyeOff size={18} aria-hidden="true" />Que sea discreto</div>
          <button
            type="button"
            onClick={() => setDiscreto((valor) => !valor)}
            className={`relative h-7 w-12 rounded-full transition ${discreto ? 'bg-emerald-500' : 'bg-[var(--superficie)]'}`}
            aria-label="Activar ayuda discreta"
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${discreto ? 'left-6' : 'left-1'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl bg-[var(--superficie-alt)] p-3">
          <div className="flex items-center gap-2 font-semibold text-[var(--texto-principal)]"><MapPin size={18} aria-hidden="true" />¿Qué puede saber mi profe?</div>
          <button
            type="button"
            onClick={() => setCompartirDetalleDocente((valor) => !valor)}
            className={`relative h-7 w-12 rounded-full transition ${compartirDetalleDocente ? 'bg-sky-500' : 'bg-[var(--superficie)]'}`}
            aria-label="Compartir detalle con el docente"
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${compartirDetalleDocente ? 'left-6' : 'left-1'}`} />
          </button>
        </div>

        <div>
          <label htmlFor="mensaje" className="mb-2 block text-sm font-semibold text-[var(--texto-secundario)]">¿Quieres contarnos algo?</label>
          <textarea id="mensaje" value={texto} onChange={(event) => setTexto(event.target.value)} className="min-h-[110px] w-full rounded-2xl border border-[var(--borde)] bg-[var(--superficie)] px-3 py-2 text-[var(--texto-principal)] outline-none ring-0 focus:border-emerald-500" placeholder="Escribe lo que quieras compartir, si te parece cómodo." />
        </div>
      </div>

      <button type="button" onClick={enviar} className="btn btn-azul w-full">Avisar ahora</button>
    </div>
  )
}
