import { NavLink, Outlet } from 'react-router-dom'
import { BellRing, BookOpenText, ClipboardList, LogOut } from 'lucide-react'
import Escudo, { Marca } from './Escudo'
import { useAuth } from '../lib/auth'

const links = [
  { to: '/docente', label: 'Inicio', icon: ClipboardList, end: true },
  { to: '/docente/avisos', label: 'Avisos', icon: BellRing, end: false },
  { to: '/docente/guia', label: 'Guía', icon: BookOpenText, end: false },
  { to: '/docente/reportes', label: 'Mis reportes', icon: ClipboardList, end: false },
]

export default function DocenteLayout() {
  const { perfil, salir } = useAuth()

  return (
    <div className="app-shell min-h-dvh bg-[var(--fondo)] text-[var(--texto-principal)]">
      <header className="border-b border-[var(--borde)] bg-[var(--superficie)]/90 backdrop-blur-md shadow-[0_8px_24px_rgba(14,27,41,0.05)]">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Escudo size={32} />
          <Marca className="flex-1 text-lg text-[var(--texto-principal)] [&>span]:text-[var(--texto-principal)]" />
          <div className="flex items-center gap-2">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `hidden rounded-xl px-3 py-2 text-sm font-semibold md:inline-flex ${
                    isActive ? 'bg-[var(--superficie-alt)] text-[var(--texto-principal)] shadow-sm' : 'text-[var(--texto-secundario)] hover:bg-[var(--superficie-alt)]'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </span>
              </NavLink>
            ))}
            <button onClick={() => void salir()} className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--superficie-alt)] px-3 text-sm font-semibold text-[var(--texto-principal)] shadow-sm">
              <LogOut size={16} aria-hidden="true" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-6 text-[var(--texto-principal)]">
        <Outlet />
      </main>
    </div>
  )
}
