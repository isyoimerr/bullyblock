import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BookOpen, GraduationCap, ShieldCheck } from 'lucide-react'
import AuthShell from '../components/AuthShell'
import PasswordField from '../components/PasswordField'
import { mensajeError, supabase } from '../lib/supabase'
import { rolPorCorreo, rutaPorRol } from '../lib/types'

type RolLogin = 'estudiante' | 'docente' | 'equipo'

const opciones: Record<RolLogin, { titulo: string; icono: typeof GraduationCap; sub: string; color: string }> = {
  estudiante: {
    titulo: 'Soy estudiante',
    icono: GraduationCap,
    sub: 'Reporta, pide ayuda o habla con alguien',
    color: 'bg-[var(--verde-100)] text-[var(--verde-700)]',
  },
  docente: {
    titulo: 'Soy docente',
    icono: BookOpen,
    sub: 'Acompaña y avisa cuando un estudiante te necesite',
    color: 'bg-blue-100 text-blue-700',
  },
  equipo: {
    titulo: 'Orientación y administración',
    icono: ShieldCheck,
    sub: 'Gestiona casos y acompaña a los estudiantes',
    color: 'bg-[var(--superficie-alt)] text-[var(--texto-principal)]',
  },
}

const demoUsers: Record<RolLogin, { email: string; password: string }> = {
  estudiante: { email: 'demo@estudiante.com', password: 'demo1234' },
  docente: { email: 'docente.demo@estudiante.com', password: 'demo1234' },
  equipo: { email: 'orientacion.demo@estudiante.com', password: 'demo1234' },
}

export default function Ingresar() {
  const nav = useNavigate()
  const { rol } = useParams<{ rol?: string }>()
  const acceso = useMemo<RolLogin>(() => {
    if (rol === 'docente') return 'docente'
    if (rol === 'equipo') return 'equipo'
    return 'estudiante'
  }, [rol])

  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [enviando, setEnviando] = useState(false)

  const config = opciones[acceso]
  const Icono = config.icono
  const modoDemo = String(import.meta.env.VITE_DEMO_MODE ?? 'false').toLowerCase() === 'true'

  async function entrar(e: FormEvent) {
    e.preventDefault()
    setError('')
    setInfo('')
    setEnviando(true)

    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password: clave })
    setEnviando(false)
    if (loginError) return setError(mensajeError(loginError))

    const emailNormalizado = email.trim().toLowerCase()
    const rolCuenta = rolPorCorreo(emailNormalizado)
    const destino = rutaPorRol(rolCuenta)

    if (acceso === 'estudiante' && rolCuenta !== 'estudiante') {
      setInfo('Esta cuenta es de ' + (rolCuenta === 'docente' ? 'docente' : 'personal') + '. Te llevamos a tu acceso.')
      setTimeout(() => nav(destino, { replace: true }), 900)
      return
    }

    if (acceso === 'docente' && rolCuenta !== 'docente') {
      setInfo('Esta cuenta no es de docente. Te llevamos a tu acceso.')
      setTimeout(() => nav(destino, { replace: true }), 900)
      return
    }

    if (acceso === 'equipo' && rolCuenta !== 'psicoorientador' && rolCuenta !== 'admin') {
      setInfo('Esta cuenta no corresponde a orientación ni administración. Te llevamos a tu acceso.')
      setTimeout(() => nav(destino, { replace: true }), 900)
      return
    }

    nav(destino, { replace: true })
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

  const usarDemo = (tipo: RolLogin) => {
    setEmail(demoUsers[tipo].email)
    setClave(demoUsers[tipo].password)
  }

  return (
    <AuthShell titulo="¿Cómo quieres entrar?">
      <div className="mb-5 grid gap-3">
        {(Object.keys(opciones) as RolLogin[]).map((tipo) => {
          const opcion = opciones[tipo]
          const Icon = opcion.icono
          const activo = acceso === tipo
          return (
            <Link
              key={tipo}
              to={tipo === 'equipo' ? '/ingresar/equipo' : `/ingresar/${tipo}`}
              className={`flex min-h-[72px] items-center gap-3 rounded-2xl border p-3 transition ${activo ? 'border-[var(--verde-700)] bg-[var(--verde-50)] ring-1 ring-[var(--verde-200)]' : 'border-[var(--borde)] bg-[var(--superficie)] hover:border-[var(--brand-green)]'}`}
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${opcion.color}`}>
                <Icon size={24} aria-hidden="true" />
              </span>
              <span className="flex-1 text-left">
                <span className="block text-base font-bold text-[var(--texto-principal)]">{opcion.titulo}</span>
                <span className="mt-1 block text-sm text-[var(--texto-secundario)]">{opcion.sub}</span>
              </span>
            </Link>
          )
        })}
      </div>

      <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
        <p className="font-bold text-slate-900">Acceso {config.titulo}</p>
        <p className="mt-1">Usa tu correo y clave del colegio o la cuenta de ejemplo.</p>
      </div>

      {modoDemo && (
        <div className="mb-4 rounded-2xl border border-[var(--verde-100)] bg-[var(--verde-100)] p-3 text-sm text-[var(--azul-900)]">
          <p className="font-bold">Cuenta demo</p>
          <p className="mt-1">Correo: {demoUsers[acceso].email}</p>
          <p>Clave: {demoUsers[acceso].password}</p>
          <button type="button" onClick={() => usarDemo(acceso)} className="mt-2 font-bold text-[var(--azul-700)] underline">
            Usar credenciales demo
          </button>
        </div>
      )}

      <form onSubmit={entrar} className="space-y-4" noValidate>
        <div>
          <label className="label" htmlFor="email">Correo</label>
          <input id="email" className="input" type="email" autoComplete="email" inputMode="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nombre@estudiante.com" />
        </div>
        <div>
          <label className="label" htmlFor="clave">Clave</label>
          <PasswordField id="clave" autoComplete="current-password" required value={clave} onChange={(e) => setClave(e.target.value)} />
        </div>
        {error && <p className="aviso-error" role="alert">{error}</p>}
        {info && <p className="aviso-ok" role="status">{info}</p>}
        <button className="btn btn-azul" disabled={enviando || !email || !clave}>
          {enviando ? 'Ingresando…' : 'Ingresar'}
        </button>
        <button type="button" onClick={olvide} className="min-h-[44px] w-full font-semibold text-[var(--azul-700)] hover:underline">
          Olvidé mi clave
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <Link to="/ingresar" className="font-bold text-[var(--azul-700)] hover:underline">Cambiar de acceso</Link>
        {acceso === 'estudiante' && (
          <Link to="/registro" className="font-bold text-[var(--azul-700)] hover:underline">Crear mi cuenta</Link>
        )}
      </div>
    </AuthShell>
  )
}
