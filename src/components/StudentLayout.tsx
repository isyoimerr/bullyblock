import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Home, LifeBuoy, Megaphone, User } from 'lucide-react'
import Escudo from './Escudo'
import { Marca } from './Escudo'
import { useAuth } from '../lib/auth'

const links = [
  { to: '/app', label: 'Inicio', icon: Home, end: true },
  { to: '/app/reportes', label: 'Reportes', icon: Megaphone, end: false },
  { to: '/app/perfil', label: 'Perfil', icon: User, end: false },
]

export default function StudentLayout() {
  const { salir } = useAuth()
  const navigate = useNavigate()

  async function salidaRapida() {
    await salir()
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[#f6faf8]">
      <header className="sticky top-0 z-20 border-b border-white/50 bg-[linear-gradient(180deg,rgba(59,130,246,0.12),rgba(29,78,216,0.06))] pt-[env(safe-area-inset-top)] text-slate-800 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Escudo size={34} />
          <Marca className="flex-1 text-xl text-slate-900 [&>span]:text-slate-900" />
          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2 font-semibold ${isActive ? 'bg-white/80 text-slate-900 shadow-sm' : 'text-slate-700 hover:bg-white/60'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={() => void salidaRapida()}
            className="min-h-[44px] rounded-full bg-white/80 px-4 text-sm font-bold text-slate-900 shadow-sm hover:bg-white"
            aria-label="Salida rápida: cerrar BullyBlock ahora"
          >
            Salir rápido
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-5 pb-28 md:pb-10">
        <Outlet />
      </main>

      <Link
        to="/app/ayuda-ahora"
        className="fixed bottom-24 right-4 z-30 flex items-center gap-2 rounded-full bg-amber-400 px-4 py-3 text-sm font-bold text-amber-950 shadow-lg shadow-amber-200/70 transition hover:bg-amber-300 md:bottom-6"
      >
        <LifeBuoy size={18} aria-hidden="true" />
        Ayuda ahora
      </Link>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(219,234,254,0.8))] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(59,130,246,0.08)] md:hidden"
        aria-label="Principal"
      >
        <div className="mx-auto flex max-w-md px-2 pt-2">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-[13px] font-semibold ${
                  isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-700'
                }`
              }
            >
              <Icon size={22} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
