# BullyBlock

<p align="center">
  <img src="./docs/github-banner.svg" alt="Banner BullyBlock" width="100%" />
</p>

BullyBlock es una plataforma web mobile-first para apoyar a estudiantes, docentes, orientación y administración en la gestión de situaciones de acoso escolar, riesgo y acompañamiento institucional.

La intención del proyecto es clara: que una persona pueda reportar lo que vive sin miedo, y que el colegio pueda responder con empatía, orden y claridad.

## ¿Qué hace BullyBlock?

BullyBlock ayuda a que la comunidad educativa pueda:

- reportar situaciones de acoso, exclusión o intimidación,
- describir el caso con contexto y detalles,
- recibir ayuda o apoyo cuando lo necesitan,
- dar seguimiento a cada caso según el rol correspondiente,
- organizar la atención del personal escolar,
- y mejorar la respuesta institucional con una experiencia accesible.

No es solo una app para “mandar un reporte”. Es una herramienta para dar apoyo real, acompañar a la persona afectada y dejar el proceso de atención más ordenado para toda la comunidad escolar.

## ¿Cómo impacta al colegio?

Este proyecto puede aportar mucho a una institución educativa porque:

- reduce la confusión en la gestión de casos,
- ayuda a detectar situaciones con mayor rapidez,
- da una ruta clara para atención y seguimiento,
- centraliza la información en un sistema ordenado,
- mejora la comunicación entre estudiante y personal de apoyo,
- y fortalece una respuesta más responsable, segura y humana.

En otras palabras: BullyBlock busca convertir un problema difícil en un proceso claro, respetuoso y útil para todos.

## Flujos principales del producto

### 1) Estudiante

El estudiante entra a la app y puede:

- iniciar sesión,
- acceder a su zona personal,
- reportar una situación,
- describir qué ocurrió,
- indicar el tipo de caso,
- y ver el estado de su atención.

El flujo está pensado para que sea sencillo, directo y no abrumador, especialmente en móvil. Una persona que está pasando por una situación sensible necesita una experiencia clara y tranquila.

### 2) Psicorientación y apoyo

La parte de orientación tiene un rol muy importante:

- revisa los casos,
- prioriza la atención,
- responde al estudiante,
- puede pedir más información si hace falta,
- y organiza un acompañamiento más cercano y humanizado.

La app da opciones para que orientación pueda actuar con empatía, pero también con estructura y criterio.

### 3) Docente

El docente puede:

- revisar casos asignados,
- dar seguimiento,
- detectar patrones y alertas,
- y colaborar con la respuesta institucional.

No se trata de cargar al docente con tareas complejas; la idea es que tenga una vista útil y organizada para apoyar a la comunidad escolar.

### 4) Administración

El admin tiene un rol de supervisión y control del sistema:

- revisa la operación general,
- verifica que el flujo funcione,
- mantiene la estructura del proyecto,
- y evita que el sistema se desorganice.

El rol de admin no reemplaza la atención real; está pensado para apoyar la administración del entorno, no para sustituir la labor de orientación o docentes.

## Roles del sistema

El proyecto está pensado con cuatro roles principales:

| Rol | Función principal |
| --- | --- |
| Estudiante | Reporta situaciones y recibe apoyo o seguimiento. |
| Docente | Acompaña y da seguimiento a casos dentro del proceso escolar. |
| Psicorientador | Revisa, prioriza y acompaña casos sensibles o de bienestar. |
| Admin | Supervisa la operación general del sistema y la estructura institucional. |

La lógica de roles se diseñó para mantener claridad en la organización y evitar que alguien tenga funciones sin sentido o sin responsabilidad real.

## ¿Cómo funciona la experiencia?

El flujo principal del producto se ve así:

1. El estudiante accede y crea un reporte.
2. Selecciona el tipo de situación y la describe.
3. El caso queda registrado en el sistema.
4. El equipo de apoyo revisa el caso.
5. Se cambia el estado del caso y se responde oportunamente.
6. El proceso queda documentado y ordenado.

Esto ayuda a que no se pierda información ni se vuelva confuso para quienes atienden.

## Modo claro y oscuro

La app incluye un sistema de modo claro y oscuro para mejorar la accesibilidad y la experiencia visual.

### Modo claro

- pensado para ambientes muy luminosos,
- más cómodo para lectura en exteriores o contexto diario,
- con tonos suaves y una estética limpia.

### Modo oscuro

