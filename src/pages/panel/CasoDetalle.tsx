import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { Cargando, VolverA } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { mensajeError, supabase } from '../../lib/supabase'
import { ESTADOS, ESTADO_PERSONAL, fmtDia, fmtFecha, lugarLabel, tipoLabel } from '../../lib/catalogo'
import { formatoCurso, type Estado, type Mensaje, type Nota, type Perfil, type Prioridad, type Reporte } from '../../lib/types'
import { Plazo } from './Casos'

export default function CasoDetalle() {
  const { id } = useParams()
  const { perfil } = useAuth()
  const [r, setR] = useState<Reporte | null | undefined>(undefined)
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [notas, setNotas] = useState<Nota[]>([])
  const [equipo, setEquipo] = useState<Perfil[]>([])
  const [msg, setMsg] = useState('')
  const [nota, setNota] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  const cargar = useCallback(async () => {
    const [a, b, c, d] = await Promise.all([
      supabase.from('reportes').select('*, reportante:perfiles!reportante_id(nombre, grado, grupo)').eq('id', id!).maybeSingle(),
      supabase.from('mensajes').select('*').eq('reporte_id', id!).order('creado_en'),
      supabase.from('notas_internas').select('*, autor:perfiles!autor_id(nombre)').eq('reporte_id', id!).order('creado_en'),
      supabase.from('perfiles').select('*').in('rol', ['maestro', 'psicoorientador', 'admin']).eq('activo', true),
    ])
    setR((a.data as unknown as Reporte | null) ?? null)
    setMensajes((b.data as Mensaje[]) ?? [])
    setNotas((c.data as unknown as Nota[]) ?? [])
    setEquipo((d.data as Perfil[]) ?? [])
  }, [id])

  useEffect(() => {
    void cargar()
    void supabase.rpc('registrar_vista', { p_reporte: id })
  }, [cargar, id])

  async function actualizar(patch: Partial<Pick<Reporte, 'estado' | 'prioridad' | 'asignado_a'>>) {
    setError('')
    const { error } = await supabase.from('reportes').update(patch).eq('id', id!)
    if (error) return setError(mensajeError(error))
    void cargar()
  }

  async function enviarMensaje(e: FormEvent) {
    e.preventDefault()
    if (!msg.trim() || !perfil) return
    setOcupado(true)
    const { error } = await supabase.from('mensajes').insert({ reporte_id: id, autor_id: perfil.id, texto: msg.trim() })
    setOcupado(false)
    if (error) return setError(mensajeError(error))
    setMsg('')
    void cargar()
  }

  async function guardarNota(e: FormEvent) {
    e.preventDefault()
    if (!nota.trim() || !perfil) return
    setOcupado(true)
    const { error } = await supabase.from('notas_internas').insert({ reporte_id: id, autor_id: perfil.id, texto: nota.trim() })
    setOcupado(false)
    if (error) return setError(mensajeError(error))
    setNota('')
    void cargar()
  }

  if (r === undefined) return <Cargando />
  if (r === null) return <div className="card">No encontramos ese caso.</div>

  const grupo = r.reportante?.grado ? formatoCurso(r.reportante.grado, r.reportante.grupo) : 'Docente'

  return (
    <div className="mx-auto max-w-5xl">
      <VolverA to="/panel">Casos</VolverA>
      {error && <p className="aviso-error mb-3" role="alert">{error}</p>}

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="card">
            <div className="flex flex-wrap items-center gap-2">
              {r.urgente && <span className="rounded-full bg-rojo-600 px-3 py-0.5 text-sm font-bold text-white">URGENTE</span>}
              <span className="text-sm text-suave">{fmtFecha(r.creado_en)}</span>
              <Plazo r={r} />
            </div>
            <h1 className="mt-1 text-2xl">{r.codigo}</h1>
            <p className="text-[15px] text-suave">
              {tipoLabel(r.tipo)} · {lugarLabel(r.lugar)} · Hecho: {fmtDia(r.fecha_hecho)}
            </p>
            <p className="mt-3 whitespace-pre-wrap">{r.descripcion}</p>
            {r.involucrados && (
              <p className="mt-3 whitespace-pre-wrap rounded-xl bg-azul-100 p-3 text-[15px]"><strong>Personas involucradas:</strong> {r.involucrados}</p>
            )}
          </div>

          <div className="card">
            <h2 className="mb-3 text-xl">Conversación con el estudiante</h2>
            <p className="mb-3 text-sm text-suave">El estudiante ve estos mensajes.</p>
            <div className="space-y-3">
              {mensajes.length === 0 && <p className="text-suave">Aún no hay mensajes.</p>}
              {mensajes.map((m) => {
                const equipoMsg = m.autor_rol === 'maestro' || m.autor_rol === 'psicoorientador' || m.autor_rol === 'admin'
                return (
                  <div key={m.id} className={`max-w-[90%] rounded-2xl px-4 py-3 text-[15px] ${equipoMsg ? 'ml-auto rounded-br-sm bg-verde-100' : 'rounded-bl-sm bg-azul-100'}`}>
                    <p className="text-sm font-bold text-azul-900">{equipoMsg ? 'Orientación' : r.reportante?.nombre}</p>
                    <p className="whitespace-pre-wrap">{m.texto}</p>
                    <p className="mt-1 text-xs text-suave">{fmtFecha(m.creado_en)}</p>
                  </div>
                )
              })}
            </div>
            <form onSubmit={enviarMensaje} className="mt-4 space-y-3">
              <label className="label" htmlFor="rm">Responder al estudiante</label>
              <textarea id="rm" className="input min-h-[96px]" maxLength={2000} value={msg} onChange={(e) => setMsg(e.target.value)} />
              <button className="btn btn-verde sm:w-auto" disabled={ocupado || !msg.trim()}>Enviar respuesta</button>
            </form>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card space-y-3">
            <h2 className="text-lg md:text-lg">Estudiante</h2>
            <p><strong>{r.reportante?.nombre}</strong><br /><span className="text-suave">{grupo}</span></p>
          </div>

          <div className="card space-y-3">
            <h2 className="text-lg md:text-lg">Gestión</h2>
            <div>
              <label className="label" htmlFor="est">Estado</label>
              <select id="est" className="input" value={r.estado} onChange={(e) => void actualizar({ estado: e.target.value as Estado })}>
                {ESTADOS.map((e) => <option key={e} value={e}>{ESTADO_PERSONAL[e]}</option>)}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="pri">Prioridad</label>
              <select id="pri" className="input" value={r.prioridad} onChange={(e) => void actualizar({ prioridad: e.target.value as Prioridad })}>
                <option value="normal">Normal</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="asg">Asignado a</label>
              <select id="asg" className="input" value={r.asignado_a ?? ''} onChange={(e) => void actualizar({ asignado_a: e.target.value || null })}>
                <option value="">Sin asignar</option>
                {equipo.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg md:text-lg">Notas internas</h2>
            <p className="mb-3 text-sm text-suave">Solo las ve el personal. El estudiante nunca.</p>
            <div className="space-y-2">
              {notas.map((n) => (
                <div key={n.id} className="rounded-xl bg-ambar-100 p-3 text-[15px]">
                  <p className="whitespace-pre-wrap">{n.texto}</p>
                  <p className="mt-1 text-xs text-suave">{n.autor?.nombre} · {fmtFecha(n.creado_en)}</p>
                </div>
              ))}
            </div>
            <form onSubmit={guardarNota} className="mt-3 space-y-3">
              <label className="label" htmlFor="nota">Nueva nota</label>
              <textarea id="nota" className="input min-h-[90px]" maxLength={4000} value={nota} onChange={(e) => setNota(e.target.value)} />
              <button className="btn btn-azul btn-sm" disabled={ocupado || !nota.trim()}>Guardar nota</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  )
}
