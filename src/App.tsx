import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useAuth } from './lib/auth'
import { esDocente, esEstudiante, esPersonal, rutaPorRol, type ModoAcceso } from './lib/types'
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
  if (modo === 'docente' && !esDocente(perfil.rol)) {
    return <Navigate to={rutaPorRol(perfil.rol)} replace />
  }
  if (modo === 'personal' && !esPersonal(perfil.rol)) {
    return <Navigate to={rutaPorRol(perfil.rol)} replace />
  }
  if (modo === 'admin' && perfil.rol !== 'admin') {
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

export default function App() {
  return (
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

      <Route element={<Protegida modo="docente" />}>
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
  )
}
