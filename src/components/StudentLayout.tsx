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
    <div className="app-shell flex min-h-dvh flex-col bg-[var(--fondo)] text-[var(--texto-principal)]">
      <header className="sticky top-0 z-20 border-b border-[var(--borde)] bg-[var(--superficie)]/90 pt-[env(safe-area-inset-top)] text-[var(--texto-principal)] backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-3 py-2 pr-[3.8rem] md:gap-3 md:px-4 md:py-3 md:pr-4">
          <Escudo size={30} />
          <Marca className="flex-1 text-base text-[var(--texto-principal)] md:text-xl [&>span]:text-[var(--texto-principal)]" />
          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2 font-semibold ${isActive ? 'bg-[var(--superficie-alt)] text-[var(--texto-principal)] shadow-sm' : 'text-[var(--texto-secundario)] hover:bg-[var(--superficie-alt)]'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={() => void salidaRapida()}
            className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-[var(--superficie-alt)] px-3 text-[11px] font-bold text-[var(--texto-principal)] shadow-sm transition hover:bg-[var(--superficie)] md:min-h-[44px] md:px-4 md:text-sm"
            aria-label="Salida rápida: cerrar BullyBlock ahora"
          >
            Salir
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-4 pb-28 text-[var(--texto-principal)] md:pb-10 md:pt-5">
        <Outlet />
      </main>

      <Link
        to="/app/ayuda-ahora"
        className="fixed bottom-24 right-3 z-30 flex items-center gap-2 rounded-full bg-amber-400 px-3.5 py-2.5 text-xs font-bold text-amber-950 shadow-lg shadow-amber-200/70 transition hover:bg-amber-300 sm:right-4 sm:text-sm md:bottom-6 md:px-4 md:py-3"
      >
        <LifeBuoy size={18} aria-hidden="true" />
        Ayuda ahora
      </Link>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--borde)] bg-[var(--superficie)]/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(14,27,41,0.06)] md:hidden"
        aria-label="Principal"
      >
        <div className="mx-auto flex max-w-md px-2 pt-2">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold ${
                  isActive ? 'bg-[var(--superficie-alt)] text-[var(--texto-principal)] shadow-sm' : 'text-[var(--texto-secundario)]'
                }`
              }
            >
              <Icon size={20} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
