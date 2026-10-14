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
    text: 'Sin presión, sin juicio y sin tener que fingir que estás bien.',
  },
  {
    title: '2. Escuchamos',
    text: 'Desde el primer mensaje, con calma, respeto y atención real.',
  },
  {
    title: '3. Acompañamos',
    text: 'Te ayudamos a seguir adelante sin dejarte solo en lo que sientes.',
  },
]

const beneficios = [
  { title: 'Escucha', text: 'Alguien te entiende desde el primer momento.' },
  { title: 'Seguridad', text: 'Un espacio para hablar con calma y confianza.' },
  { title: 'Apoyo', text: 'Te acompañamos paso a paso cuando más lo necesitas.' },
  { title: 'Porque importas', text: 'Tu bienestar merece atención y cuidado.' },
]

const creadores = [
  {
    nombre: 'Estudiante Creador 1',
    rol: 'Desarrollador',
    universidad: 'Institución Educativa Técnica José Agustín Blanco Barros',
    iniciales: 'EC1',
  },
  {
    nombre: 'Estudiante Creador 2',
    rol: 'Diseñador',
    universidad: 'Institución Educativa Técnica José Agustín Blanco Barros',
    iniciales: 'EC2',
  },
  {
    nombre: 'Estudiante Creador 3',
    rol: 'Investigador',
    universidad: 'Institución Educativa Técnica José Agustín Blanco Barros',
    iniciales: 'EC3',
  },
]

const fondoEstudiante =
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80'

