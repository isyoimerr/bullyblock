import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Estado } from '../lib/types'
import { ESTADO_CLASE, ESTADO_ESTUDIANTE, ESTADO_PERSONAL } from '../lib/catalogo'

export function Cargando({ texto = 'Cargando…' }: { texto?: string }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center p-6" role="status" aria-live="polite">
      <div className="flex items-center gap-3 text-suave">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-azul-500 border-t-transparent" />
        {texto}
      </div>
    </div>
  )
}

export function EstadoBadge({ estado, vista }: { estado: Estado; vista: 'estudiante' | 'personal' }) {
  const t = vista === 'estudiante' ? ESTADO_ESTUDIANTE[estado] : ESTADO_PERSONAL[estado]
  return <span className={`badge ${ESTADO_CLASE[estado]}`}>{t}</span>
}

export function VolverA({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="mb-4 inline-flex min-h-[44px] items-center gap-1 font-semibold text-azul-700 hover:underline">
      ← {children}
    </Link>
  )
}

export function Vacio({ children }: { children: ReactNode }) {
  return <div className="card text-center text-suave">{children}</div>
}
