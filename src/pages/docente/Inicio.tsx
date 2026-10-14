import { BellRing, FileWarning, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../lib/auth'

export default function DocenteInicio() {
  const { perfil } = useAuth()

  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-[linear-gradient(135deg,#dbeafe,#eef6ff)] p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">Área docente</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Hola, {perfil?.nombre ?? 'docente'}</h1>
        <p className="mt-2 text-slate-700">Aquí puedes ver los avisos dirigidos a ti, responder con calma y pasar casos a orientación cuando lo necesites.</p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="card p-4">
          <BellRing className="mb-3 h-8 w-8 text-blue-700" aria-hidden="true" />
          <h2 className="text-lg font-bold text-slate-900">Avisos para ti</h2>
          <p className="mt-2 text-sm text-slate-600">Revisa los estudiantes que te escogieron para hablar.</p>
        </article>
        <article className="card p-4">
          <FileWarning className="mb-3 h-8 w-8 text-amber-600" aria-hidden="true" />
          <h2 className="text-lg font-bold text-slate-900">Reportar un caso</h2>
          <p className="mt-2 text-sm text-slate-600">Si observas algo, puedes activarlo con el flujo guiado.</p>
        </article>
        <article className="card p-4">
          <ShieldCheck className="mb-3 h-8 w-8 text-emerald-700" aria-hidden="true" />
          <h2 className="text-lg font-bold text-slate-900">Guía rápida</h2>
          <p className="mt-2 text-sm text-slate-600">Escucha, agradece y deriva a orientación cuando haga falta.</p>
        </article>
      </div>
    </div>
  )
}
