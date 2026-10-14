import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { Cargando, EstadoBadge, VolverA } from '../components/ui'
import { useAuth } from '../lib/auth'
import { mensajeError, supabase } from '../lib/supabase'
import { fmtFecha, lugarLabel, tipoLabel } from '../lib/catalogo'
import type { Mensaje, Reporte } from '../lib/types'

export default function ReporteDetalle() {
  const { id } = useParams()
  const { perfil } = useAuth()
  const [reporte, setReporte] = useState<Reporte | null | undefined>(undefined)
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [texto, setTexto] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const cargar = useCallback(async () => {
    const [r, m] = await Promise.all([
      supabase.from('reportes').select('*').eq('id', id!).maybeSingle(),
      supabase.from('mensajes').select('*').eq('reporte_id', id!).order('creado_en'),
    ])
    setReporte((r.data as Reporte | null) ?? null)
    setMensajes((m.data as Mensaje[]) ?? [])
  }, [id])

  useEffect(() => { void cargar() }, [cargar])

  async function enviar(e: FormEvent) {
    e.preventDefault()
    if (!texto.trim() || !perfil) return
    setError('')
    setEnviando(true)
    const { error } = await supabase.from('mensajes').insert({ reporte_id: id, autor_id: perfil.id, texto: texto.trim() })
    setEnviando(false)
    if (error) return setError(mensajeError(error))
    setTexto('')
    void cargar()
  }

  if (reporte === undefined) return <Cargando />
  if (reporte === null) return <div className="card">No encontramos ese reporte.</div>

  return (
    <div className="mx-auto max-w-2xl">
      <VolverA to="/app/reportes">Mis reportes</VolverA>
      <div className="card">
        <EstadoBadge estado={reporte.estado} vista="estudiante" />
        <h1 className="mt-2 text-2xl">{reporte.codigo}</h1>
        <p className="text-[15px] text-suave">{tipoLabel(reporte.tipo)} · {lugarLabel(reporte.lugar)}</p>
        <p className="mt-3 whitespace-pre-wrap">{reporte.descripcion}</p>
        <ol className="mt-4 space-y-2 border-l-4 border-verde-500 pl-4 text-[15px]">
          <li><strong>Recibido</strong><br /><span className="text-suave">{fmtFecha(reporte.creado_en)}</span></li>
          {reporte.estado !== 'nuevo' && (
            <li><strong>Actualizado: {estadoTexto(reporte.estado)}</strong><br /><span className="text-suave">{fmtFecha(reporte.actualizado_en)}</span></li>
          )}
        </ol>
      </div>

      <h2 className="mb-3 mt-6 text-xl">Conversación con orientación</h2>
      <div className="space-y-3">
        {mensajes.length === 0 && <p className="text-suave">Aún no hay mensajes. Te responderán por aquí.</p>}
        {mensajes.map((m) => {
          const mio = m.autor_id === perfil?.id
          return (
            <div key={m.id} className={`max-w-[88%] rounded-2xl px-4 py-3 text-[15px] ${mio ? 'ml-auto rounded-br-sm bg-verde-100' : 'rounded-bl-sm bg-azul-100'}`}>
              <p className="mb-0.5 text-sm font-bold text-azul-900">{mio ? 'Tú' : 'Orientación'}</p>
              <p className="whitespace-pre-wrap">{m.texto}</p>
              <p className="mt-1 text-xs text-suave">{fmtFecha(m.creado_en)}</p>
            </div>
          )
        })}
      </div>

      <form onSubmit={enviar} className="mt-4 space-y-3">
        <label className="label" htmlFor="msg">Escribir un mensaje</label>
        <textarea id="msg" className="input min-h-[100px]" maxLength={2000} value={texto} onChange={(e) => setTexto(e.target.value)} />
        {error && <p className="aviso-error" role="alert">{error}</p>}
        <button className="btn btn-azul" disabled={enviando || !texto.trim()}>{enviando ? 'Enviando…' : 'Enviar mensaje'}</button>
      </form>
    </div>
  )
}

const estadoTexto = (e: Reporte['estado']) =>
  ({ nuevo: 'Recibido', en_revision: 'Lo estamos revisando', en_atencion: 'Te estamos acompañando', cerrado: 'Caso cerrado' })[e]
