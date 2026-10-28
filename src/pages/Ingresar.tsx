import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import PasswordField from '../components/PasswordField'
import { DEMO_MODE, credencialDemoValida, demoUsers, iniciarDemoSesion, mensajeError, supabase } from '../lib/supabase'
import { rolPorCorreo, rutaPorRol } from '../lib/types'

export default function Ingresar() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [enviando, setEnviando] = useState(false)
  const demoOptions = demoUsers.filter((u) => u.rol !== 'admin')
  const [demoSeleccionado, setDemoSeleccionado] = useState(demoOptions[0]?.email ?? '')

  useEffect(() => {
    setEmail('')
    setClave('')
  }, [])

  const rolDetectado = rolPorCorreo(email.trim())

  function aplicarCuentaDemo(emailDemo: string, claveDemo: string) {
    setDemoSeleccionado(emailDemo)
    setEmail(emailDemo)
    setClave(claveDemo)
    setInfo('Cuenta demo cargada temporalmente.')
    setError('')
  }

  async function entrar(e: FormEvent) {
    e.preventDefault()
    setError('')
    setInfo('')
    setEnviando(true)

    const esDemo = DEMO_MODE || credencialDemoValida(email, clave)
    if (esDemo) {
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
    <AuthShell titulo="Inicia sesión">
      <form onSubmit={entrar} className="space-y-4" noValidate autoComplete="off">
        {DEMO_MODE && demoOptions.length > 0 && (
          <div>
            <label className="label">Acceso rápido</label>
            <div className="grid gap-2 sm:grid-cols-3">
              {demoOptions.map((usuario) => {
                const activo = demoSeleccionado === usuario.email
                const rolLabel = usuario.rol === 'estudiante' ? 'Estudiante' : usuario.rol === 'docente' ? 'Docente' : 'Orientación'
                return (
                  <button
                    key={usuario.email}
                    type="button"
                    onClick={() => aplicarCuentaDemo(usuario.email, usuario.password)}
                    className={`flex min-h-[80px] flex-col justify-center rounded-2xl border px-3 py-2 text-left text-sm font-semibold transition ${
                      activo
                        ? 'border-[var(--brand-green)] bg-[var(--brand-green)]/10 text-[var(--texto-principal)] shadow-[0_8px_20px_rgba(27,180,76,0.08)]'
                        : 'border-[var(--borde)] bg-[var(--superficie-alt)] text-[var(--texto-principal)] hover:border-[var(--brand-green)]/50'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-[var(--texto-suave)]">Rol</span>
                    <span className="mt-1 block text-sm font-bold">{rolLabel}</span>
                    <span className="mt-1 block text-[11px] break-all text-[var(--texto-suave)]">{usuario.email}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

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