- reduce el brillo en pantallas largas,
- es más cómodo para uso nocturno,
- y mejora la experiencia visual en entornos con poca iluminación.

Esto es importante porque el proyecto prioriza accesibilidad y cuidado visual, especialmente para personas con sensibilidad a la luz o dificultad de lectura.

## Accesibilidad y experiencia móvil

El proyecto está pensado para ser mobile-first y accesible.

Incluye principios como:

- interfaces compactas para móvil,
- textos grandes y legibles,
- espacios amplios para tocar con el dedo,
- botones claros y de alto contraste,
- navegación simple,
- esquemas de color con buenos niveles de contraste,
- y una experiencia que no obligue a pensar demasiado en medio de una situación difícil.

La UI se diseñó para una persona que puede estar usando el celular con urgencia o estrés. Por eso la navegación busca ser fluida, clara y directa.

## Capturas del flujo

La app cuenta con varias pantallas clave que muestran la idea del producto. En esta carpeta se pueden dejar organizadas las capturas reales:

- [docs/screenshots/README.md](docs/screenshots/README.md)

Se recomienda guardar imágenes como:

- home-dark.png
- home-light.png
- login.png
- inicio-estudiante.png
- reporte.png
- detalle-caso.png
- panel-psicorientacion.png
- estadisticas.png

## Stack tecnológico

El proyecto usa una combinación moderna y útil para una app de este tipo:

- React: interfaz y lógica de la aplicación.
- TypeScript: mejora la seguridad del código y su mantenimiento.
- Vite: entorno de desarrollo y compilación rápida.
- Tailwind CSS: diseño visual moderno y responsivo.
- Supabase: autenticación, base de datos y lógica de backend.
- PostgreSQL: almacenamiento principal y estructura de datos.
- Vercel: despliegue para producción.

## Qué hace cada herramienta

### React
Construye la UI y la experiencia navegable de la app.

### TypeScript
Evita errores comunes y mejora la calidad del código.

### Vite
Permite desarrollar y compilar la app de forma más ágil.

### Tailwind CSS
Acorta el trabajo de diseño para una interfaz visual limpia y consistente.

### Supabase
Es la pieza central para autenticar usuarios, guardar información y gestionar el sistema de datos.

### PostgreSQL
Guarda los reportes, perfiles y el estado de cada caso.

### Vercel
Publica la aplicación en producción y facilita el despliegue continuo.

## Estructura del proyecto

```text
bullyblock/
├─ docs/
│  ├─ README.md
│  ├─ github-banner.svg
│  ├─ app-preview.svg
│  ├─ screenshots/
│  │  └─ README.md
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

> Nunca subas la Service Role Key ni secretos del proyecto a GitHub.

## Base de datos y seguridad

La base se maneja con Supabase y PostgreSQL. La recomendación es mantenerla ordenada y segura para no romper lo que ya existe.

### Archivos clave

- [supabase/schema.sql](supabase/schema.sql)
- [supabase/seed.sql](supabase/seed.sql)
- [supabase/safe-roles-migration.sql](supabase/safe-roles-migration.sql)

## Lo que falta por mejorar

El proyecto ya tiene una base sólida, pero aún puede crecer en varias áreas:

- noticias y consejos dentro de la app,
- videos de apoyo y contenido educativo,
- más indicadores para orientación,
- mejor segmentación de reportes por contexto,
- y una capa más avanzada de estadística para detectar patrones.

Eso daría continuidad a la idea de que BullyBlock no sea solo un sistema de reporte, sino también un espacio de apoyo y educación escolar.

## Documentación adicional

- [docs/README.md](docs/README.md)
- [docs/01-arquitectura-software.md](docs/01-arquitectura-software.md)
- [docs/02-ui-ux-roadmap.md](docs/02-ui-ux-roadmap.md)
- [docs/03-base-datos-supabase.md](docs/03-base-datos-supabase.md)
- [docs/04-github-vercel.md](docs/04-github-vercel.md)
- [docs/05-checklist.md](docs/05-checklist.md)

## Objetivo final

BullyBlock busca convertirse en una herramienta útil, segura y humana para instituciones educativas que necesitan manejar situaciones sensibles con confianza y orden.

La idea central es que nadie se sienta solo cuando necesita ayuda, y que el colegio pueda responder con una estructura clara, sin perder la empatía.

## Licencia

Este proyecto está pensado como base para uso institucional y adaptación en un contexto escolar real.
