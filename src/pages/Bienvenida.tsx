import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Escudo, { Marca } from '../components/Escudo'
import { Cargando } from '../components/ui'
import { useAuth } from '../lib/auth'
import { rutaPorRol } from '../lib/types'

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Privacidad', href: '#privacidad' },
  { label: 'Contacto', href: '#contacto' },
]

const pasos = [
  {
    title: '1. Abres la app',
    text: 'Entrás al espacio de ayuda con calma y sin presión.',
  },
  {
    title: '2. Escribes lo que sientes',
    text: 'Compartís tu situación de forma segura y respetuosa.',
  },
  {
    title: '3. Te acompañamos',
    text: 'Recibís escucha real, apoyo y seguimiento cuando lo necesitas.',
  },
]

const beneficios = [
  {
    title: 'Registro seguro',
    text: 'La app permite reportar con calma desde una cuenta escolar y un acceso controlado.',
  },
  {
    title: 'Confidencialidad',
    text: 'Los datos entran a la plataforma escolar, no se publican ni se usan para marketing.',
  },
  {
    title: 'Acompañamiento real',
    text: 'Orientación, docentes y directivos reciben la información necesaria para apoyar al estudiante.',
  },
  {
    title: 'Riesgo y seguimiento',
    text: 'Se puede hacer seguimiento del caso para actuar con rapidez y acompañamiento serio.',
  },
]

const privacidad = [
  'Los reportes quedan dentro de la plataforma escolar y solo los ve el equipo autorizado por la institución.',
  'No se comparten datos con terceros ni con el resto de la comunidad estudiantil.',
  'Se usan para atender la situación, apoyar al estudiante y mejorar la convivencia escolar.',
  'Puedes solicitar conocer, corregir o eliminar tu información conforme a la normativa vigente.',
]

const creadores = [
  {
    nombre: 'Andrés Felipe Castro Vergara',
    universidad: 'Institución Educativa Técnica José Agustín Blanco Barros',
    iniciales: 'AC',
  },
  {
    nombre: 'Alberto Mario Cuentas López',
    universidad: 'Institución Educativa Técnica José Agustín Blanco Barros',
    iniciales: 'AL',
  },
  {
    nombre: 'Nicole Andrea Soto Martinez',
    universidad: 'Institución Educativa Técnica José Agustín Blanco Barros',
    iniciales: 'NS',
  },
]

const logoColegio = '/landing/logo%20instittucion.jpeg'
const institucion = {
  iniciales: 'IEJABB',
  nombre: 'Institución Educativa José Agustín Blanco Barros',
}
const fotoGrupo = '/landing/foto%20del%20creadores.jpeg'
const fondoEstudiante = '/landing/inicio%20foto.jpeg'
const fotoHablar = '/landing/compartiendo.jpeg'
const fotoEscuchar = '/landing/escuchar.jpeg'
const fotoAcompañar = '/landing/jugando.jpeg'
const fotoApp = '/landing/mirando%20la%20app.jpeg'

