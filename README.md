# BullyBlock

<p align="center">
  <img src="./docs/github-banner.svg" alt="Banner BullyBlock" width="100%" />
</p>

BullyBlock es una plataforma web mobile-first para apoyar a estudiantes, docentes, psicorientación y administración en la gestión de situaciones de acoso escolar, riesgo y acompañamiento institucional.

La idea principal es clara: que una persona pueda reportar lo que vive sin miedo, y que el colegio pueda responder con empatía, orden y claridad.

## ¿Qué hace BullyBlock?

BullyBlock ayuda a la comunidad escolar a:

- reportar casos de acoso, exclusión o intimidación,
- describir lo sucedido con contexto y detalle,
- pedir ayuda sin sentirse perdida ni confundida,
- dar seguimiento a cada caso según el rol responsable,
- organizar la atención del personal académico y de apoyo,
- y mejorar la respuesta institucional con una experiencia accesible.

No es solo una app para “mandar un reporte”. Es una herramienta para apoyar real y humanamente a la comunidad educativa.

## ¿Por qué importa?

Muchas situaciones delicadas no se reportan por miedo, falta de claridad o porque el proceso parece complicado. BullyBlock busca reducir ese problema con una experiencia amigable, clara y segura.

Esto impacta directamente en la institución porque:

- reduce la confusión en la gestión de casos,
- ayuda a detectar alertas con mayor rapidez,
- da una vía ordenada para la atención del problema,
- centraliza información importante en un mismo lugar,
- mejora la comunicación entre estudiante y personal escolar,
- y fortalece una respuesta más responsable, humana y estructurada.

## Roles del sistema

El proyecto está pensado con cuatro roles principales:

| Rol | Función principal |
| --- | --- |
| Estudiante | Reporta situaciones y recibe apoyo o seguimiento. |
| Docente | Acompaña y da seguimiento a casos del entorno escolar. |
| Psicorientador | Revisa, prioriza y acompaña casos sensibles o de bienestar. |
| Admin | Supervisa la operación general del sistema y la estructura institucional. |

La lógica de roles se diseña para evitar mezcla de funciones y asegurar que cada persona tenga un papel claro dentro del proceso.

## Cómo funciona la experiencia

La app está pensada para recorrer el problema de forma guiada y segura:

1. El estudiante entra a la app.
2. Selecciona el tipo de situación y la describe.
3. El caso queda registrado con información útil.
4. El equipo de apoyo revisa el caso.
5. Se responde, se cambia de estado y se sigue la atención.
6. La institución puede ver la evolución del caso de forma ordenada.

Esto hace que la gestión sea más clara y menos caótica para todos los actores.

## Modo claro, oscuro y accesibilidad

BullyBlock incluye un sistema claro/oscuro para mejorar la experiencia visual y la accesibilidad.

### Modo claro

- mejor para lectura en espacios luminosos,
- más limpio y visualmente sobrio,
- ideal para uso cotidiano en ambientes normales.

### Modo oscuro

- reduce la fatiga visual,
- mejora el uso en ambientes con poca luz,
- y ayuda a mantener una experiencia más cómoda en pantallas largas.

Además, la interfaz se diseña pensando en:

- textos legibles,
- botones grandes y sencillos,
- navegación clara,
- contraste adecuado,
- y una experiencia pensada para móvil con urgencia y estrés.

## Qué hace cada pantalla

### 1) Landing y acceso

<p align="center">
  <img src="./docs/screenshots/home-claro.png" alt="Home de BullyBlock en modo claro" width="100%" />
</p>

La primera vista presenta la intención del proyecto: dar un lugar seguro para pedir ayuda y organizar la respuesta institucional.

<p align="center">
  <img src="./docs/screenshots/home-oscuro.png" alt="Home de BullyBlock en modo oscuro" width="100%" />
</p>

El modo oscuro muestra una versión más tenue y confortable para uso prolongado o en condiciones de baja luminosidad.

### 2) Estudiante y flujo de ayuda

<p align="center">
  <img src="./docs/screenshots/ayuda-estudiante.png" alt="Ayuda para estudiante" width="32%" />
  <img src="./docs/screenshots/registro-situacion.png" alt="Registro de situación" width="32%" />
  <img src="./docs/screenshots/reportes-estudiante.png" alt="Reportes del estudiante" width="32%" />
</p>

Desde el punto de vista del estudiante, la app busca ser clara, amable y directa. El usuario puede pedir ayuda, explicar lo sucedido y ver el estado de su caso sin sentirse perdido.

### 3) Docente y seguimiento

<p align="center">
  <img src="./docs/screenshots/panel-docente.png" alt="Panel del docente" width="100%" />
</p>

El docente puede revisar casos, seguir su evolución y apoyar con criterio. La experiencia está pensada para no saturar ni confundir.

<p align="center">
  <img src="./docs/screenshots/estadisticas-docente.png" alt="Estadísticas del docente" width="100%" />
</p>

Las estadísticas permiten detectar patrones y tener contexto visual para actuar mejor en cada caso.

### 4) Psicorientación

<p align="center">
  <img src="./docs/screenshots/panel-psicorientador.png" alt="Panel de psicorientación" width="100%" />
