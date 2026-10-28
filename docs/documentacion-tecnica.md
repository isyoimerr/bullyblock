# Documentación técnica para desarrolladores

## 1. Introducción

Si abrimos el repositorio en GitHub, podemos ver que la aplicación está construida principalmente en TypeScript. Este lenguaje representa la mayor parte del proyecto porque concentra la lógica de negocio, la interacción con la interfaz y la coordinación del flujo del sistema.

El 11% del proyecto corresponde a CSS, que define la apariencia visual y el diseño responsivo para que la app se vea limpia y funcione bien en pantallas móviles. El 10% restante corresponde a PLpgSQL, que es el lenguaje usado para interactuar con la base de datos relacional y manejar consultas, reglas y almacenamiento de información.

## 2. Frontend

La primera parte del proyecto es el Frontend, es decir, todo lo que el usuario ve y toca en la aplicación. Esta capa se desarrolla con React + TypeScript y se despliega en Vercel para que quede disponible en internet y cargue de forma rápida y segura.

Esto permite que la interfaz sea responsiva, amigable y útil para dispositivos móviles, donde la mayoría de la interacción sucede.

## 3. Backend y datos

La segunda parte es el Backend, que funciona detrás de escena. Para esto usamos Supabase, una plataforma que ofrece autenticación, almacenamiento y acceso a una base de datos PostgreSQL.

Toda la información del sistema queda guardada aquí: usuarios, reportes, roles, casos, seguimiento y datos de apoyo. La base de datos se gestiona con PostgreSQL y la comunicación con la app se realiza de forma segura mediante la API y las variables de entorno del proyecto.

## 4. Registro, autenticación y roles

Cuando un usuario llena sus datos desde la app, la información viaja desde el Frontend desplegado en Vercel hasta Supabase. El sistema procesa esos datos y asigna un rol según el tipo de usuario: Estudiante, Profesor, Psicorientación o Administrador.

El rol es clave porque determina qué pantallas puede ver, qué permisos tiene y qué tipo de acceso puede tener en la plataforma. Esto ayuda a mantener la seguridad y la organización del sistema.

## 5. Flujo del sistema

1. El estudiante entra a la aplicación.
2. Registra su situación o solicita ayuda.
3. La información se guarda en la base de datos.
4. El sistema clasifica el caso según su prioridad y tipo.
5. El rol responsable recibe el caso para revisarlo y darle seguimiento.
6. La institución puede responder con orden, apoyo y trazabilidad.

## 6. Tecnologías principales

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- PostgreSQL
- Vercel

## 7. Variables de entorno

El proyecto requiere las siguientes variables para funcionar correctamente:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
```

Estas variables deben configurarse en el entorno de producción para que la app se conecte correctamente con Supabase.

## 8. Cómo correr el proyecto localmente

```bash
git clone https://github.com/isyoimerr/bullyblock.git
cd bullyblock
npm install
npm run dev
```

## 9. Objetivo del proyecto

BullyBlock busca ofrecer una herramienta útil para la comunidad educativa, donde los estudiantes puedan pedir apoyo o reportar situaciones con claridad y seguridad, y la institución pueda responder de manera organizada, empática y efectiva.
