# BullyBlock

Somos un grupo de estudiantes y desarrolladores trabajando en una solución para apoyar a la comunidad escolar con una herramienta clara, accesible y útil para reportar situaciones de acoso, recibir ayuda y gestionar casos con responsabilidad.

BullyBlock nace como una idea para que un estudiante pueda denunciar o reportar lo que vive con calma y sin miedo, y para que docentes, psicorientación y administración puedan atenderlo de forma ordenada, segura y humana.

## Qué hace esta app

- Permite a un estudiante registrar un caso de acoso o riesgo.
- Ofrece un flujo simple para explicar lo sucedido con contexto y detalles.
- Da visibilidad a docentes y psicorientación para atender casos de forma adecuada.
- Centraliza la gestión de reportes y estados en un panel privado.
- Ayuda a organizar la atención según cada rol y nivel de urgencia.
- Está diseñada para ser clara en móvil, con una experiencia simple y accesible.

## Roles del sistema

La lógica del proyecto está pensada en 4 roles:

- Estudiante: reporta y revisa su estado.
- Docente: acompaña, da seguimiento y toma decisiones de apoyo escolar.
- Psicorientador: revisa casos sensibles, urgentes o de bienestar emocional.
- Admin: supervisa y administra el sistema, sin reemplazar la intención ni la intervención real del equipo educativo.

## Objetivo del proyecto

Queremos crear una herramienta útil para una comunidad educativa que necesite:

- denunciar situaciones con seguridad,
- recibir apoyo real,
- organizar la gestión de casos,
- reducir la confusión,
- y darle claridad a las personas que atienden estos reportes.

No es solo una app de “reporte”. Es una forma de acompañar a una comunidad con cuidado, respeto y acción.

## Cómo se ve el flujo

1. El estudiante entra a la app y crea su reporte.
2. El caso queda registrado con la información necesaria.
3. El docente o psicorientador revisa el caso según la lógica del sistema.
4. La persona encargada puede responder, cambiar el estado y dar seguimiento.
5. El admin puede supervisar la operación general.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase
- PostgreSQL
- Vercel

## Requisitos para probarlo

Necesitamos un proyecto real de Supabase con:

- Auth activo
- base de datos creada
- políticas RLS bien configuradas
- variables de entorno del proyecto

### Variables de entorno

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
```

> Nunca subir la Service Role Key ni los datos sensibles al repositorio.

## Cómo arrancar el proyecto

```bash
git clone https://github.com/isyoimerr/bullyblock.git
cd bullyblock
npm install
npm run dev
```

## Base de datos y pruebas rápidas

La base debe quedar limpia y ordenada. Para probar el flujo sin romper el proyecto, usamos scripts seguros de demo.

### 1) Ejecutar esquema base

```sql
supabase/schema.sql
```

### 2) Cargar datos iniciales de prueba

```sql
supabase/seed.sql
```

### 3) Crear usuarios del equipo en Supabase Auth

Se recomienda crear usuarios reales con estos emails de prueba:

- estudiante@gmail.com
- profesor@gmail.com
- psicorientador@gmail.com
- admin@gmail.com

Las contraseñas pueden ser temporales para pruebas locales y se deben cambiar después.

## Lógica recomendada para datos de prueba

- El estudiante reporta un caso.
- Los casos simples y operativos se asignan a docente.
- Los casos más graves o sensibles se asignan a psicorientador.
- El admin no debe aparecer como responsable directo del caso salvo casos muy específicos de supervisión.

Eso hace que el sistema se vea real y que la lógica de negocio se comprenda mejor.

## Consejo y noticias (futuro)

Como siguiente mejora, podría agregarse una sección de consejos y noticias para que la app también funcione como espacio de orientación y comunidad. Por ejemplo:

- noticias internas del colegio,
- avisos institucionales,
- consejos para estudiantes,
- videos de apoyo,
- materiales educativos,
- guías para docentes y estudiantes.

Eso ayudaría a que la app no sea solo un canal de denuncia, sino también un punto de información útil para la comunidad escolar.

## Documentación del proyecto

- [docs/README.md](docs/README.md)
- [docs/01-arquitectura-software.md](docs/01-arquitectura-software.md)
- [docs/02-ui-ux-roadmap.md](docs/02-ui-ux-roadmap.md)
- [docs/03-base-datos-supabase.md](docs/03-base-datos-supabase.md)
- [docs/04-github-vercel.md](docs/04-github-vercel.md)
- [docs/05-checklist.md](docs/05-checklist.md)

## Lo importante

Este proyecto es una base sólida para seguir creciendo con responsabilidad. No es solo una maqueta: busca ser una herramienta útil y seria para apoyar a una comunidad educativa real.

Nosotros lo estamos construyendo pensando en claridad, confianza y acción real. La idea es que una persona pueda pedir ayuda sin sentirse perdida, y que el equipo que atiende pueda hacerlo con orden.

## Licencia

Este proyecto está pensado como base para uso institucional y adaptación. Es una herramienta de apoyo para la comunidad educativa y puede ajustarse según el contexto del colegio o institución que lo use.