</p>

La parte de orientación es clave para acompañar de forma humana y estructurada. Aquí se responde, se prioriza la atención y se asigna el flujo correcto para cada caso.

### 5) Administración

<p align="center">
  <img src="./docs/screenshots/panel-admin.png" alt="Panel administrativo" width="100%" />
</p>

La administración tiene una vista general del sistema y puede supervisar que el flujo esté funcionando bien en la institución.

<p align="center">
  <img src="./docs/screenshots/estadisticas-admin.png" alt="Estadísticas del administrador" width="100%" />
</p>

Las métricas ayudan a medir la carga de casos y a entender la frecuencia de situaciones para responder mejor.

### 6) Alerta y mensajes críticos

<p align="center">
  <img src="./docs/screenshots/peligro-mensaje-estudiante.png" alt="Pantalla de alerta o riesgo" width="100%" />
</p>

También existe una vista enfocada en la urgencia, donde se prioriza la respuesta cuando la situación requiere apoyo cercano o atención inmediata.

## Stack tecnológico

El proyecto usa una stack moderna para una solución web enfocada en accesibilidad y gestión escolar:

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- PostgreSQL
- Vercel

## Herramientas y para qué sirven

### React
Construye la interfaz de la aplicación y la experiencia de navegación.

### TypeScript
Mejora la seguridad del código y reduce errores durante el desarrollo.

### Vite
Permite compilar y servir la app de forma rápida y eficiente.

### Tailwind CSS
Ayuda a diseñar interfaces limpias, responsivas y consistentes.

### Supabase
Sirve para la autenticación, la base de datos y la lógica de acceso al sistema.

### PostgreSQL
Guarda los reportes, usuarios, perfiles y estados de cada caso.

### Vercel
Permite desplegar la aplicación de manera sencilla y profesional.

## Estructura del proyecto

```text
bullyblock/
├─ docs/
│  ├─ README.md
│  ├─ github-banner.svg
│  ├─ app-preview.svg
│  ├─ screenshots/
│  │  ├─ home-claro.png
│  │  ├─ home-oscuro.png
│  │  ├─ ayuda-estudiante.png
│  │  ├─ registro-situacion.png
│  │  ├─ reportes-estudiante.png
│  │  ├─ panel-docente.png
│  │  ├─ estadisticas-docente.png
│  │  ├─ panel-psicorientador.png
│  │  ├─ panel-admin.png
│  │  ├─ estadisticas-admin.png
│  │  └─ peligro-mensaje-estudiante.png
│  ├─ 01-arquitectura-software.md
│  ├─ 02-ui-ux-roadmap.md
│  ├─ 03-base-datos-supabase.md
│  ├─ 04-github-vercel.md
│  └─ 05-checklist.md
├─ public/
├─ scripts/
│  └─ theme-regression.test.mjs
├─ src/
│  ├─ App.tsx
│  ├─ components/
│  ├─ lib/
│  ├─ pages/
│  ├─ index.css
│  └─ main.tsx
├─ supabase/
│  ├─ schema.sql
│  ├─ seed.sql
│  ├─ staff.sql
│  └─ safe-roles-migration.sql
├─ .env
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ tsconfig.json
├─ vite.config.ts
├─ vercel.json
├─ README.md
└─ build-log.txt
```

## Cómo ejecutar el proyecto

```bash
git clone https://github.com/isyoimerr/bullyblock.git
cd bullyblock
npm install
npm run dev
```

### Variables de entorno

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
```

> Nunca subas la Service Role Key ni secretos del proyecto al repositorio.

## Base de datos y seguridad

El sistema usa Supabase + PostgreSQL y se recomienda mantener la base organizada para no romper flujo y datos ya existentes.

### Archivos clave

- [supabase/schema.sql](supabase/schema.sql)
- [supabase/seed.sql](supabase/seed.sql)
- [supabase/safe-roles-migration.sql](supabase/safe-roles-migration.sql)

## Próximos pasos

El proyecto ya tiene una base sólida, pero puede crecer aún más con:

- noticias y consejos dentro de la app,
- videos de apoyo,
- materiales educativos,
- más indicadores y estadísticas para orientación,
- y paneles más avanzados para detectar patrones de forma institucional.

## Documentación adicional

- [docs/README.md](docs/README.md)
- [docs/01-arquitectura-software.md](docs/01-arquitectura-software.md)
- [docs/02-ui-ux-roadmap.md](docs/02-ui-ux-roadmap.md)
- [docs/03-base-datos-supabase.md](docs/03-base-datos-supabase.md)
- [docs/04-github-vercel.md](docs/04-github-vercel.md)
- [docs/05-checklist.md](docs/05-checklist.md)

## Objetivo final

BullyBlock busca convertirse en una herramienta útil, segura y humana para instituciones educativas que necesitan atender situaciones sensibles con claridad, respeto y orden.

La idea central es simple: que una persona no se sienta sola cuando necesita ayuda, y que la comunidad escolar pueda responder con estructura, empatía y responsabilidad.

## Licencia

Este proyecto está pensado como base para uso institucional y adaptación en un contexto escolar real.