export default function Bienvenida() {
  const { session, perfil, cargando } = useAuth()
  const [menuAbierto, setMenuAbierto] = useState(false)

  if (cargando) return <Cargando />
  if (session && perfil) return <Navigate to={rutaPorRol(perfil.rol)} replace />

  return (
    <>
      <div
        id="inicio"
        className="min-h-screen px-4 py-5 md:px-8 md:py-8"
        style={{
          background:
            'radial-gradient(circle at top, rgba(14, 27, 41, 0.06), transparent 22%), linear-gradient(180deg, var(--fondo) 0%, var(--superficie-alt) 100%)',
        }}
      >
      <div className="mx-auto max-w-7xl">
        <header className="sticky top-3 z-30 pb-3">
          <div className="rounded-[28px] border border-[var(--borde)] bg-[var(--superficie)]/90 px-3 py-3 shadow-[0_18px_48px_rgba(14,27,41,0.08)] backdrop-blur-xl md:px-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--borde)] bg-[var(--superficie)] shadow-[0_10px_24px_rgba(14,27,41,0.08)] sm:h-14 sm:w-14">
                  <Escudo size={32} />
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--borde)] bg-[var(--superficie-alt)] shadow-[0_10px_24px_rgba(14,27,41,0.18)] sm:h-14 sm:w-14">
                  <img src={logoColegio} alt="Logo de la institución" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col leading-none text-[var(--texto-principal)]">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black tracking-[-0.04em] sm:text-xl">BullyBlock</span>
                    <span className="rounded-full border border-[var(--borde)] bg-[var(--superficie-alt)] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--texto-principal)]">
                      {institucion.iniciales}
                    </span>
                  </div>
                  <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.18em] text-[var(--texto-secundario)] sm:text-[9px]">
                    {institucion.nombre}
                  </span>
                </div>
              </div>

              <nav className="hidden items-center gap-6 text-sm font-semibold text-[var(--texto-secundario)] md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative transition hover:text-[var(--brand-green)]"
                  >
                    <span className="after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[var(--brand-green)] after:transition-transform hover:after:scale-x-100">
                      {item.label}
                    </span>
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-2 md:gap-3">
                <button
                  type="button"
                  aria-expanded={menuAbierto}
                  aria-controls="menu-mobile"
                  onClick={() => setMenuAbierto((prev) => !prev)}
                  className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-[var(--borde)] bg-[var(--superficie-alt)] px-3 text-sm font-semibold text-[var(--texto-principal)] transition hover:border-[var(--brand-green)] md:hidden"
                >
                  {menuAbierto ? 'Cerrar' : 'Menú'}
                </button>
                <Link
                  to="/ingresar"
                  className="hidden min-h-[44px] items-center justify-center rounded-full bg-[#6366f1] px-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(99,102,241,0.35)] transition hover:-translate-y-0.5 hover:bg-[#4f46e5] md:inline-flex"
                >
                  Ingresar
                </Link>
              </div>
            </div>

            {menuAbierto && (
              <nav
                id="menu-mobile"
                className="mt-3 flex flex-col gap-2 rounded-[20px] border border-[var(--borde)] bg-[var(--superficie)] p-3 shadow-[0_12px_30px_rgba(14,27,41,0.09)] md:hidden"
              >
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuAbierto(false)}
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-[var(--texto-principal)] transition hover:bg-[var(--superficie-alt)]"
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  to="/ingresar"
                  onClick={() => setMenuAbierto(false)}
                  className="mt-1 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[var(--brand-green)] px-4 text-sm font-bold text-white"
                >
                  Ingresar
                </Link>
              </nav>
            )}
          </div>
        </header>

        <main className="mt-6">
          <section className="relative overflow-hidden rounded-[32px] border border-[var(--borde)] bg-[linear-gradient(180deg,var(--superficie)_0%,var(--superficie-alt)_100%)] px-5 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] md:px-8 md:py-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.06),_transparent_32%)]" />
            <div className="pointer-events-none absolute -left-8 bottom-8 h-28 w-28 rounded-full bg-[#6366f1]/10 blur-2xl" />
            <div className="pointer-events-none absolute right-14 top-10 h-20 w-20 rounded-full bg-[#60a5fa]/10 blur-2xl" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-xl text-left">
                <p className="inline-flex rounded-full border border-[var(--borde)] bg-[var(--superficie-alt)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--texto-principal)]">
                  Momento 0 · apoyo real
                </p>

                <h1 className="mt-4 text-[3.1rem] font-black leading-[0.9] tracking-[-0.06em] text-[var(--texto-principal)] md:text-[5.1rem]">
                  Hay un lugar
                  <span className="block">para decirlo</span>
                  <span className="block">sin miedo</span>
                  <span className="block">ni ruido</span>
                  <span className="mt-2 block text-[var(--brand-green)]">Porque importas</span>
                </h1>

                <p className="mt-4 max-w-lg text-base text-[var(--texto-secundario)] md:text-lg">
                  Habla con calma. Te escuchamos con respeto y apoyo real.
                </p>

                <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
                  <Link
                    to="/registro"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[var(--brand-green)] px-6 text-sm font-bold text-white shadow-[0_16px_30px_rgba(27,180,76,0.18)] transition hover:-translate-y-0.5 hover:bg-[var(--theme-button-hover)] sm:text-base"
                  >
                    Quiero hablar
                  </Link>
                  <a
                    href="#como-funciona"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-[var(--borde)] bg-[var(--superficie-alt)] px-6 text-sm font-bold text-[var(--texto-principal)] transition hover:-translate-y-0.5 hover:border-[var(--brand-green)] sm:text-base"
                  >
                    Cómo te acompañamos
                  </a>
                </div>
              </div>

              <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
                <div className="absolute right-0 top-8 h-10 w-10 rounded-full bg-[#6366f1]/20 shadow-[0_0_18px_rgba(99,102,241,0.18)]" />
                <div className="relative w-full overflow-hidden rounded-[30px] border border-[var(--borde)] bg-[linear-gradient(135deg,#1d4ed8_0%,#312e81_50%,#111827_100%)] p-4 shadow-[0_24px_70px_rgba(49,46,129,0.18)]">
                  <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0c2c48] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
                      </div>
                      <div className="h-7 w-7 rounded-full bg-[#8b5cf6]" />
                    </div>

                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.8),rgba(240,234,214,1)_30%,rgba(238,227,205,1)_52%,rgba(252,250,245,1)_100%)] shadow-inner sm:max-w-[440px] md:max-w-[470px] lg:max-w-[440px]">
                      <img
                        src={fondoEstudiante}
                        alt="Estudiante recibiendo apoyo"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="mt-4 rounded-[18px] border border-white/10 bg-[#0b1d30]/80 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-200">Porque importas</p>
                      <p className="mt-1 text-sm font-semibold text-white">Te escuchamos desde el primer momento</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="casos" className="mt-8 px-1 md:px-2">
            <div className="mx-auto max-w-6xl">
              <div className="mb-4 text-center">
                <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[var(--texto-secundario)] md:text-sm">Apoyo</p>
                <h2 className="ragikon-word mt-2 text-[1.5rem] text-[var(--texto-principal)] sm:text-[2rem] md:text-[2.4rem]">
                  Hablar. Escuchar. Acompañar.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { title: 'Hablar', image: fotoHablar },
                  { title: 'Escuchar', image: fotoEscuchar },
                  { title: 'Acompañar', image: fotoAcompañar },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="overflow-hidden rounded-[22px] border border-[var(--borde)] bg-[var(--superficie)] shadow-[0_12px_24px_rgba(14,27,41,0.06)]"
                  >
                    <div className="h-40 overflow-hidden border-b border-[var(--borde)] bg-[var(--superficie-alt)] md:h-48">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="px-3 py-3">
                      <h3 className="text-base font-bold text-[var(--texto-principal)]">{item.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="como-funciona" className="mt-7 px-1 md:px-2">
            <div className="mx-auto max-w-6xl">
              <div className="mb-4 text-center">
                <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[var(--texto-secundario)] md:text-sm">Cómo usar la app</p>
              </div>

              <div className="mb-5 flex justify-center overflow-hidden rounded-[28px] border border-[var(--borde)] bg-[var(--superficie)] p-2 shadow-[0_18px_32px_rgba(14,27,41,0.05)] md:p-3">
                <img
                  src="/docs/screenshots/mobile-demo.gif"
                  alt="Demo móvil de BullyBlock"
                  className="mx-auto w-full max-w-[420px] rounded-[22px] object-contain object-center shadow-[0_12px_28px_rgba(14,27,41,0.08)] sm:max-w-[440px] md:max-w-[460px]"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {pasos.map((paso) => (
                  <article
                    key={paso.title}
                    className="rounded-[20px] border border-[var(--borde)] bg-[var(--superficie)] p-3 shadow-[0_10px_20px_rgba(14,27,41,0.04)]"
                  >
                    <h3 className="text-sm font-bold text-[var(--texto-principal)]">{paso.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-[var(--texto-secundario)]">{paso.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="beneficios" className="mt-7 px-1 md:px-2">
            <div className="mx-auto max-w-6xl">
              <div className="mb-4 text-center">
                <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[var(--texto-secundario)] md:text-sm">Beneficios</p>
                <h2 className="ragikon-word mt-2 text-[1.5rem] text-[var(--texto-principal)] sm:text-[2rem] md:text-[2.4rem]">
                  Una respuesta clara, segura y humana.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {beneficios.map((beneficio, index) => (
                  <article
                    key={beneficio.title}
                    className="rounded-[22px] border border-[var(--borde)] bg-[var(--superficie)] p-4 shadow-[0_12px_24px_rgba(14,27,41,0.05)]"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--superficie-alt)] text-sm font-black text-[var(--texto-principal)]">
                      {index + 1}
                    </div>
                    <h3 className="text-base font-bold text-[var(--texto-principal)]">{beneficio.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--texto-secundario)]">{beneficio.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="privacidad" className="mt-7 px-1 md:px-2">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-[26px] border border-[var(--borde)] bg-[var(--superficie)] p-4 shadow-[0_18px_32px_rgba(14,27,41,0.05)] md:p-5">
              <div className="mb-3 text-center">
                <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[var(--texto-secundario)] md:text-sm">Privacidad</p>
              </div>

              <div className="rounded-[20px] border border-[var(--borde)] bg-[var(--superficie-alt)] p-4">
                <p className="text-sm leading-7 text-[var(--texto-secundario)]">
                  BullyBlock usa la información solo para apoyar a estudiantes, docentes y orientación escolar.
                  Los reportes quedan dentro de la plataforma institucional y solo los ve el equipo autorizado.
                  No se usan para publicidad ni se comparten con terceros.
                </p>
              </div>
            </div>
          </section>
        </main>

        <section className="mt-7 px-1 md:px-2">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[26px] border border-[var(--borde)] bg-[var(--superficie)] p-3 shadow-[0_18px_32px_rgba(14,27,41,0.05)]">
            <div className="mb-3 text-center">
              <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[var(--texto-secundario)] md:text-sm">Creadores</p>
            </div>

            <img
              src={fotoGrupo}
              alt="Equipo de trabajo del proyecto"
              className="h-[260px] w-full rounded-[18px] object-cover object-[center_20%] sm:h-[320px] lg:h-[420px]"
            />

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {creadores.map((creador) => (
                <div
                  key={creador.nombre}
                  className="rounded-[18px] border border-[var(--borde)] bg-[var(--superficie-alt)] px-3 py-3 text-left"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--superficie)] text-[10px] font-black text-[var(--texto-principal)] ring-1 ring-[var(--borde)]">
                    {creador.iniciales}
                  </div>
                  <p className="mt-2 text-sm font-bold leading-5 text-[var(--texto-principal)]">{creador.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer id="contacto" className="mt-8 rounded-[30px] border border-[var(--borde)] bg-[var(--superficie-alt)] px-4 py-7 text-[var(--texto-secundario)] shadow-[0_18px_40px_rgba(14,27,41,0.04)] md:px-8 md:py-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr]">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--superficie)] shadow-[0_10px_20px_rgba(14,27,41,0.09)] ring-1 ring-[var(--borde)]">
                    <Escudo size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[var(--texto-principal)]">BullyBlock</p>
                    <p className="text-sm text-[var(--texto-secundario)]">Detenemos el bullying. Juntos.</p>
                  </div>
                </div>
                <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--texto-secundario)]">
                  BullyBlock ayuda a estudiantes y docentes a responder con cuidado, respeto y apoyo real.
                </p>
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--texto-secundario)]">Plataforma</h3>
                <ul className="mt-3 space-y-2 text-sm text-[var(--texto-secundario)]">
                  <li><a href="#inicio" className="transition hover:text-[var(--brand-green)]">Inicio</a></li>
                  <li><a href="#como-funciona" className="transition hover:text-[var(--brand-green)]">Cómo funciona</a></li>
                  <li><a href="#beneficios" className="transition hover:text-[var(--brand-green)]">Beneficios</a></li>
                  <li><a href="#privacidad" className="transition hover:text-[var(--brand-green)]">Privacidad</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--texto-secundario)]">Tratamiento</h3>
                <ul className="mt-3 space-y-2 text-sm text-[var(--texto-secundario)]">
                  <li><Link to="/ingresar" className="transition hover:text-[var(--brand-green)]">Ingresar</Link></li>
                  <li><Link to="/registro" className="transition hover:text-[var(--brand-green)]">Crear cuenta</Link></li>
                  <li><a href="#contacto" className="transition hover:text-[var(--brand-green)]">Contacto</a></li>
                  <li><a href="#privacidad" className="transition hover:text-[var(--brand-green)]">Política</a></li>
                </ul>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--texto-secundario)]">Síguenos</h3>
                <div className="mt-3 flex items-center gap-2.5">
                  {['IG', 'X', 'in', 'YT'].map((item) => (
                    <a
                      key={item}
                      href="#contacto"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--borde)] bg-[var(--superficie)] text-[10px] font-bold text-[var(--texto-principal)] transition hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
                      aria-label={`Síguenos en ${item}`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-[var(--borde)] pt-4 text-sm text-[var(--texto-secundario)] md:flex-row">
              <p>© 2026 BullyBlock. Todos los derechos reservados.</p>
              <p className="text-center md:text-right">Acompañamiento escolar · Seguridad · Confianza</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}
