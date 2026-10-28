import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { obtenerContextoAula } from '../lib/ayuda'
import { useAuth } from '../lib/auth'
import { formatoCurso } from '../lib/types'

const BLOQUES = [
  { t: 'Si te está pasando a ti', p: 'No es tu culpa. Cuéntale a una persona de confianza: un familiar, tu director de grupo u orientación. Cuando estés listo, haz tu reporte aquí. No tienes que enfrentar esto solo.' },
  { t: 'Si ves que le pasa a alguien', p: 'No te quedes mirando ni lo compartas. Acompaña a la persona, dile que no está sola y avisa a un adulto. También puedes reportarlo aquí.' },
  { t: 'Si sientes que eres tú quien agrede', p: 'Reconocerlo es un primer paso valiente. Habla con orientación: pueden ayudarte a entender qué te pasa y a reparar el daño.' },
  { t: 'A quién acudir en el colegio', p: 'Oficina de orientación escolar, coordinación de convivencia, tu director de grupo o cualquier docente de confianza.' },
  { t: 'Líneas de ayuda', p: 'Emergencias: 123. Línea 141 del ICBF (protección de niños, niñas y adolescentes), gratuita las 24 horas.' },
]

export default function Ayuda() {
  const { perfil } = useAuth()
  const contexto = obtenerContextoAula(perfil)

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="rounded-3xl border border-sky-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Ahora estás en</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">{formatoCurso(contexto.grado, contexto.grupo)} · {contexto.materia ?? 'Clase'}</h1>
        <p className="mt-1 text-[15px] text-slate-700">{contexto.salon ? `Salón ${contexto.salon}` : 'Sin salón asignado'} · {contexto.docente ?? 'Docente por confirmar'}</p>
      </div>

      <div className="mb-4 rounded-2xl bg-amber-100 p-4 text-[15px]">
        <p className="mb-1 flex items-center gap-2 font-bold text-amber-800"><Phone size={18} aria-hidden="true" />¿Estás en peligro ahora mismo?</p>
        Busca a un adulto del colegio o llama al <strong className="text-xl text-amber-800">123</strong>.
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Ruta de acompañamiento</p>
        <div className="space-y-3">
          <Link to="/app/ayuda-ahora" className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-3 font-semibold text-emerald-800">
            <span>Necesito ayuda ahora</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/app/ayuda-ahora" className="flex items-center justify-between rounded-2xl border border-sky-200 bg-sky-50 p-3 font-semibold text-sky-800">
            <span>Quiero una cita con orientación</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {BLOQUES.map((b, i) => (
          <details key={b.t} open={i === 0} className="card group">
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between font-titulo text-lg font-bold text-azul-900">
              {b.t}
              <span className="text-azul-500 transition group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-2 text-suave">{b.p}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-suave">
        BullyBlock no sustituye la intervención de docentes, orientadores o directivos.
      </p>
    </div>
  )
}
