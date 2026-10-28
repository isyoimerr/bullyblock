import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cargando, EstadoBadge } from '../../components/ui'
import { supabase } from '../../lib/supabase'
import { ESTADOS, ESTADO_PERSONAL, TIPOS, fmtFecha, horasDesde, tipoLabel } from '../../lib/catalogo'
import { formatoCurso, type Estado, type Reporte } from '../../lib/types'

const COL_CLASE: Record<Estado, string> = {
  nuevo: 'bg-azul-100/60',
  en_revision: 'bg-ambar-100/70',
  en_atencion: 'bg-verde-100/70',
  cerrado: 'bg-[var(--superficie-alt)]',
}

export function Plazo({ r }: { r: Reporte }) {
  if (r.estado !== 'nuevo') return null
  const h = horasDesde(r.creado_en)
  if (h < 24) return null
  const rojo = h >= 48
  return (
    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-bold ${rojo ? 'bg-rojo-600 text-white' : 'bg-ambar-100 text-ambar-800'}`}>
      {Math.floor(h)} h sin atender
    </span>
  )
}

export default function Casos() {
  const [items, setItems] = useState<Reporte[] | null>(null)
  const [vista, setVista] = useState<'tablero' | 'lista'>('tablero')
  const [q, setQ] = useState('')
  const [tipo, setTipo] = useState('')
  const [soloUrgentes, setSoloUrgentes] = useState(false)
  const [error, setError] = useState('')
  const [arrastrando, setArrastrando] = useState<Estado | null>(null)

  async function cargar() {
    const { data, error } = await supabase
      .from('reportes')
      .select('*, reportante:perfiles!reportante_id(nombre, grado, grupo)')
      .order('creado_en', { ascending: false })
    if (error) setError('No pudimos cargar los casos.')
    setItems((data as unknown as Reporte[]) ?? [])
  }
  useEffect(() => { void cargar() }, [])

  const filtrados = useMemo(() => {
    const t = q.trim().toLowerCase()
    return (items ?? []).filter(
      (r) =>
        (!tipo || r.tipo === tipo) &&
        (!soloUrgentes || r.urgente) &&
        (!t || r.codigo.toLowerCase().includes(t) || r.reportante?.nombre.toLowerCase().includes(t)),
    )
  }, [items, q, tipo, soloUrgentes])

  async function mover(id: string, estado: Estado) {
    const previo = items
    setItems((p) => p?.map((r) => (r.id === id ? { ...r, estado } : r)) ?? p)
    const { error } = await supabase.from('reportes').update({ estado }).eq('id', id)
    if (error) {
      setItems(previo)
      setError('No se pudo mover el caso.')
    }
  }

  if (!items) return <Cargando />

  const abiertos = items.filter((r) => r.estado !== 'cerrado')
  const urgentes = abiertos.filter((r) => r.urgente)
  const grupo = (r: Reporte) => (r.reportante?.grado ? formatoCurso(r.reportante.grado, r.reportante.grupo) : 'Docente')

  const Tarjeta = ({ r }: { r: Reporte }) => (
    <Link
      to={`/panel/casos/${r.id}`}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', r.id)}
      className={`block rounded-xl border bg-[var(--superficie)] p-3 text-[15px] shadow-sm hover:shadow-md ${
        r.urgente ? 'border-l-[5px] border-rojo-600 bg-rojo-100/50' : 'border-borde'
      }`}
    >
      {r.urgente && <span className="mb-1 inline-block rounded-full bg-rojo-600 px-2 py-0.5 text-xs font-bold text-white">URGENTE</span>}
      <strong className="block text-texto">{r.codigo}</strong>
      <span className="text-suave">{tipoLabel(r.tipo)} · {grupo(r)}</span>
      <span className="block text-sm text-suave">{r.reportante?.nombre}</span>
      <Plazo r={r} />
    </Link>
  )

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl">Gestión de casos</h1>
        <div className="flex rounded-xl border border-borde bg-[var(--superficie)] p-1" role="group" aria-label="Vista">
          {(['tablero', 'lista'] as const).map((v) => (
            <button key={v} onClick={() => setVista(v)} aria-pressed={vista === v}
              className={`min-h-[40px] rounded-lg px-4 font-semibold capitalize ${vista === v ? 'bg-azul-700 text-white' : 'text-azul-900'}`}>{v}</button>
          ))}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Resumen n={abiertos.length} t="Abiertos" />
        <Resumen n={urgentes.length} t="Urgentes" rojo />
        <Resumen n={items.filter((r) => r.estado === 'nuevo').length} t="Sin atender" />
        <Resumen n={items.filter((r) => r.estado === 'cerrado').length} t="Cerrados" />
      </div>

      <div className="card mb-4 grid gap-3 md:grid-cols-[1fr_200px_auto] md:items-end">
        <div>
          <label className="label" htmlFor="q">Buscar por código o nombre</label>
          <input id="q" className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="BB-2026-0001" />
        </div>
        <div>
          <label className="label" htmlFor="ft">Tipo</label>
          <select id="ft" className="input" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Todos</option>
            {TIPOS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
        <label className="flex min-h-[48px] items-center gap-2 font-semibold">
          <input type="checkbox" className="h-5 w-5 accent-[#D93B3B]" checked={soloUrgentes} onChange={(e) => setSoloUrgentes(e.target.checked)} />
          Solo urgentes
        </label>
      </div>

      {error && <p className="aviso-error mb-3" role="alert">{error}</p>}

      {vista === 'tablero' ? (
        <div className="grid auto-cols-[minmax(240px,1fr)] grid-flow-col gap-3 overflow-x-auto pb-3 lg:grid-flow-row lg:grid-cols-4">
          {ESTADOS.map((e) => {
            const col = filtrados.filter((r) => r.estado === e)
            return (
              <section
                key={e}
                aria-label={ESTADO_PERSONAL[e]}
                onDragOver={(ev) => { ev.preventDefault(); setArrastrando(e) }}
                onDragLeave={() => setArrastrando(null)}
                onDrop={(ev) => {
                  ev.preventDefault()
                  setArrastrando(null)
                  const id = ev.dataTransfer.getData('text/plain')
                  if (id) void mover(id, e)
                }}
                className={`min-h-[200px] rounded-2xl border p-3 ${COL_CLASE[e]} ${arrastrando === e ? 'border-azul-500 ring-2 ring-azul-500' : 'border-borde'}`}
              >
                <h2 className="mb-3 flex items-center justify-between text-base md:text-base">
                  {ESTADO_PERSONAL[e]} <span className="rounded-full bg-[var(--superficie)] px-2 text-sm">{col.length}</span>
                </h2>
                <div className="space-y-2">
                  {col.map((r) => <Tarjeta key={r.id} r={r} />)}
                  {col.length === 0 && <p className="py-6 text-center text-sm text-suave">Sin casos</p>}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-borde bg-[var(--superficie)]">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <thead className="bg-azul-100 text-azul-900">
              <tr><th className="p-3">Código</th><th className="p-3">Estudiante</th><th className="p-3">Tipo</th><th className="p-3">Estado</th><th className="p-3">Fecha</th></tr>
            </thead>
            <tbody>
              {filtrados.map((r) => (
                <tr key={r.id} className="border-t border-borde hover:bg-azul-100/40">
                  <td className="p-3 font-semibold">
                    <Link to={`/panel/casos/${r.id}`} className="text-azul-700 hover:underline">{r.codigo}</Link>
                    {r.urgente && <span className="ml-2 rounded-full bg-rojo-600 px-2 py-0.5 text-xs font-bold text-white">URGENTE</span>}
                  </td>
                  <td className="p-3">{r.reportante?.nombre} <span className="text-suave">({grupo(r)})</span></td>
                  <td className="p-3">{tipoLabel(r.tipo)}</td>
                  <td className="p-3"><EstadoBadge estado={r.estado} vista="personal" /></td>
                  <td className="p-3 text-suave">{fmtFecha(r.creado_en)}</td>
                </tr>
              ))}
              {filtrados.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-suave">Sin resultados</td></tr>}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-sm text-suave">Arrastra una tarjeta a otra columna para cambiar su estado, o ábrela para ver el detalle.</p>
    </div>
  )
}

function Resumen({ n, t, rojo }: { n: number; t: string; rojo?: boolean }) {
  return (
    <div className="card !p-3">
      <p className={`font-titulo text-3xl font-extrabold ${rojo && n > 0 ? 'text-rojo-600' : 'text-azul-900'}`}>{n}</p>
      <p className="text-sm text-suave">{t}</p>
    </div>
  )
}
