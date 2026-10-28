# Arquitectura del software

## 1. Propósito

BullyBlock es una plataforma orientada a la prevención y gestión de situaciones de bullying dentro de una institución educativa. La app permite:

- registrar estudiantes y usuarios
- reportar incidentes o pedir ayuda ahora
- ver historial y estado del caso
- que docente o personal vea información relevante por rol
- que psicoorientación gestione casos, respuestas y estadísticas

## 2. Stack tecnológico

- Frontend: React + Vite + TypeScript
- UI: Tailwind CSS + CSS variables para sistema de tema
- Routing: React Router
- Autenticación: Supabase Auth
- Base de datos: PostgreSQL en Supabase
- Seguridad / permisos: RLS de Supabase
- Deploy: Vercel
- Gestión del código: Git + GitHub

## 3. Estructura principal

```text
src/
  App.tsx
  main.tsx
  index.css
  components/
    AuthShell.tsx
    Escudo.tsx
    StudentLayout.tsx
    DocenteLayout.tsx
    PanelLayout.tsx
  lib/
    auth.ts
    supabase.ts
    catalogo.ts
  pages/
    Bienvenida.tsx
    Ingresar.tsx
    Inicio.tsx
    Reportar.tsx
    Ayuda.tsx
    AyudaAhora.tsx
    Perfil.tsx
    docente/
      Inicio.tsx
      Avisos.tsx
      Guia.tsx
      Reportes.tsx
    panel/
      Casos.tsx
      CasoDetalle.tsx
      Estadisticas.tsx
      Usuarios.tsx
supabase/
  schema.sql
  staff.sql
  seed.sql
public/
  assets/
.github/workflows/
  vercel-deploy.yml
vercel.json
.env.example
README.md
```

## 4. Lógica funcional por roles

### Estudiante
- registro e ingreso
- reportar caso o pedir ayuda urgente
- revisar su historial
- ver respuesta de psicoorientación
- no ver notas internas ni casos de otros usuarios

### Docente
- reportar eventos observados
- revisar avisos dirigidos
- accede a guía y trazabilidad limitada

### Psicoorientador / admin
- panel central de casos
- cambios de estado
- notas internas y respuestas
- estadísticas y administración de usuarios

## 5. Modos de interacción

- Modo público: bienvenida, ingreso, registro, ayuda general
- Modo app: flujo autenticado según rol
- Modo panel: gestión institucional con datos sensibles

## 6. Patrones para mantener

- usar tokens de tema para colores, en lugar de clases rígidas
- priorizar variables CSS para dark/light mode
- mantener componentes visuales compactos y mobile-first
- no mezclar estilos hardcodeados con lógica de tema
- cada pantalla debe respetar el contexto del rol y la accesibilidad

## 7. Siguientes integraciones

- Supabase Auth con perfiles reales
- RLS por rol y por caso
- base de datos de reportes, mensajes, notas e historial
- Cloud Storage para evidencia e imágenes
- edge functions para notificaciones y tareas automáticas
