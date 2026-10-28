import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import PasswordField from '../components/PasswordField'
import { useAuth } from '../lib/auth'
import { mensajeError, supabase } from '../lib/supabase'
import { formatoCurso } from '../lib/types'

export default function Perfil() {
  const { perfil, session, salir } = useAuth()
  const [clave, setClave] = useState('')
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null)

  async function cambiar(e: FormEvent) {
    e.preventDefault()
    setMsg(null)
    if (clave.length < 8) return setMsg({ ok: false, t: 'La clave debe tener al menos 8 caracteres.' })
    const { error } = await supabase.auth.updateUser({ password: clave })
    if (error) return setMsg({ ok: false, t: mensajeError(error) })
    setClave('')
    setMsg({ ok: true, t: 'Listo, cambiamos tu clave.' })
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl md:text-3xl">Tu perfil</h1>
      <div className="card">
        <h2 className="text-xl">{perfil?.nombre}</h2>
        <p className="text-suave">
          {formatoCurso(perfil?.grado ?? null, perfil?.grupo ?? null)}
          <br />
          {session?.user.email}
        </p>
      </div>
      <form onSubmit={cambiar} className="card space-y-3">
        <h3>Cambiar clave</h3>
        <div>
          <label className="label" htmlFor="nc">Nueva clave</label>
          <PasswordField id="nc" autoComplete="new-password" value={clave} onChange={(e) => setClave(e.target.value)} />
        </div>
        {msg && <p className={msg.ok ? 'aviso-ok' : 'aviso-error'} role="status">{msg.t}</p>}
        <button className="btn btn-azul" disabled={!clave}>Guardar clave</button>
      </form>
      <Link to="/privacidad" className="btn btn-sec">Aviso de privacidad</Link>
      <button className="btn btn-sec" onClick={() => void salir()}>Cerrar sesión</button>
    </div>
  )
}
