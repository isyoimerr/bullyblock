import { useEffect, useState } from 'react'
import { Cargando } from '../../components/ui'
import { supabase } from '../../lib/supabase'
import { ESTADOS, ESTADO_PERSONAL, lugarLabel, tipoLabel } from '../../lib/catalogo'
import type { Reporte } from '../../lib/types'

function Barras({ titulo, datos }: { titulo: string; datos: [string, number][] }) {
  const max = Math.max(1, ...datos.map(([, n]) => n))
  return (
    <div className="card">
      <h2 className="mb-3 text-lg md:text-lg">{titulo}</h2>
      {datos.length === 0 && <p className="text-suave">Sin datos todavía.</p>}
      <ul className="space-y-2">
        {datos.map(([k, n]) => (
          <li key={k} className="text-[15px]">
            <div className="mb-0.5 flex justify-between"><span>{k}</span><strong>{n}</strong></div>
            <div className="h-3 overflow-hidden rounded-full bg-borde">
              <div className="h-full rounded-full bg-gradient-to-r from-azul-700 to-azul-500" style={{ width: `${(n / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const contar = (items: Reporte[], f: (r: Reporte) => string) => {
  const m = new Map<string, number>()
  items.forEach((r) => m.set(f(r), (m.get(f(r)) ?? 0) + 1))
  return [...m.entries()].sort((a, b) => b[1] - a[1])
}

export default function Estadisticas() {
  const [items, setItems] = useState<Reporte[] | null>(null)

  useEffect(() => {
    supabase.from('reportes').select('*, reportante:perfiles!reportante_id(nombre, grado, grupo)')
      .then(({ data }) => setItems((data as unknown as Reporte[]) ?? []))
  }, [])

  if (!items) return <Cargando />

  const porMes = contar(items, (r) => new Date(r.creado_en).toLocaleDateString('es-CO', { month: 'long', year: 'numeric' }))

  return (
    <div>
      <h1 className="mb-1 text-2xl md:text-3xl">Estadísticas</h1>
      <p className="mb-4 text-suave">{items.length} reportes en total. Útil para detectar lugares y momentos críticos.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <Barras titulo="Por estado" datos={ESTADOS.map((e) => [ESTADO_PERSONAL[e], items.filter((r) => r.estado === e).length])} />
        <Barras titulo="Por tipo" datos={contar(items, (r) => tipoLabel(r.tipo))} />
        <Barras titulo="Por lugar" datos={contar(items, (r) => lugarLabel(r.lugar))} />
        <Barras titulo="Por grado" datos={contar(items, (r) => (r.reportante?.grado ? `${r.reportante.grado}` : 'Docentes'))} />
        <Barras titulo="Por mes" datos={porMes} />
        <Barras titulo="Urgencia" datos={[['Urgentes', items.filter((r) => r.urgente).length], ['Normales', items.filter((r) => !r.urgente).length]]} />
      </div>
    </div>
  )
}
