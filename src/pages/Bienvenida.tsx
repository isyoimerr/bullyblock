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
    title: '1. Hablas',
    text: 'Sin presión. Sin juicio. Sin fingir que estás bien.',
  },
  {
    title: '2. Escuchamos',
    text: 'Te escuchamos desde el primer mensaje, con calma.',
  },
  {
    title: '3. Acompañamos',
    text: 'Te acompañamos sin dejarte solo en lo que sientes.',
  },
]

const beneficios = [
  { title: 'Escucha', text: 'Te entienden desde el primer momento.' },
  { title: 'Seguridad', text: 'Hablas con calma y sin presión.' },
  { title: 'Apoyo', text: 'Te acompañamos cuando más lo necesitas.' },
  { title: 'Porque importas', text: 'Tu bienestar merece cuidado real.' },
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

const fotoGrupo = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80'

const fondoEstudiante =
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80'

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
        <header className="relative z-20">
          <div className="rounded-[28px] border border-[var(--borde)] bg-[var(--superficie)]/90 px-3 py-3 shadow-[0_18px_48px_rgba(14,27,41,0.08)] backdrop-blur-xl md:px-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--borde)] bg-[var(--brand-navy)] shadow-[0_10px_24px_rgba(14,27,41,0.2)]">
                  <Escudo size={28} />
                </div>
                <div>
                  <Marca className="text-lg text-[var(--texto-principal)] sm:text-xl" />
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
          <section className="relative overflow-hidden rounded-[38px] border px-5 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] ring-1 md:px-10 md:py-10" style={{ borderColor: 'var(--borde)', background: 'var(--superficie)' }}>
            <div className="pointer-events-none absolute -left-12 bottom-8 h-28 w-28 rounded-full bg-[#6366f1]/15 blur-2xl" />
            <div className="pointer-events-none absolute -right-12 top-14 h-36 w-36 rounded-full bg-[#6366f1]/15 blur-3xl" />
            <div className="pointer-events-none absolute right-16 top-1/3 h-12 w-12 rounded-full bg-[#6366f1]/40" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.04fr_0.96fr]">
              <div className="max-w-xl text-center lg:text-left">
                <p className="inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] md:text-[11px] texto-principal" style={{ borderColor: 'var(--borde)', background: 'var(--superficie-alt)' }}>
                  Momento 0 · apoyo real
                </p>

                <h1 className="hero-title mt-4 texto-principal">
                  Hay un lugar para decirlo
                  <span className="block texto-principal">sin miedo ni ruido</span>
                  <span className="block" style={{ color: 'var(--brand-green)' }}>Porque importas</span>
                </h1>

                <p className="mt-4 max-w-lg texto-secundario sm:text-base md:text-lg">
                  Habla con calma. Te escuchamos con respeto y apoyo real.
                </p>

                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
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

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  {['Sin miedo', 'Con calma', 'Te escuchamos con respeto'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border px-3 py-1.5 text-[11px] font-semibold texto-principal"
                      style={{ borderColor: 'var(--borde)', background: 'var(--superficie-alt)' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto flex w-full max-w-[540px] items-center justify-center">
                <div className="absolute left-0 top-10 h-20 w-20 rounded-full bg-[#6366f1]/20" />
                <div className="absolute bottom-6 right-2 h-16 w-16 rounded-full bg-[#60a5fa]/25" />
                <div className="absolute right-10 top-8 h-12 w-12 rounded-full bg-[#c7d2fe]/30" />

                <div className="relative w-full max-w-[500px] rounded-[38px] bg-[linear-gradient(135deg,#1d4ed8_0%,#312e81_50%,#111827_100%)] p-4 shadow-[0_24px_70px_rgba(49,46,129,0.5)]">
                  <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-[#0f172a]/50 p-4 backdrop-blur-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--texto-secundario)]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--texto-secundario)]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--texto-secundario)]/80" />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-[#6366f1]" />
                    </div>

                    <div className="relative mx-auto h-[360px] w-full overflow-hidden rounded-[30%_70%_55%_45%/42%_48%_52%_58%] bg-gradient-to-br from-[#cfe0ff] via-[#eff6ff] to-[#dbeafe] shadow-inner">
                      <img
                        src={fondoEstudiante}
                        alt="Estudiante recibiendo apoyo"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-[#0f172a]/70 p-3 backdrop-blur-sm">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a5b4fc]">Porque importas</p>
                        <p className="mt-1 text-sm font-semibold text-[var(--texto-inverso)]">Te escuchamos desde el primer momento</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171d2d] text-[#facc15] font-black">
                        ♥
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="casos" className="mt-8 px-1 md:px-2">
            <div className="mx-auto max-w-6xl">
              <div className="mb-5 text-center">
                <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[var(--texto-secundario)] md:text-sm">Apoyo</p>
                <h2 className="ragikon-word mt-3 text-[1.7rem] text-[var(--texto-principal)] sm:text-[2.2rem] md:text-[3rem]">
                  Hablar. Escuchar. Acompañar.
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: 'Hablar',
                    text: 'A veces lo más difícil es decirlo en voz alta, y eso ya cuenta como un paso.',
                    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
                  },
                  {
                    title: 'Escuchar',
                    text: 'Una escucha real puede cambiarte el día, la semana o incluso más.',
                    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
                  },
                  {
                    title: 'Acompañar',
                    text: 'No te toca cargarlo todo solo; aquí hay apoyo cuando más lo necesitas.',
                    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="overflow-hidden rounded-[26px] border border-[var(--borde)] bg-[var(--superficie)] shadow-[0_18px_36px_rgba(14,27,41,0.06)] backdrop-blur-sm"
                  >
                    <div className="h-48 overflow-hidden border-b border-[var(--borde)] bg-[var(--superficie-alt)]">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-lg font-bold text-[var(--texto-principal)]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--texto-secundario)]">{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="como-funciona" className="mt-8 px-1 md:px-2">
            <div className="mx-auto max-w-5xl text-center">
              <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[var(--texto-secundario)] md:text-sm">Cómo funciona</p>
              <h2 className="ragikon-word mt-3 text-[1.8rem] text-[var(--texto-principal)] sm:text-[2.2rem] md:text-[3rem]">
                Así empieza a sentirse mejor
              </h2>
            </div>

            <div className="mx-auto mt-6 grid max-w-6xl gap-4 md:grid-cols-3">
              {pasos.map((paso, index) => (
                <article
                  key={paso.title}
                  className="rounded-[24px] border border-[var(--borde)] bg-[var(--superficie)] p-4 shadow-[0_14px_28px_rgba(14,27,41,0.04)] md:p-5"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--superficie-alt)] text-base font-black text-[var(--texto-principal)]">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-bold text-[var(--texto-principal)] md:text-lg">{paso.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--texto-secundario)]">{paso.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="beneficios" className="mt-10 rounded-[28px] border border-[var(--borde)] bg-[var(--superficie)]/80 px-4 py-8 backdrop-blur-sm md:px-8 md:py-10">
            <div className="mx-auto max-w-6xl text-center">
              <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[var(--texto-secundario)] md:text-sm">Lo que aquí sientes</p>
              <h2 className="ragikon-word mt-3 text-[1.7rem] text-[var(--texto-principal)] sm:text-[2.1rem] md:text-[2.8rem]">
                Seguridad, calma y apoyo real
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {beneficios.map((beneficio) => (
                <article
                  key={beneficio.title}
                  className="rounded-[22px] bg-[var(--superficie)] p-4 shadow-[0_12px_24px_rgba(14,27,41,0.04)] ring-1 ring-[var(--borde)] transition hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(14,27,41,0.08)]"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--superficie-alt)] text-base font-black text-[var(--texto-principal)]">
                    ✓
                  </div>
                  <h3 className="text-base font-bold text-[var(--texto-principal)]">{beneficio.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--texto-secundario)]">{beneficio.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="privacidad" className="mt-10 bg-transparent px-1 pb-8 md:px-2">
            <div className="mx-auto grid max-w-6xl gap-5 rounded-[28px] border border-[var(--borde)] bg-[var(--superficie)] p-5 shadow-[0_18px_32px_rgba(14,27,41,0.05)] md:grid-cols-[1fr_1.08fr] md:p-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--texto-secundario)]">Confianza</p>
                <h2 className="ragikon-word mt-3 text-[1.6rem] text-[var(--texto-principal)] sm:text-[2rem] md:text-[2.7rem]">
                  Tu historia vive en un lugar seguro
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--texto-secundario)] md:text-base">
                  Aquí se cuida tu información, se respeta tu voz y se protege tu bienestar desde el primer momento.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Confianza', 'Tu información se cuida con respeto y discreción.'],
                  ['Acompañamiento', 'No te dejan solo en lo que sientes ni en lo que necesitas.'],
                  ['Respeto', 'Se escucha sin juzgar y sin poner barreras.'],
                  ['Seguridad', 'Hay un camino claro para pedir ayuda y seguir adelante.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-[20px] bg-[var(--superficie-alt)] p-4 shadow-sm ring-1 ring-[var(--borde)]">
                    <h3 className="text-base font-bold text-[var(--texto-principal)]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--texto-secundario)]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <section className="mt-10 px-1 md:px-2">
          <div className="mx-auto max-w-6xl rounded-[30px] border border-[var(--borde)] bg-[var(--superficie)] px-4 py-6 shadow-[0_24px_60px_rgba(14,27,41,0.05)] backdrop-blur-md md:px-7 md:py-8">
            <div className="mb-5 text-center md:text-left">
              <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[var(--texto-secundario)] md:text-sm">Esto es para todos</p>
              <h2 className="ragikon-word mt-3 text-[1.5rem] text-[var(--texto-principal)] sm:text-[1.8rem] md:text-[2.4rem]">
                Acompañamiento humano, claro y cercano
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['Escucha', 'Porque cada persona merece que la entiendan sin juzgarla.'],
                ['Seguridad', 'Porque hablar sin miedo debería ser siempre posible.'],
                ['Acompañamiento', 'Porque nadie debe atravesar un problema solo.'],
              ].map(([titulo, texto]) => (
                <div key={titulo} className="rounded-[22px] border border-[var(--borde)] bg-[var(--superficie-alt)] p-4 text-left shadow-[0_12px_24px_rgba(14,27,41,0.04)]">
                  <h3 className="text-base font-bold text-[var(--texto-principal)]">{titulo}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--texto-secundario)]">{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 px-1 md:px-2">
          <div className="mx-auto max-w-6xl rounded-[30px] border border-[var(--borde)] bg-[var(--superficie)] px-4 py-7 shadow-[0_24px_60px_rgba(14,27,41,0.05)] backdrop-blur-md md:px-8 md:py-10">
            <div className="mb-6 text-center md:text-left">
              <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[var(--texto-secundario)] md:text-sm">Creadores</p>
              <h2 className="ragikon-word mt-3 text-[1.7rem] text-[var(--texto-principal)] sm:text-[2.1rem] md:text-[2.8rem]">
                Jóvenes soñadores de un mundo mejor
              </h2>
            </div>

            <div className="mb-5 overflow-hidden rounded-[28px] border border-[var(--borde)] bg-[var(--superficie-alt)] shadow-[0_16px_28px_rgba(14,27,41,0.04)]">
              <img src={fotoGrupo} alt="Equipo de trabajo del proyecto" className="h-56 w-full object-cover md:h-72" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {creadores.map((creador) => (
                <article
                  key={creador.nombre}
                  className="group flex h-full flex-col items-center gap-4 rounded-[28px] border border-[var(--borde)] bg-[var(--superficie-alt)] p-4 text-center shadow-[0_16px_28px_rgba(14,27,41,0.04)] transition duration-300 hover:bg-[var(--superficie)] md:items-start md:text-left"
                >
                  <div className="flex w-full items-center justify-center md:justify-start">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[24px] border border-[var(--borde)] bg-[linear-gradient(135deg,var(--superficie-alt),var(--superficie))] text-lg font-black text-[var(--texto-principal)] shadow-[0_12px_24px_rgba(14,27,41,0.08)] md:h-24 md:w-24">
                      {creador.iniciales}
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-xl font-extrabold tracking-[-0.04em] text-[var(--texto-principal)]">{creador.nombre}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--texto-secundario)]">{creador.universidad}</p>
                  </div>
                </article>
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
