import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cargando, EstadoBadge, Vacio } from '../components/ui'
import { supabase } from '../lib/supabase'
import { fmtFecha, tipoLabel } from '../lib/catalogo'
import type { Reporte } from '../lib/types'

export default function Reportes() {
  const [items, setItems] = useState<Reporte[] | null>(null)

  useEffect(() => {
    supabase.from('reportes').select('*').order('creado_en', { ascending: false })
      .then(({ data }) => setItems((data as Reporte[]) ?? []))
  }, [])

  if (!items) return <Cargando />

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl md:text-3xl">Tus reportes</h1>
      {items.length === 0 ? (
        <Vacio>
          <p className="mb-3">Todavía no has enviado ningún reporte.</p>
          <Link to="/app/reportar" className="btn btn-azul">Hacer un reporte</Link>
        </Vacio>
      ) : (
        <ul className="space-y-3">
          {items.map((r) => (
            <li key={r.id}>
              <Link to={`/app/reportes/${r.id}`} className="card block hover:bg-azul-100/40">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <EstadoBadge estado={r.estado} vista="estudiante" />
                  <span className="text-sm text-suave">{fmtFecha(r.creado_en)}</span>
                </div>
                <h3 className="mt-2 text-base">{r.codigo} · {tipoLabel(r.tipo)}</h3>
                <p className="line-clamp-2 text-[15px] text-suave">{r.descripcion}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
