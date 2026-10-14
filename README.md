# BullyBlock

Aplicación web (móvil primero, responsive) para prevenir y comunicar posibles situaciones de bullying en la Institución Educativa Técnica José Agustín Blanco Barros. Los estudiantes reportan, piden ayuda y consultan el estado de su caso. Psicoorientación gestiona los casos desde un panel privado.

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS · Supabase (PostgreSQL, Auth, RLS) · Vercel.

## Roles

| Rol | Qué hace |
|---|---|
| estudiante | Se registra, reporta, ve solo sus reportes y escribe en el hilo de cada caso |
| docente | Igual que el estudiante (reporta lo que observó). No ve el tablero |
| psicoorientador | Panel: tablero de casos, detalle, notas internas, respuestas, estadísticas |
| admin | Todo lo anterior, más gestión de usuarios y roles |

El rol **nunca** lo define el cliente: lo asigna un trigger en la base de datos y solo un admin puede cambiarlo.

## 1. Requisitos

- Node.js 18 o superior (recomendado 20)
- Cuenta en Supabase, GitHub y Vercel
- VS Code

## 2. Instalar y abrir

```bash
cd bullyblock
npm install
```

## 3. Crear la base de datos en Supabase

1. En supabase.com crea un proyecto nuevo (guarda la contraseña de la base de datos).
2. Ve a **SQL Editor > New query**, pega TODO el contenido de `supabase/schema.sql` y pulsa **Run**. Se ejecuta una sola vez.
3. Ve a **Authentication > Providers > Email**. Para el prototipo, desactiva **Confirm email** (así el registro entra directo, sin verificar correo). Para producción déjalo activado.
4. Ve a **Project Settings > API** y copia la **Project URL** y la clave **anon public**.

> Nunca uses la clave `service_role` en este proyecto. No debe estar jamás en el navegador ni en GitHub.

## 4. Variables de entorno

```bash
cp .env.example .env
```

Edita `.env` y pega tus dos valores:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## 5. Probar en local

```bash
npm run dev
```

Abre http://localhost:5173. Para verlo como celular usa las herramientas de desarrollo del navegador (F12 > icono de móvil).

## 6. Crear el personal (psicoorientador, admin, docente)

El personal NO se registra desde la app.

1. En Supabase: **Authentication > Users > Add user > Create new user**. Pon correo y clave y marca **Auto Confirm User**. Por ejemplo `admin@estudiante.com`, `orientacion@estudiante.com`, `docente@estudiante.com`.
2. Abre `supabase/staff.sql`, ajusta los correos y ejecútalo en el SQL Editor. Esto asigna el rol y el nombre.
3. Ingresa en la app con esas cuentas. El psicoorientador y el admin entran directo a `/panel`.
4. Después, el admin puede cambiar roles y activar o desactivar cuentas desde **Usuarios** en el panel.

## 7. Datos de demostración (opcional)

1. Registra un estudiante desde la app con el correo `demo@estudiante.com`.
2. Ejecuta `supabase/seed.sql` en el SQL Editor. Crea 5 reportes ficticios en distintos estados.

No ejecutes el seed en producción real.

## 8. Subir a GitHub

```bash
git init
git add .
git commit -m "BullyBlock: prototipo funcional"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/bullyblock.git
git push -u origin main
```

Crea antes el repositorio vacío en github.com (de preferencia **privado**). Verifica que `.env` NO aparezca en `git status`: el `.gitignore` ya lo excluye.

## 9. Desplegar en Vercel

