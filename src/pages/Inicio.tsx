import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HeartHandshake, MessageCircle, ShieldAlert } from 'lucide-react'
import Escudo, { Marca } from '../components/Escudo'
import { EstadoBadge } from '../components/ui'
import { useAuth } from '../lib/auth'
import { obtenerContextoAula, leerAyudasEnviadas, type AyudaEnviada } from '../lib/ayuda'
import { supabase } from '../lib/supabase'
import { tipoLabel } from '../lib/catalogo'
import { formatoCurso, type Reporte } from '../lib/types'

export default function Inicio() {
  const { perfil } = useAuth()
  const [ultimo, setUltimo] = useState<Reporte | null>(null)
  const [ultimaAyuda, setUltimaAyuda] = useState<AyudaEnviada | null>(null)

  useEffect(() => {
    supabase.from('reportes').select('*').order('creado_en', { ascending: false }).limit(1).maybeSingle()
      .then(({ data }) => setUltimo((data as Reporte | null) ?? null))

    setUltimaAyuda(leerAyudasEnviadas()[0] ?? null)
  }, [])

  const nombre = perfil?.nombre.split(' ')[0] ?? ''
  const contexto = useMemo(() => obtenerContextoAula(perfil), [perfil])

  return (
    <div className="mx-auto max-w-md">
      <div className="pb-4 text-center">
        <Escudo size={150} className="mx-auto" />
        <h1 className="mt-1"><Marca /></h1>
        <p className="text-suave">Detenemos el bullying. Juntos.</p>
      </div>

      <div className="mb-4 rounded-3xl border border-sky-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Ahora estás en</p>
        <p className="mt-2 text-xl font-bold text-slate-900">{formatoCurso(contexto.grado, contexto.grupo)} · {contexto.materia ?? 'Clase'}</p>
        <p className="text-[15px] text-slate-700">{contexto.salon ? `Salón ${contexto.salon}` : 'Sin salón asignado'} · {contexto.docente ?? 'Docente por confirmar'}</p>
      </div>

      <div className="mb-4 rounded-2xl bg-verde-100 px-4 py-3 text-[15px]">
        <strong>Hola, {nombre}.</strong> Aquí te escuchamos. Lo que cuentes es confidencial.
      </div>

      <div className="space-y-3">
        <Link to="/app/ayuda-ahora" className="btn btn-amber justify-start"><ShieldAlert aria-hidden="true" />Necesito ayuda ahora</Link>
        <Link to="/app/reportar" className="btn btn-azul justify-start"><ShieldAlert aria-hidden="true" />Reportar</Link>
        <Link to="/app/ayuda" className="btn btn-verde justify-start"><HeartHandshake aria-hidden="true" />Ayuda</Link>
        <Link to="/app/informacion" className="btn btn-celeste justify-start"><MessageCircle aria-hidden="true" />Información</Link>
      </div>

      {ultimaAyuda && (
        <div className="card mt-5 block">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Te esperan</p>
          <h3 className="mt-2 text-base font-bold text-slate-900">Hoy, {ultimaAyuda.salon ? `en ${ultimaAyuda.salon}` : 'en Orientación'} · {ultimaAyuda.folio}</h3>
          <p className="text-[15px] text-slate-700">Es para acompañarte, no es un llamado de atención. Tu profe ya sabe que puedes salir con naturalidad.</p>
        </div>
      )}

      {ultimo && (
        <Link to={`/app/reportes/${ultimo.id}`} className="card mt-5 block hover:bg-azul-100/40">
          <EstadoBadge estado={ultimo.estado} vista="estudiante" />
          <h3 className="mt-2 text-base">Tu último reporte · {ultimo.codigo}</h3>
          <p className="text-[15px] text-suave">{tipoLabel(ultimo.tipo)}. Respondemos en máximo 48 horas hábiles.</p>
        </Link>
      )}

      <p className="mt-6 text-center text-sm text-suave">
        IET José Agustín Blanco Barros · <em>Aprender haciendo</em>
      </p>
    </div>
  )
}
