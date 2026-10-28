import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Phone } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { mensajeError, supabase, supabaseConfigurada } from '../lib/supabase'
import { LUGARES, TIPOS, isoLocal, lugarLabel, tipoLabel } from '../lib/catalogo'

const TOTAL = 6

export default function Reportar() {
  const { perfil } = useAuth()
  const [paso, setPaso] = useState(0)
  const [tipo, setTipo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [lugar, setLugar] = useState('')
  const [cuando, setCuando] = useState<'hoy' | 'ayer' | 'otra'>('hoy')
  const [fechaOtra, setFechaOtra] = useState('')
  const [involucrados, setInvolucrados] = useState('')
  const [urgente, setUrgente] = useState<boolean | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [codigo, setCodigo] = useState('')

  const hoy = isoLocal(new Date())
  const ayer = isoLocal(new Date(Date.now() - 864e5))
  const fecha = cuando === 'hoy' ? hoy : cuando === 'ayer' ? ayer : fechaOtra

  const valido = [
    tipo !== '',
    descripcion.trim().length >= 20,
    lugar !== '' && fecha !== '',
    true,
    urgente !== null,
    true,
  ][paso]

  async function enviar() {
    if (!perfil) return
    setError('')
    setEnviando(true)

    try {
      if (!supabaseConfigurada) {
        setError('Supabase no está configurado en esta instancia. Revisa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.')
        setEnviando(false)
        return
      }

      const { data, error } = await supabase
        .from('reportes')
        .insert({
          reportante_id: perfil.id,
          tipo,
          descripcion: descripcion.trim(),
          lugar,
          fecha_hecho: fecha,
          involucrados: involucrados.trim() || null,
          urgente: urgente === true,
        })
        .select('codigo')
        .single()

      setEnviando(false)
      if (error || !data) {
        setError(mensajeError(error ?? 'No se pudo guardar el reporte en la base de datos.'))
        return
      }

      setCodigo((data as { codigo: string }).codigo)
    } catch (err) {
      setEnviando(false)
      setError(mensajeError(err))
    }
  }

  if (codigo) {
    return (
      <div className="mx-auto max-w-md space-y-4">
        <div className="card text-center">
          <h1 className="text-2xl">Recibimos tu reporte</h1>
          <p className="mt-2 text-suave">Gracias por contarlo. Estás haciendo lo correcto.</p>
          <p className="mt-4 text-sm font-semibold text-suave">Tu código de seguimiento</p>
          <p className="font-titulo text-3xl font-extrabold tracking-wide text-azul-700">{codigo}</p>
        </div>
        {urgente && (
          <div className="rounded-2xl bg-ambar-100 p-4 text-[15px]">
            <p className="mb-1 flex items-center gap-2 font-bold text-ambar-800"><Phone size={18} aria-hidden="true" />Si estás en peligro ahora</p>
            Busca a un adulto del colegio o llama al <strong className="text-xl">123</strong>.
          </div>
        )}
        <div className="card text-[15px]">
          <h3 className="mb-2 text-base">Qué pasa ahora</h3>
          <ol className="list-decimal space-y-1 pl-5 text-suave">
            <li>El equipo de orientación revisa tu reporte.</li>
            <li>Te responden por aquí en máximo 48 horas hábiles{urgente ? ' (los urgentes se atienden de inmediato)' : ''}.</li>
            <li>Puedes ver el estado y escribirles desde “Reportes”.</li>
          </ol>
        </div>
        <Link to="/app/reportes" className="btn btn-azul">Ver mis reportes</Link>
        <Link to="/app" className="btn btn-sec">Volver al inicio</Link>
        <p className="text-center text-sm text-suave">
          BullyBlock no sustituye la intervención de docentes, orientadores o directivos.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg">
      <p className="text-sm font-semibold text-suave">Paso {paso + 1} de {TOTAL} · Tómate tu tiempo</p>
      <div className="mb-5 mt-1 h-2 overflow-hidden rounded-full bg-borde" role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={paso + 1}>
        <div className="h-full rounded-full bg-gradient-to-r from-verde-500 to-azul-500 transition-all" style={{ width: `${((paso + 1) / TOTAL) * 100}%` }} />
      </div>

      {paso === 0 && (
        <section>
          <h2 className="mb-3">¿Qué ocurrió?</h2>
          <div className="grid grid-cols-2 gap-3">
            {TIPOS.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => setTipo(id)} aria-pressed={tipo === id}
                className={`flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 text-center font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] ${
                  tipo === id ? 'border-verde-700 bg-verde-100 text-verde-700' : 'border-borde bg-[var(--superficie)] text-[var(--texto-principal)]'
                }`}>
                <Icon size={30} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </section>
      )}

      {paso === 1 && (
        <section>
          <h2 className="mb-1">Cuéntanos qué pasó</h2>
          <p className="mb-3 text-suave">Cuéntalo con calma, a tu ritmo. Aquí te escuchamos.</p>
          <label className="label" htmlFor="desc">Tu relato</label>
          <textarea id="desc" className="input min-h-[180px]" maxLength={2000} value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)} />
          <p className="hint">{descripcion.trim().length < 20 ? `Escribe al menos 20 caracteres (${descripcion.trim().length}/20).` : `${descripcion.length}/2000`}</p>
        </section>
      )}

      {paso === 2 && (
        <section className="space-y-5">
          <div>
            <h2 className="mb-3">¿Dónde pasó?</h2>
            <div className="flex flex-wrap gap-2">
              {LUGARES.map((l) => (
                <button key={l.id} type="button" onClick={() => setLugar(l.id)} aria-pressed={lugar === l.id}
                  className={`min-h-[48px] rounded-full border-2 px-4 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] ${
                    lugar === l.id ? 'border-verde-700 bg-verde-100 text-verde-700' : 'border-borde bg-[var(--superficie)]'
                  }`}>{l.label}</button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-3">¿Cuándo?</h2>
            <div className="flex flex-wrap gap-2">
              {([['hoy', 'Hoy'], ['ayer', 'Ayer'], ['otra', 'Otra fecha']] as const).map(([id, l]) => (
                <button key={id} type="button" onClick={() => setCuando(id)} aria-pressed={cuando === id}
                  className={`min-h-[48px] rounded-full border-2 px-4 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] ${
                    cuando === id ? 'border-verde-700 bg-verde-100 text-verde-700' : 'border-borde bg-[var(--superficie)]'
                  }`}>{l}</button>
              ))}
            </div>
            {cuando === 'otra' && (
              <div className="mt-3">
                <label className="label" htmlFor="fecha">Fecha</label>
                <input id="fecha" type="date" className="input" max={hoy} value={fechaOtra} onChange={(e) => setFechaOtra(e.target.value)} />
              </div>
            )}
          </div>
        </section>
      )}

      {paso === 3 && (
        <section>
          <h2 className="mb-1">¿Quiénes estuvieron?</h2>
          <p className="mb-3 text-suave">Es opcional. Puedes escribir nombres, cursos o cómo los reconoces.</p>
          <label className="label" htmlFor="inv">Personas involucradas</label>
          <textarea id="inv" className="input min-h-[120px]" maxLength={1000} value={involucrados}
            onChange={(e) => setInvolucrados(e.target.value)} />
        </section>
      )}

      {paso === 4 && (
        <section>
          <h2 className="mb-3">¿Estás en peligro ahora mismo?</h2>
          <div className="grid grid-cols-2 gap-3">
            {([[true, 'Sí, ahora'], [false, 'No por ahora']] as const).map(([v, l]) => (
              <button key={l} type="button" onClick={() => setUrgente(v)} aria-pressed={urgente === v}
                className={`min-h-[72px] rounded-2xl border-2 p-3 font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] ${
                  urgente === v ? (v ? 'border-ambar-500 bg-ambar-100 text-ambar-800' : 'border-verde-700 bg-verde-100 text-verde-700') : 'border-borde bg-[var(--superficie)]'
                }`}>{l}</button>
            ))}
          </div>
          {urgente === true && (
            <div className="mt-4 rounded-2xl bg-ambar-100 p-4 text-[15px]" role="alert">
              <p className="font-bold text-ambar-800">Busca ya a un adulto del colegio.</p>
              <p>Si no puedes, llama al <strong className="text-xl">123</strong>. Marcaremos tu reporte como urgente cuando lo envíes.</p>
            </div>
          )}
        </section>
      )}

      {paso === 5 && (
        <section>
          <h2 className="mb-3">Revisa y envía</h2>
          <div className="card space-y-2 text-[15px]">
            <p><strong>Tipo:</strong> {tipoLabel(tipo)}</p>
            <p><strong>Lugar:</strong> {lugarLabel(lugar)}</p>
            <p><strong>Cuándo:</strong> {fecha}</p>
            <p className="whitespace-pre-wrap"><strong>Relato:</strong> {descripcion}</p>
            {involucrados.trim() && <p className="whitespace-pre-wrap"><strong>Personas:</strong> {involucrados}</p>}
            {urgente && <p className="font-bold text-ambar-800">Marcado como urgente</p>}
          </div>
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-azul-100 p-3 text-[15px] text-azul-900">
            <Lock size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            Tu reporte es confidencial. Solo lo ve el equipo de orientación del colegio.
          </p>
          {error && <p className="aviso-error mt-3" role="alert">{error}</p>}
        </section>
      )}

      <div className="mt-6 space-y-3">
        {paso < TOTAL - 1 ? (
          <button className="btn btn-verde" disabled={!valido} onClick={() => setPaso(paso + 1)}>Continuar</button>
        ) : (
          <button className="btn btn-azul" disabled={enviando} onClick={() => void enviar()}>
            {enviando ? 'Enviando…' : 'Enviar reporte'}
          </button>
        )}
        {paso > 0 && <button className="btn btn-sec" onClick={() => setPaso(paso - 1)}>Atrás</button>}
      </div>
    </div>
  )
}
