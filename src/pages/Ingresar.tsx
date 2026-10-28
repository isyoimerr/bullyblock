import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import PasswordField from '../components/PasswordField'
import { DEMO_MODE, iniciarDemoSesion, mensajeError, supabase } from '../lib/supabase'
import { rolPorCorreo, rutaPorRol } from '../lib/types'

export default function Ingresar() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    setEmail('')
    setClave('')
  }, [])

  const rolDetectado = rolPorCorreo(email.trim())

  async function entrar(e: FormEvent) {
    e.preventDefault()
    setError('')
    setInfo('')
    setEnviando(true)

    if (DEMO_MODE) {
      const demo = iniciarDemoSesion(email.trim(), clave)
      if (demo) {
        setEnviando(false)
        nav(rutaPorRol(demo.perfil.rol), { replace: true })
        return
      }
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: clave,
    })
    setEnviando(false)

    if (loginError) return setError(mensajeError(loginError))

    nav(rutaPorRol(rolDetectado), { replace: true })
  }

  async function olvide() {
    setError('')
    setInfo('')
    if (!email.trim()) return setError('Escribe tu correo arriba y vuelve a tocar “Olvidé mi clave”.')

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin + '/ingresar',
    })

    if (error) return setError(mensajeError(error))
    setInfo('Si el correo existe, te enviamos un enlace para cambiar tu clave.')
  }

  return (
    <AuthShell titulo="Ingresar">
      <form onSubmit={entrar} className="space-y-4" noValidate autoComplete="off">
        <div>
          <label className="label" htmlFor="email">Correo</label>
          <input
            id="email"
            className="input"
            type="email"
            autoComplete="username"
            inputMode="email"
            spellCheck={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@estudiante.com"
          />
        </div>

        <div>
          <label className="label" htmlFor="clave">Contraseña</label>
          <PasswordField
            id="clave"
            autoComplete="current-password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>

        {error && <p className="aviso-error" role="alert">{error}</p>}
        {info && <p className="aviso-ok" role="status">{info}</p>}

        <button className="btn btn-azul" disabled={enviando || !email || !clave}>
          {enviando ? 'Ingresando…' : 'Ingresar'}
        </button>

        <button type="button" onClick={olvide} className="min-h-[44px] w-full font-semibold text-[var(--azul-700)] hover:underline">
          ¿Olvidaste tu contraseña?
        </button>
      </form>

      <div className="mt-4 flex flex-col gap-2 text-sm">
        <Link to="/registro" className="font-bold text-[var(--azul-700)] hover:underline">
          No tengo cuenta · Crear una
        </Link>
        <Link to="/" className="font-bold text-[var(--azul-700)] hover:underline">
          Volver al inicio
        </Link>
      </div>
    </AuthShell>
  )
}
