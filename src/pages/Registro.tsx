import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import PasswordField from '../components/PasswordField'
import { mensajeError, supabase } from '../lib/supabase'

const GRADOS = [6, 7, 8, 9, 10, 11]

export default function Registro() {
  const nav = useNavigate()
  const [f, setF] = useState({ nombre: '', email: '', documento: '', grado: '', grupo: '', clave: '', acepto: false })
  const [error, setError] = useState('')
  const [revisaCorreo, setRevisaCorreo] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }))

  const valido =
    f.nombre.trim().length >= 3 && /\S+@\S+\.\S+/.test(f.email) && f.documento.trim().length >= 5 &&
    f.grado !== '' && f.grupo.trim() !== '' && f.clave.length >= 8 && f.acepto

  async function crear(e: FormEvent) {
    e.preventDefault()
    if (!valido) return
    setError('')
    setEnviando(true)
    const { data, error } = await supabase.auth.signUp({
      email: f.email.trim(),
      password: f.clave,
      options: {
        data: {
          nombre: f.nombre.trim(),
          documento: f.documento.trim(),
          grado: f.grado,
          grupo: f.grupo.trim().toUpperCase(),
        },
      },
    })
    setEnviando(false)
    if (error) return setError(mensajeError(error))
    if (data.session) nav('/', { replace: true })
    else setRevisaCorreo(true)
  }

  if (revisaCorreo) {
    return (
      <AuthShell titulo="Revisa tu correo">
        <p className="aviso-ok mb-4">Te enviamos un mensaje para confirmar tu cuenta.</p>
        <p className="mb-4 text-suave">Abre el enlace del correo y luego ingresa con tu clave.</p>
        <Link to="/ingresar" className="btn btn-azul">Ir a ingresar</Link>
      </AuthShell>
    )
  }

  return (
    <AuthShell titulo="Crear mi cuenta">
      <form onSubmit={crear} className="registro-form" noValidate>
        <div className="registro-field">
          <label className="label" htmlFor="nombre">Nombre completo</label>
          <input id="nombre" className="input" autoComplete="name" value={f.nombre}
            onChange={(e) => set('nombre', e.target.value)} />
        </div>

        <div className="registro-field">
          <label className="label" htmlFor="email">Correo</label>
          <input id="email" className="input" type="email" autoComplete="email" inputMode="email" value={f.email}
            onChange={(e) => set('email', e.target.value)} placeholder="nombre@estudiante.com" />
        </div>

        <div className="registro-field">
          <label className="label" htmlFor="doc">Documento de identidad</label>
          <input id="doc" className="input" inputMode="numeric" value={f.documento}
            onChange={(e) => set('documento', e.target.value.replace(/\D/g, ''))} />
        </div>

        <div className="registro-grid">
          <div className="registro-field">
            <label className="label" htmlFor="grado">Grado</label>
            <select id="grado" className="input" value={f.grado} onChange={(e) => set('grado', e.target.value)}>
              <option value="">Elige</option>
              {GRADOS.map((g) => <option key={g} value={g}>{g}°</option>)}
            </select>
          </div>

          <div className="registro-field">
            <label className="label" htmlFor="grupo">Grupo</label>
            <input id="grupo" className="input" maxLength={3} value={f.grupo}
              onChange={(e) => set('grupo', e.target.value)} placeholder="A" />
          </div>
        </div>

        <div className="registro-field">
          <label className="label" htmlFor="clave">Clave</label>
          <PasswordField id="clave" autoComplete="new-password" value={f.clave} onChange={(e) => set('clave', e.target.value)} />
          <p className="hint">Mínimo 8 caracteres.</p>
        </div>

        <label className="registro-checkbox">
          <input type="checkbox" checked={f.acepto} onChange={(e) => set('acepto', e.target.checked)} />
          <span>
            Leí y acepto el <Link to="/privacidad" className="registro-link">aviso de privacidad</Link>.
          </span>
        </label>

        {error && <p className="aviso-error" role="alert">{error}</p>}

        <button className="btn btn-verde" disabled={!valido || enviando}>
          {enviando ? 'Creando…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="mt-4 text-center text-[15px] text-[var(--texto-suave)]">
        ¿Ya tienes cuenta? <Link to="/ingresar" className="font-bold text-[var(--azul-700)] hover:underline">Ingresa</Link>
      </p>
    </AuthShell>
  )
}
