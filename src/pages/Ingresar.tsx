import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import PasswordField from '../components/PasswordField'
import { mensajeError, supabase, supabaseConfigurada } from '../lib/supabase'
import { rolPorCorreo, rutaPorRol } from '../lib/types'

export default function Ingresar() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function entrar(e: FormEvent) {
    e.preventDefault()
    setError('')
    setInfo('')

    if (!email.trim() || !clave.trim()) {
      setError('Debes ingresar correo y contraseña para continuar.')
      return
    }

    if (!supabaseConfigurada) {
      setError('Supabase no está configurado en esta instancia. Revisa las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.')
      return
    }

    setEnviando(true)

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: clave,
      })

      if (loginError) {
        setError(mensajeError(loginError))
        setEnviando(false)
        return
      }

      const uid = data.user?.id
      let rol = rolPorCorreo(email)

      if (uid) {
        const { data: perfilData } = await supabase.from('perfiles').select('*').eq('id', uid).maybeSingle()
        if (perfilData?.rol) {
          rol = perfilData.rol
        }
      }

      nav(rutaPorRol(rol), { replace: true })
    } catch (err) {
      setError(mensajeError(err))
    } finally {
      setEnviando(false)
    }
  }

  async function olvide() {
    setError('')
    setInfo('')
    if (!email.trim()) return setError('Escribe tu correo arriba y vuelve a tocar “Olvidé mi clave”.')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: window.location.origin + '/ingresar',
      })

      if (error) return setError(mensajeError(error))
      setInfo('Si el correo existe, te enviamos un enlace para cambiar tu clave.')
    } catch (err) {
      setError(mensajeError(err))
    }
  }

  return (
    <AuthShell titulo="Inicia sesión">
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
            placeholder="nombre@colegio.edu.co"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'login-error' : undefined}
          />
        </div>

        <div>
          <label className="label" htmlFor="clave">Contraseña</label>
          <PasswordField
            id="clave"
            autoComplete="current-password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'login-error' : undefined}
          />
        </div>

        {error && (
          <p id="login-error" className="aviso-error" role="alert">
            {error}
          </p>
        )}
        {info && <p className="aviso-ok" role="status">{info}</p>}

        <button type="submit" className="btn btn-azul" disabled={enviando || !email || !clave}>
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
