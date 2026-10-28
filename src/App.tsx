import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from './lib/auth'
import { esEstudiante, esMaestro, esPersonal, rutaPorRol, type ModoAcceso } from './lib/types'
import { Cargando } from './components/ui'
import StudentLayout from './components/StudentLayout'
import PanelLayout from './components/PanelLayout'
import DocenteLayout from './components/DocenteLayout'
import Bienvenida from './pages/Bienvenida'
import Ingresar from './pages/Ingresar'
import Registro from './pages/Registro'
import Privacidad from './pages/Privacidad'
import Inicio from './pages/Inicio'
import Reportar from './pages/Reportar'
import Reportes from './pages/Reportes'
import ReporteDetalle from './pages/ReporteDetalle'
import Ayuda from './pages/Ayuda'
import AyudaAhora from './pages/AyudaAhora'
import Informacion from './pages/Informacion'
import Perfil from './pages/Perfil'
import Casos from './pages/panel/Casos'
import CasoDetalle from './pages/panel/CasoDetalle'
import Estadisticas from './pages/panel/Estadisticas'
import Usuarios from './pages/panel/Usuarios'
import DocenteInicio from './pages/docente/Inicio'
import DocenteAvisos from './pages/docente/Avisos'
import DocenteGuia from './pages/docente/Guia'
import DocenteReportes from './pages/docente/Reportes'

function Protegida({ modo }: { modo: ModoAcceso }) {
  const { session, perfil, cargando, salir } = useAuth()

  if (cargando) return <Cargando />
  if (!session) return <Navigate to="/ingresar" replace />
  if (!perfil) {
    return (
      <Aviso titulo="No encontramos tu perfil" salir={salir}>
        Tu cuenta existe pero no tiene perfil. Escribe a la oficina de orientación para que lo revisen.
      </Aviso>
    )
  }
  if (!perfil.activo || !perfil.aprobado) {
    return (
      <Aviso titulo={perfil.activo ? 'Tu cuenta está en revisión' : 'Tu cuenta está desactivada'} salir={salir}>
        {perfil.activo
          ? 'Estamos verificando que perteneces al colegio. Cuando te aprueben podrás entrar.'
          : 'Si crees que es un error, habla con la oficina de orientación.'}
      </Aviso>
    )
  }

  if (modo === 'estudiante' && !esEstudiante(perfil.rol)) {
    return <Navigate to={rutaPorRol(perfil.rol)} replace />
  }
  if (modo === 'maestro' && !esMaestro(perfil.rol)) {
    return <Navigate to={rutaPorRol(perfil.rol)} replace />
  }
  if (modo === 'personal' && !esPersonal(perfil.rol)) {
    return <Navigate to={rutaPorRol(perfil.rol)} replace />
  }
  if (modo === 'admin' && !esPersonal(perfil.rol)) {
    return <Navigate to={rutaPorRol(perfil.rol)} replace />
  }

  return <Outlet />
}

