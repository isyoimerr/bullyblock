import { Link } from 'react-router-dom'
import AuthShell from '../components/AuthShell'

export default function Privacidad() {
  return (
    <AuthShell titulo="Aviso de privacidad">
      <div className="space-y-3 text-[15px] text-texto">
        <p>
          BullyBlock es una herramienta de la Institución Educativa Técnica José Agustín Blanco Barros para prevenir y
          comunicar posibles situaciones de bullying.
        </p>
        <p>
          <strong>Qué guardamos:</strong> tus datos de registro (nombre, documento, grado, grupo y correo) y la
          información de los reportes que envíes.
        </p>
        <p>
          <strong>Quién lo ve:</strong> únicamente el equipo de orientación y las personas autorizadas por el colegio.
          Otros estudiantes nunca ven tus reportes.
        </p>
        <p>
          <strong>Para qué:</strong> atender tu caso, acompañarte y mejorar la convivencia escolar. No usamos tus datos
          para publicidad.
        </p>
        <p>
          <strong>Tus derechos:</strong> puedes pedir conocer, corregir o eliminar tus datos conforme a la Ley 1581 de
          2012, escribiendo a la oficina de orientación del colegio.
        </p>
        <p className="rounded-xl bg-azul-100 p-3 text-suave">
          BullyBlock no sustituye la intervención de docentes, orientadores o directivos. Si estás en peligro, busca a un
          adulto del colegio o llama al 123.
        </p>
        <p className="text-sm text-suave">
          Texto provisional: debe ser revisado y aprobado por el colegio antes de salir a producción.
        </p>
      </div>
      <Link to="/registro" className="btn btn-sec mt-4">Volver</Link>
    </AuthShell>
  )
}