export default function Bienvenida() {
  const { session, perfil, cargando } = useAuth()
  const [menuAbierto, setMenuAbierto] = useState(false)

  if (cargando) return <Cargando />
  if (session && perfil) return <Navigate to={rutaPorRol(perfil.rol)} replace />

  return (
    <div
      id="inicio"
      className="min-h-screen px-4 py-5 text-slate-800 md:px-8 md:py-8"
      style={{
        background: 'radial-gradient(circle at top left, rgba(76,175,42,0.18) 0%, rgba(218,241,214,0.56) 18%, rgba(242,249,240,0.92) 42%, rgba(249,251,249,1) 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl">
        <header className="relative z-20">
          <div className="rounded-[28px] border border-white/70 bg-white/80 px-3 py-3 shadow-[0_20px_40px_rgba(31,41,55,0.08)] backdrop-blur-xl md:px-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_rgba(18,48,122,0.12)] ring-1 ring-[var(--borde)]">
                  <Escudo size={28} />
                </div>
                <div>
                  <Marca className="text-lg sm:text-xl" />
                </div>
              </div>

              <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative transition hover:text-[#1d4ed8]"
                  >
                    <span className="after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#1d4ed8] after:transition-transform hover:after:scale-x-100">
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
                  className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 transition hover:border-[#bfdbfe] hover:bg-[#eff6ff] md:hidden"
                >
                  {menuAbierto ? 'Cerrar' : 'Menú'}
                </button>
                <Link
                  to="/ingresar"
                  className="hidden min-h-[44px] items-center justify-center rounded-full bg-[#1d4ed8] px-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(29,78,216,0.2)] transition hover:-translate-y-0.5 hover:bg-[#1747c5] md:inline-flex"
                >
                  Ingresar
                </Link>
              </div>
            </div>

            {menuAbierto && (
              <nav id="menu-mobile" className="mt-3 flex flex-col gap-2 rounded-[20px] border border-slate-200 bg-white/90 p-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)] md:hidden">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuAbierto(false)}
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#eef5ff] hover:text-[#1d4ed8]"
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  to="/ingresar"
                  onClick={() => setMenuAbierto(false)}
                  className="mt-1 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#1d4ed8] px-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(29,78,216,0.2)]"
                >
                  Ingresar
                </Link>
              </nav>
            )}
          </div>
        </header>

        <main className="mt-6">
          <section className="relative overflow-hidden rounded-[38px] border border-[#dfe9ff] bg-white/75 px-5 py-8 shadow-[0_30px_80px_rgba(59,130,246,0.08)] ring-1 ring-white/60 md:px-10 md:py-10">
            <div className="pointer-events-none absolute -left-12 bottom-8 h-28 w-28 rounded-full bg-[#dbeafe] blur-2xl" />
            <div className="pointer-events-none absolute -right-12 top-14 h-36 w-36 rounded-full bg-[#dbeafe] blur-3xl" />
            <div className="pointer-events-none absolute right-16 top-1/3 h-12 w-12 rounded-full bg-[#bfdbfe]" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.04fr_0.96fr]">
              <div className="max-w-xl text-center lg:text-left">
                <p className="inline-flex rounded-full bg-[var(--verde-100)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--verde-700)] md:text-[11px]">
                  Momento 0 · apoyo real
                </p>

                <h1 className="mt-4 text-[2.1rem] font-extrabold leading-[0.96] tracking-[-0.07em] text-slate-900 sm:text-[2.8rem] md:text-[4rem]">
                  Hay un lugar para decirlo
                  <span className="block">sin miedo ni sentirse solo</span>
                  <span className="ragikon-word block text-[var(--verde-700)] text-[2.4rem] sm:text-[3.3rem] md:text-[4.5rem]">
                    Porque importas
                  </span>
                </h1>

                <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600 sm:text-base md:text-lg">
                  Aquí puedes hablar con calma, ser escuchado con respeto y recibir apoyo real desde el primer momento.
                </p>

                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <Link
                    to="/registro"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[var(--verde-700)] px-6 text-sm font-bold text-white shadow-[0_16px_30px_rgba(35,128,58,0.26)] transition hover:-translate-y-0.5 hover:bg-[#1d6f30] sm:text-base"
                  >
                    Quiero hablar
                  </Link>
                  <a
                    href="#como-funciona"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-6 text-sm font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:bg-[#f8fbff] sm:text-base"
                  >
                    Cómo te acompañamos
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  {['Sin miedo', 'Con calma', 'Te escuchamos con respeto'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#dbeafe] bg-[#f8fbff] px-3 py-1.5 text-[11px] font-semibold text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto flex w-full max-w-[540px] items-center justify-center">
                <div className="absolute left-0 top-10 h-20 w-20 rounded-full bg-[#dbeafe]" />
                <div className="absolute bottom-6 right-2 h-16 w-16 rounded-full bg-[#93c5fd]" />
                <div className="absolute right-10 top-8 h-12 w-12 rounded-full bg-[#bfdbfe]" />

                <div className="relative w-full max-w-[500px] rounded-[38px] bg-[linear-gradient(135deg,#dbeafe_0%,#c7d2fe_35%,#b4c5ff_100%)] p-4 shadow-[0_24px_70px_rgba(59,130,246,0.22)]">
                  <div className="relative overflow-hidden rounded-[32px] border border-white/50 bg-white/40 p-4 backdrop-blur-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-[#1d4ed8]" />
                    </div>

                    <div className="relative mx-auto h-[360px] w-full overflow-hidden rounded-[30%_70%_55%_45%/42%_48%_52%_58%] bg-gradient-to-br from-[#cfe0ff] via-[#eff6ff] to-[#dbeafe] shadow-inner">
                      <img
                        src={fondoEstudiante}
                        alt="Estudiante recibiendo apoyo"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 rounded-[22px] border border-white/60 bg-white/70 p-3 backdrop-blur-sm">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1d4ed8]">Porque importas</p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">Te escuchamos desde el primer momento</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeafe] text-[#1d4ed8] font-black">
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
                <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[#1d4ed8] md:text-sm">Apoyo</p>
                <h2 className="ragikon-word mt-3 text-[1.7rem] text-slate-900 sm:text-[2.2rem] md:text-[3rem]">
                  Hablar, escuchar y acompañar con empatía
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
                    className="overflow-hidden rounded-[26px] border border-white/70 bg-white/70 shadow-[0_18px_36px_rgba(15,23,42,0.06)] backdrop-blur-sm"
                  >
                    <div className="h-48 overflow-hidden border-b border-slate-200 bg-slate-100">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="como-funciona" className="mt-8 px-1 md:px-2">
            <div className="mx-auto max-w-5xl text-center">
              <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[#1d4ed8] md:text-sm">Cómo funciona</p>
              <h2 className="ragikon-word mt-3 text-[1.8rem] text-slate-900 sm:text-[2.2rem] md:text-[3rem]">
                Así empieza a sentirse mejor
              </h2>
            </div>

            <div className="mx-auto mt-6 grid max-w-6xl gap-4 md:grid-cols-3">
              {pasos.map((paso, index) => (
                <article
                  key={paso.title}
                  className="rounded-[24px] border border-slate-200 bg-white/80 p-4 shadow-[0_14px_28px_rgba(15,23,42,0.04)] md:p-5"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e0edff] text-base font-black text-[#1d4ed8]">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 md:text-lg">{paso.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{paso.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="beneficios" className="mt-10 rounded-[28px] border border-[#dbeafe] bg-white/60 px-4 py-8 backdrop-blur-sm md:px-8 md:py-10">
            <div className="mx-auto max-w-6xl text-center">
              <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[#1d4ed8] md:text-sm">Lo que aquí sientes</p>
              <h2 className="ragikon-word mt-3 text-[1.7rem] text-slate-900 sm:text-[2.1rem] md:text-[2.8rem]">
                Seguridad, calma y apoyo real
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {beneficios.map((beneficio) => (
                <article
                  key={beneficio.title}
                  className="rounded-[22px] bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.04)] ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(29,78,216,0.08)]"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dbeafe] text-base font-black text-[#1d4ed8]">
                    ✓
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{beneficio.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{beneficio.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="privacidad" className="mt-10 bg-transparent px-1 pb-8 md:px-2">
            <div className="mx-auto grid max-w-6xl gap-5 rounded-[28px] border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(237,244,255,0.82))] p-5 shadow-[0_18px_32px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_1.08fr] md:p-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1d4ed8]">Confianza</p>
                <h2 className="ragikon-word mt-3 text-[1.6rem] text-slate-900 sm:text-[2rem] md:text-[2.7rem]">
                  Tu historia vive en un lugar seguro
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
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
                  <div key={title} className="rounded-[20px] bg-white/80 p-4 shadow-sm ring-1 ring-slate-200">
                    <h3 className="text-base font-bold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <section className="mt-10 px-1 md:px-2">
          <div className="mx-auto max-w-6xl rounded-[30px] border border-white/60 bg-[linear-gradient(135deg,rgba(240,249,241,0.72),rgba(219,234,254,0.48),rgba(255,255,255,0.56))] px-4 py-6 shadow-[0_24px_60px_rgba(32,94,58,0.08)] backdrop-blur-md md:px-7 md:py-8">
            <div className="mb-5 text-center md:text-left">
              <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[#1d4ed8] md:text-sm">Esto es para todos</p>
              <h2 className="ragikon-word mt-3 text-[1.5rem] text-slate-900 sm:text-[1.8rem] md:text-[2.4rem]">
                Acompañamiento humano, claro y cercano
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['Escucha', 'Porque cada persona merece que la entiendan sin juzgarla.'],
                ['Seguridad', 'Porque hablar sin miedo debería ser siempre posible.'],
                ['Acompañamiento', 'Porque nadie debe atravesar un problema solo.'],
              ].map(([titulo, texto]) => (
                <div key={titulo} className="rounded-[22px] border border-white/60 bg-white/20 p-4 text-left shadow-[0_12px_24px_rgba(15,23,42,0.04)]">
                  <h3 className="text-base font-bold text-slate-900">{titulo}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 px-1 md:px-2">
          <div className="mx-auto max-w-6xl rounded-[30px] border border-white/60 bg-[linear-gradient(135deg,rgba(240,249,241,0.72),rgba(219,234,254,0.48),rgba(255,255,255,0.56))] px-4 py-7 shadow-[0_24px_60px_rgba(32,94,58,0.08)] backdrop-blur-md md:px-8 md:py-10">
            <div className="mb-6 text-center md:text-left">
              <p className="ragikon-word text-[0.7rem] uppercase tracking-[0.2em] text-[#1d4ed8] md:text-sm">Creadores</p>
              <h2 className="ragikon-word mt-3 text-[1.7rem] text-slate-900 sm:text-[2.1rem] md:text-[2.8rem]">
                Jóvenes soñadores de un mundo mejor
              </h2>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
              {creadores.map((creador) => (
                <article
                  key={creador.nombre}
                  className="group flex flex-1 flex-col items-center gap-4 rounded-[28px] border border-white/60 bg-white/20 p-4 text-center shadow-[0_16px_28px_rgba(15,23,42,0.04)] transition duration-300 hover:bg-white/30 md:items-start md:text-left"
                >
                  <div className="flex w-full items-center justify-center md:justify-start">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[24px] border border-white/70 bg-[linear-gradient(135deg,#dbeafe,#ecfdf5)] text-lg font-black text-slate-700 shadow-[0_12px_24px_rgba(59,130,246,0.08)] md:h-24 md:w-24">
                      {creador.iniciales}
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-xl font-extrabold tracking-[-0.04em] text-slate-900">{creador.nombre}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#1d4ed8]">{creador.rol}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{creador.universidad}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer id="contacto" className="mt-8 rounded-[30px] border border-slate-200 bg-[#edf4f7] px-4 py-7 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.04)] md:px-8 md:py-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr]">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_10px_20px_rgba(18,48,122,0.09)] ring-1 ring-slate-200">
                    <Escudo size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">BullyBlock</p>
                    <p className="text-sm text-slate-600">Detenemos el bullying. Juntos.</p>
                  </div>
                </div>
                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
                  BullyBlock ayuda a estudiantes y docentes a denunciar, acompañar y resolver situaciones de acoso escolar con cuidado y respaldo institucional.
                </p>
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Plataforma</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li><a href="#inicio" className="transition hover:text-[#1d4ed8]">Inicio</a></li>
                  <li><a href="#como-funciona" className="transition hover:text-[#1d4ed8]">Cómo funciona</a></li>
                  <li><a href="#beneficios" className="transition hover:text-[#1d4ed8]">Beneficios</a></li>
                  <li><a href="#privacidad" className="transition hover:text-[#1d4ed8]">Privacidad</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Tratamiento</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li><Link to="/ingresar" className="transition hover:text-[#1d4ed8]">Ingresar</Link></li>
                  <li><Link to="/registro" className="transition hover:text-[#1d4ed8]">Crear cuenta</Link></li>
                  <li><a href="#contacto" className="transition hover:text-[#1d4ed8]">Contacto</a></li>
                  <li><a href="#privacidad" className="transition hover:text-[#1d4ed8]">Política</a></li>
                </ul>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Síguenos</h3>
                <div className="mt-3 flex items-center gap-2.5">
                  {['IG', 'X', 'in', 'YT'].map((item) => (
                    <a
                      key={item}
                      href="#contacto"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[10px] font-bold text-slate-700 transition hover:border-[#93c5fd] hover:text-[#1d4ed8]"
                      aria-label={`Síguenos en ${item}`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 md:flex-row">
              <p>© 2026 BullyBlock. Todos los derechos reservados.</p>
              <p className="text-center md:text-right">Acompañamiento escolar · Seguridad · Confianza</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
