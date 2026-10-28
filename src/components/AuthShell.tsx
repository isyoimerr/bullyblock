import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Escudo, { Marca } from './Escudo'

export default function AuthShell({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="auth-shell flex min-h-dvh w-full items-start justify-center p-4 pt-6 sm:p-6 md:items-center md:p-8">
      <div className="registro-shell w-full max-w-[440px]">
        <Link to="/" className="mb-5 flex items-center justify-center gap-2" aria-label="Ir al inicio">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--superficie)] shadow-[0_10px_24px_rgba(18,48,122,0.12)] ring-1 ring-[var(--borde)]">
            <Escudo size={40} />
          </div>
          <Marca className="text-2xl sm:text-3xl" />
        </Link>
        <div className="card">
          <h1 className="mb-4 text-2xl sm:text-[2rem]">{titulo}</h1>
          {children}
        </div>
        <p className="mt-5 text-center text-sm text-[var(--texto-suave)]">
          IET José Agustín Blanco Barros · <em>Aprender haciendo</em>
        </p>
      </div>
    </div>
  )
}
