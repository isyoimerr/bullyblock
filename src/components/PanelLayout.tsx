import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, ClipboardList, LogOut, Users } from 'lucide-react'
import Escudo, { Marca } from './Escudo'
import { useAuth } from '../lib/auth'

export default function PanelLayout() {
  const { perfil, salir } = useAuth()
  const links = [
    { to: '/panel', label: 'Casos', icon: ClipboardList, end: true },
    { to: '/panel/estadisticas', label: 'Estadísticas', icon: BarChart3, end: false },
    ...(perfil?.rol === 'admin' ? [{ to: '/panel/usuarios', label: 'Usuarios', icon: Users, end: false }] : []),
  ]
  const clase = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-[44px] items-center gap-2 rounded-xl px-3 font-semibold ${
      isActive ? 'bg-[var(--brand-green)] text-[var(--texto-inverso)] shadow-sm' : 'text-[var(--texto-secundario)] hover:bg-[var(--superficie-alt)]'
    }`

  return (
    <div className="app-shell min-h-dvh bg-[var(--fondo)] text-[var(--texto-principal)] lg:flex">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--borde)] bg-[var(--superficie)]/90 p-4 text-[var(--texto-principal)] shadow-[0_12px_30px_rgba(14,27,41,0.04)] backdrop-blur-sm lg:flex">
        <div className="mb-6 flex items-center gap-2 px-2">
          <Escudo size={36} />
          <Marca className="text-xl text-[var(--texto-principal)] [&>span]:text-[var(--texto-principal)]" />
        </div>
        <nav className="flex flex-1 flex-col gap-1" aria-label="Panel">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={clase}>
              <Icon size={20} aria-hidden="true" />{label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-[var(--borde)] pt-3 text-sm text-[var(--texto-secundario)]">
          <p className="truncate font-semibold text-[var(--texto-principal)]">{perfil?.nombre}</p>
          <p className="mb-2 capitalize">{perfil?.rol}</p>
          <button onClick={() => void salir()} className="flex min-h-[44px] items-center gap-2 font-semibold text-[var(--texto-principal)] hover:text-[var(--brand-green)]">
            <LogOut size={18} aria-hidden="true" />Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1 bg-[var(--fondo)]">
        <header className="border-b border-[var(--borde)] bg-[var(--superficie)]/90 pt-[env(safe-area-inset-top)] shadow-[0_8px_24px_rgba(14,27,41,0.04)] lg:hidden">
          <div className="flex items-center gap-2 px-3 py-2 pr-[3.6rem]">
            <Escudo size={30} />
            <Marca className="flex-1 text-base text-[var(--texto-principal)] [&>span]:text-[var(--texto-principal)]" />
            <button onClick={() => void salir()} className="min-h-[40px] rounded-full bg-[var(--superficie-alt)] px-3 text-[11px] font-bold text-[var(--texto-principal)] shadow-sm sm:text-sm">
              Salir
            </button>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3" aria-label="Panel">
            {links.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={clase}>{label}</NavLink>
            ))}
          </nav>
        </header>
        <main className="p-4 text-[var(--texto-principal)] md:p-6"><Outlet /></main>
      </div>
    </div>
  )
}
