import { useEffect, useState } from 'react'
import { Cargando } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { mensajeError, supabase } from '../../lib/supabase'
import { formatoCurso, type Perfil, type Rol } from '../../lib/types'

const ROLES: Rol[] = ['estudiante', 'docente', 'psicoorientador', 'admin']

export default function Usuarios() {
  const { perfil: yo } = useAuth()
  const [items, setItems] = useState<Perfil[] | null>(null)
  const [error, setError] = useState('')
  const [q, setQ] = useState('')

  async function cargar() {
    const { data } = await supabase.from('perfiles').select('*').order('creado_en', { ascending: false })
    setItems((data as Perfil[]) ?? [])
  }
  useEffect(() => { void cargar() }, [])

  async function cambiar(id: string, patch: Partial<Pick<Perfil, 'rol' | 'activo' | 'aprobado'>>) {
    setError('')
    const { error } = await supabase.from('perfiles').update(patch).eq('id', id)
    if (error) return setError(mensajeError(error))
    void cargar()
  }

  if (!items) return <Cargando />
  const t = q.trim().toLowerCase()
  const lista = items.filter((p) => !t || p.nombre.toLowerCase().includes(t) || (p.documento ?? '').includes(t))

  return (
    <div>
      <h1 className="mb-1 text-2xl md:text-3xl">Usuarios</h1>
      <p className="mb-4 text-suave">
        Las cuentas del personal se crean en Supabase (Authentication). Aquí cambias su rol, las activas o las desactivas.
      </p>
      {error && <p className="aviso-error mb-3" role="alert">{error}</p>}
      <div className="card mb-4">
        <label className="label" htmlFor="bq">Buscar por nombre o documento</label>
        <input id="bq" className="input" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-borde bg-white">
        <table className="w-full min-w-[720px] text-left text-[15px]">
          <thead className="bg-azul-100 text-azul-900">
            <tr><th className="p-3">Nombre</th><th className="p-3">Grado</th><th className="p-3">Rol</th><th className="p-3">Aprobado</th><th className="p-3">Activo</th></tr>
          </thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.id} className="border-t border-borde">
                <td className="p-3"><strong>{p.nombre}</strong><br /><span className="text-sm text-suave">{p.documento}</span></td>
                <td className="p-3">{p.grado ? formatoCurso(p.grado, p.grupo) : '—'}</td>
                <td className="p-3">
                  <label className="sr-only" htmlFor={`rol-${p.id}`}>Rol de {p.nombre}</label>
                  <select id={`rol-${p.id}`} className="input !min-h-[44px] capitalize" value={p.rol} disabled={p.id === yo?.id}
                    onChange={(e) => void cambiar(p.id, { rol: e.target.value as Rol })}>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td className="p-3">
                  <input type="checkbox" className="h-6 w-6 accent-[#23803A]" aria-label={`Aprobado: ${p.nombre}`} checked={p.aprobado}
                    onChange={(e) => void cambiar(p.id, { aprobado: e.target.checked })} />
                </td>
                <td className="p-3">
                  <input type="checkbox" className="h-6 w-6 accent-[#23803A]" aria-label={`Activo: ${p.nombre}`} checked={p.activo} disabled={p.id === yo?.id}
                    onChange={(e) => void cambiar(p.id, { activo: e.target.checked })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
