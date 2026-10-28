# BullyBlock

BullyBlock es una aplicación web mobile-first para apoyar a estudiantes, docentes, psicorientación y administración en la gestión de situaciones de acoso escolar, riesgo y acompañamiento institucional.

La idea principal del proyecto es simple pero importante: que una persona pueda reportar una situación de forma clara y segura, y que el colegio pueda responder con orden, empatía y una estructura de trabajo real.

## ¿Qué problema resuelve?

Muchas veces las situaciones de acoso, intimidación o maltrato escolar no se reportan por miedo, falta de claridad o porque el proceso es confuso. BullyBlock busca reducir ese problema creando un espacio donde:

- el estudiante puede describir lo que vivió sin sentirse perdido,
- el docente puede ver el caso de forma organizada,
- la psicorientación puede priorizar la atención adecuada,
- la administración puede supervisar sin romper el flujo de trabajo real.

## ¿Qué hace el proyecto?

El sistema permite:

- registrar usuarios con roles diferenciados,
- crear reportes de situaciones de acoso o riesgo,
- clasificar y dar seguimiento a cada caso,
- asignar atención según el perfil del responsable,
- mantener un historial de evolución del caso,
- dar una experiencia accesible, clara y pensada para móvil,
- facilitar la coordinación entre estudiantes y personal escolar.

## Impacto en la comunidad educativa

Este proyecto impacta directamente en la forma como una institución puede responder ante situaciones sensibles. Su valor no es solo tecnológico, sino social:

- mejora la visibilidad de los casos,
- acelera la atención institucional,
- reduce la confusión en la gestión,
- ayuda a que la respuesta sea más responsable y organizada,
- genera un canal más seguro para estudiantes que necesitan apoyo.

En palabras simples: BullyBlock no es solo una app de reportes; es una herramienta para acompañar a la comunidad escolar con orden, cuidado y acción real.

## Roles dentro del sistema

El proyecto está pensado con 4 roles principales:

- Estudiante: reporta situaciones y consulta su estado.
- Docente: acompaña, observa y da seguimiento al caso.
- Psicorientador: revisa casos sensibles, prioriza y presta atención de bienestar.
- Admin: supervisa el sistema y la operación general.

La lógica del sistema está diseñada para que cada rol tenga un papel claro, sin mezclar funciones ni hacer que alguien “todo lo haga” sin criterio.

## Flujo principal del producto

1. El estudiante ingresa a la plataforma y realiza un reporte.
2. Describe la situación con detalles relevantes y contexto.
3. El caso queda registrado con información clave para la atención.
4. Docente o psicorientación revisan y gestionan el caso.
5. Se actualiza el estado y la atención continúa con seguimiento.
6. El admin puede supervisar la operación y mantener el sistema en orden.

## Stack tecnológico

El proyecto usa una combinación moderna y fácil de desplegar:

- React + TypeScript: interfaz y lógica de la app.
- Vite: entorno de desarrollo y compilación rápida.
- Tailwind CSS: estilos modernos y responsivos.
- Supabase: autenticación, base de datos y lógica de backend.
- PostgreSQL: almacenamiento estructurado y control de datos.
- Vercel: despliegue para producción.

## Herramientas que usamos y para qué sirven

### React
Se usa para construir toda la interfaz web. Es la base de la experiencia visual y la navegación de la app.

### TypeScript
Aporta tipado fuerte para evitar errores y hacer el proyecto más seguro, mantenible y escalable.

### Vite
Es la herramienta que compila y sirve la app durante el desarrollo y la producción. Hace más rápida la experiencia de trabajo.

### Tailwind CSS
Permite diseñar la interfaz rápida y consistente, con un estilo limpio y adaptable a móvil.

### Supabase
Es el corazón del backend del proyecto. Aquí se manejan:

- autenticación de usuarios,
- perfiles,
- base de datos relacional,
- reglas de acceso,
- y gestión de datos del sistema.

### PostgreSQL
Es la base de datos relacional que guarda los reportes, perfiles, estados y relación entre usuarios y casos.

### Vercel
Se usa para publicar la app en internet y dejarla disponible de forma directa para pruebas o despliegue final.

## Estructura del proyecto

```text
bullyblock/
├─ docs/
│  ├─ README.md
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

## Cómo correr el proyecto

```bash
git clone https://github.com/isyoimerr/bullyblock.git
cd bullyblock
npm install
npm run dev
```

### Variables de entorno

Necesitas configurar Supabase para que la app funcione:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
```

> No se debe subir la Service Role Key ni ningún secreto del proyecto al repositorio.

## Base de datos y seguridad

El proyecto usa Supabase con PostgreSQL y se recomienda dejar la base organizada para no romper lo que ya existe.

### Scripts importantes

- [supabase/schema.sql](supabase/schema.sql): define la estructura principal del sistema.
- [supabase/seed.sql](supabase/seed.sql): carga datos de prueba seguros y no destructivos.
- [supabase/safe-roles-migration.sql](supabase/safe-roles-migration.sql): migración segura para normalizar roles sin destruir información.

## Lógica recomendada para pruebas

Para que la aplicación se vea real y útil, la base de prueba debería seguir una lógica clara:

- estudiante reporta el caso,
- docente atiende casos operativos,
- psicorientador revisa casos sensibles,
- admin supervisa y administra sin sustituir la atención real.

Eso hace que el sistema no parezca solo una maqueta, sino una solución pensada para uso real.

## Consejo y noticias (futuro)

Como siguiente mejora, la app puede crecer para tener también una sección de consejos y noticias dentro de la comunidad escolar. Por ejemplo:

- avisos institucionales,
- noticias del colegio,
- consejos para estudiantes,
- videos de apoyo,
- materiales educativos,
- guías para docentes y familias.

Esto es importante porque una plataforma de apoyo no debe limitarse solo a reportes; también puede educar, informar y acompañar.

## Documentación adicional

- [docs/README.md](docs/README.md)
- [docs/01-arquitectura-software.md](docs/01-arquitectura-software.md)
- [docs/02-ui-ux-roadmap.md](docs/02-ui-ux-roadmap.md)
- [docs/03-base-datos-supabase.md](docs/03-base-datos-supabase.md)
- [docs/04-github-vercel.md](docs/04-github-vercel.md)
- [docs/05-checklist.md](docs/05-checklist.md)

## URL de despliegue

La aplicación está pensada para desplegarse en Vercel y conectarse con Supabase en producción real.

Ejemplo de estructura esperada:

- https://bullyblock.vercel.app
- o bien la URL válida del proyecto final en Vercel

## Objetivo final

BullyBlock busca convertirse en una solución útil para instituciones educativas que necesitan una forma más clara, segura y humana de atender situaciones de acoso, bienestar y acompañamiento escolar.

La idea central es muy concreta: hacer que una persona no se sienta sola cuando necesita ayuda, y que el colegio tenga una forma ordenada de responder con responsabilidad.

## Licencia

Este proyecto está pensado como base para uso institucional y adaptación. Puede ajustarse según las políticas y necesidades del colegio o la institución que lo use.