function Aviso({ titulo, children, salir }: { titulo: string; children: string; salir: () => Promise<void> }) {
  return (
    <div className="flex min-h-dvh items-center justify-center p-6">
      <div className="card max-w-md text-center">
        <h1 className="mb-2 text-2xl">{titulo}</h1>
        <p className="mb-4 text-suave">{children}</p>
        <button className="btn btn-azul" onClick={() => void salir()}>
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

function IconoTema({ oscuro }: { oscuro: boolean }) {
  if (oscuro) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M20 15.5A7.5 7.5 0 0 1 8.5 4a7.5 7.5 0 1 0 11.5 11.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v2.1M12 19.4v2.1M21.5 12h-2.1M4.6 12H2.5M18.4 5.6l-1.5 1.5M7.1 16.9l-1.5 1.5M18.4 18.4l-1.5-1.5M7.1 7.1 5.6 5.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function getTemaInicial(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  const almacenado = window.localStorage.getItem('bullyblock-theme')
  if (almacenado === 'light' || almacenado === 'dark') return almacenado
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTema(tema: 'light' | 'dark') {
  document.body.dataset.theme = tema
  document.documentElement.style.colorScheme = tema
  window.localStorage.setItem('bullyblock-theme', tema)
}

function ThemeToggle({ tema, setTema }: { tema: 'light' | 'dark'; setTema: React.Dispatch<React.SetStateAction<'light' | 'dark'>> }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={tema === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      onClick={() => setTema((prev) => (prev === 'dark' ? 'light' : 'dark'))}
    >
      <IconoTema oscuro={tema === 'dark'} />
    </button>
  )
}

function getRouteOrder(pathname: string) {
  if (pathname.startsWith('/docente')) {
    return ['/docente', '/docente/avisos', '/docente/guia', '/docente/reportes']
  }

  if (pathname.startsWith('/panel')) {
    return ['/panel', '/panel/estadisticas', '/panel/usuarios']
  }

  return ['/app', '/app/reportar', '/app/reportes', '/app/perfil', '/app/ayuda', '/app/ayuda-ahora', '/app/informacion']
}

function MobileGestureController({ tema, setTema }: { tema: 'light' | 'dark'; setTema: React.Dispatch<React.SetStateAction<'light' | 'dark'>> }) {
  const location = useLocation()
  const navigate = useNavigate()
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const pinchStartRef = useRef<{ distance: number; scale: number } | null>(null)
  const lastTapRef = useRef(0)

  useEffect(() => {
    const root = document.documentElement
    const valorGuardado = Number(root.style.getPropertyValue('--text-scale') || '1')
    if (Number.isFinite(valorGuardado) && valorGuardado > 0) {
      root.style.setProperty('--text-scale', String(valorGuardado))
    }
  }, [])

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      const [a, b] = Array.from(event.touches)
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
      const currentScale = Number(document.documentElement.style.getPropertyValue('--text-scale') || '1') || 1
      pinchStartRef.current = { distance, scale: currentScale }
      return
    }

    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() }
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 2 || !pinchStartRef.current) return

    const [a, b] = Array.from(event.touches)
    const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
    const nextScale = Math.min(1.35, Math.max(0.9, pinchStartRef.current.scale * (distance / pinchStartRef.current.distance)))
    document.documentElement.style.setProperty('--text-scale', nextScale.toFixed(2))
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.changedTouches.length >= 2) {
      pinchStartRef.current = null
      return
    }

    const touch = event.changedTouches[0]
    const start = touchStartRef.current
    touchStartRef.current = null

    if (!start) return

    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    const travelTime = Date.now() - start.time

    const routeOrder = getRouteOrder(location.pathname)
    const index = routeOrder.indexOf(location.pathname)

    if (Math.abs(deltaX) > 70 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0 && index >= 0 && index < routeOrder.length - 1) {
        navigate(routeOrder[index + 1])
      }
      if (deltaX > 0 && index > 0) {
        navigate(routeOrder[index - 1])
      }
      return
    }

    if (travelTime < 280 && Math.abs(deltaX) < 18 && Math.abs(deltaY) < 18) {
      const now = Date.now()
      if (now - lastTapRef.current < 280) {
        setTema((prev) => (prev === 'dark' ? 'light' : 'dark'))
      }
      lastTapRef.current = now
    }
  }

  useEffect(() => {
    applyTema(tema)
  }, [tema])

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/ingresar/:rol" element={<Ingresar />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/privacidad" element={<Privacidad />} />

        <Route element={<Protegida modo="estudiante" />}>
          <Route path="/app" element={<StudentLayout />}>
            <Route index element={<Inicio />} />
            <Route path="reportar" element={<Reportar />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="reportes/:id" element={<ReporteDetalle />} />
            <Route path="ayuda" element={<Ayuda />} />
            <Route path="ayuda-ahora" element={<AyudaAhora />} />
            <Route path="informacion" element={<Informacion />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>
        </Route>

        <Route element={<Protegida modo="maestro" />}>
          <Route path="/docente" element={<DocenteLayout />}>
            <Route index element={<DocenteInicio />} />
            <Route path="avisos" element={<DocenteAvisos />} />
            <Route path="guia" element={<DocenteGuia />} />
            <Route path="reportes" element={<DocenteReportes />} />
          </Route>
        </Route>

        <Route element={<Protegida modo="personal" />}>
          <Route path="/panel" element={<PanelLayout />}>
            <Route index element={<Casos />} />
            <Route path="casos/:id" element={<CasoDetalle />} />
            <Route path="estadisticas" element={<Estadisticas />} />
            <Route element={<Protegida modo="admin" />}>
              <Route path="usuarios" element={<Usuarios />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default function App() {
  const [tema, setTema] = useState<'light' | 'dark'>(getTemaInicial)

  return (
    <>
      <ThemeToggle tema={tema} setTema={setTema} />
      <MobileGestureController tema={tema} setTema={setTema} />
    </>
  )
}