1. En vercel.com: **Add New > Project** e importa el repositorio.
2. Framework: **Vite** (lo detecta solo). Build command `npm run build`, output `dist`.
3. En **Environment Variables** agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` con los mismos valores del `.env`.
4. Pulsa **Deploy**. Cada `git push` a `main` vuelve a desplegar.
5. En Supabase: **Authentication > URL Configuration**, pon tu URL de Vercel en **Site URL** y agrégala a **Redirect URLs** (necesario para restablecer clave).

`vercel.json` ya incluye las reglas para que las rutas funcionen al recargar y las cabeceras de seguridad (CSP, HSTS, X-Frame-Options). Si cambias de proyecto de Supabase, la CSP ya permite `*.supabase.co`.

## 10. Probar que todo funciona (criterios de aceptación)

1. Un estudiante se registra, ingresa, envía un reporte y recibe un código `BB-2026-0001`.
2. Ve su reporte con estado y puede escribir en el hilo.
3. Un segundo estudiante **no** ve ese reporte.
4. El psicoorientador lo ve en la columna Nuevo, lo arrastra a otro estado, escribe una nota interna y una respuesta.
5. El estudiante ve la respuesta pero **no** la nota interna.
6. Un reporte con "Sí, estoy en peligro" aparece como URGENTE y muestra el 123.
7. Un estudiante que escribe `/panel` en la barra es redirigido a `/app`.
8. Funciona en pantallas de 360 px, tableta y computador.

## Estructura

```
src/
  App.tsx                rutas y protección por rol
  lib/                   supabase, auth, tipos, catálogos
  components/            Escudo, layouts, UI base
  pages/                 estudiante (Inicio, Reportar, Reportes, Ayuda, Información, Perfil)
  pages/panel/           Casos (tablero), CasoDetalle, Estadísticas, Usuarios
supabase/
  schema.sql             tablas, triggers y reglas RLS
  staff.sql              asignar roles al personal
  seed.sql               datos de demostración
```

## Diseño

- Colores en `tailwind.config.js` (azul y verde del escudo del colegio). **Ajústalos con los valores exactos de los escudos originales.**
- Fuentes: Plus Jakarta Sans (títulos) y Nunito Sans (texto), cargadas desde Google Fonts en `index.html`.
- Texto mínimo de 16 px, botones de al menos 48 px, el rojo solo existe en el panel del personal.
- Sin emojis: los íconos son de `lucide-react`.

## Pendiente para producción

- **Evidencias con foto** (Fase 2): subida a un bucket privado de Supabase Storage y limpieza de metadatos EXIF.
- **Correos de aviso** de casos nuevos y urgentes (Fase 2): Supabase Edge Function + proveedor de correo.
- **Captcha** (hCaptcha o Turnstile) en registro y envío.
- **Verificación en dos pasos** para personal (Supabase MFA).
- **Validar estudiantes**: cambia `VALIDAR_ESTUDIANTES` a `true` en la tabla `configuracion` para que queden pendientes hasta que el admin los apruebe.
- Íconos PNG de 192 y 512 px (con versión *maskable*) para la instalación como PWA. Hoy se usa el SVG.
- Cambiar la salida rápida (`StudentLayout.tsx`, función `salidaRapida`) si el colegio prefiere otra página neutra.
- Texto del **aviso de privacidad** (`pages/Privacidad.tsx`): es provisional y debe aprobarlo el colegio.
- Reemplazar el escudo (`components/Escudo.tsx`, `public/*.svg`) por el logo original.
- El indicador de "horas sin atender" cuenta horas corridas, no hábiles.
- Backups automáticos y plan de Supabase acorde al volumen (el plan gratuito pausa proyectos inactivos).

## Solución de problemas

- **Pantalla blanca con error de variables:** falta `.env` o las variables en Vercel. Revisa los pasos 4 y 9.
- **"No tienes permiso" al enviar un reporte:** la cuenta está sin aprobar o desactivada, o no se ejecutó `schema.sql` completo.
- **Registro pide confirmar correo:** desactiva Confirm email (paso 3) o confirma desde el correo.
- **El personal entra como estudiante:** no se ejecutó `staff.sql` con el correo correcto.
- **404 al recargar en Vercel:** falta `vercel.json` en la raíz del repositorio.
