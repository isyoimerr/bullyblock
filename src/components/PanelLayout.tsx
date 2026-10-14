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
      isActive ? 'bg-azul-700 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
    }`

  return (
    <div className="min-h-dvh bg-[#f6faf8] lg:flex">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-white/60 bg-white/80 p-4 text-slate-800 shadow-[0_12px_30px_rgba(59,130,246,0.05)] backdrop-blur-sm lg:flex">
        <div className="mb-6 flex items-center gap-2 px-2">
          <Escudo size={36} />
          <Marca className="text-xl text-slate-900 [&>span]:text-slate-900" />
        </div>
        <nav className="flex flex-1 flex-col gap-1" aria-label="Panel">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={clase}>
              <Icon size={20} aria-hidden="true" />{label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-200 pt-3 text-sm text-slate-600">
          <p className="truncate font-semibold text-slate-900">{perfil?.nombre}</p>
          <p className="mb-2 capitalize">{perfil?.rol}</p>
          <button onClick={() => void salir()} className="flex min-h-[44px] items-center gap-2 font-semibold text-slate-700 hover:text-slate-900">
            <LogOut size={18} aria-hidden="true" />Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1 bg-[#f6faf8]">
        <header className="border-b border-white/50 bg-[linear-gradient(180deg,rgba(59,130,246,0.12),rgba(29,78,216,0.06))] pt-[env(safe-area-inset-top)] shadow-[0_8px_24px_rgba(59,130,246,0.05)] lg:hidden">
          <div className="flex items-center gap-2 px-4 py-3">
            <Escudo size={32} />
            <Marca className="flex-1 text-lg text-slate-900 [&>span]:text-slate-900" />
            <button onClick={() => void salir()} className="min-h-[44px] rounded-full bg-white/80 px-4 text-sm font-bold text-slate-900 shadow-sm">
              Salir
            </button>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3" aria-label="Panel">
            {links.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={clase}>{label}</NavLink>
            ))}
          </nav>
        </header>
        <main className="p-4 md:p-6"><Outlet /></main>
      </div>
    </div>
  )
}
