# Base de datos en Supabase

## 1. Objetivo

La base de datos debe soportar autenticación, roles, casos, reportes, mensajes, notas internas y métricas de seguimiento.

## 2. Entidades principales

### profiles
- id (uuid / FK a auth.users)
- email
- nombre
- apellido
- rol
- activo
- validado
- created_at

### estudiantes
- id
- profile_id
- grado
- grupo
- salon
- materia
- docente
- created_at

### casos
- id
- estudiante_id
- docente_id
- psicoorientador_id
- tipo_reporte
- descripcion
- severidad
- urgente
- estado
- created_at
- updated_at

### caso_mensajes
- id
- caso_id
- remitente_id
- contenido
- tipo
- created_at

### caso_notas_internas
- id
- caso_id
- autor_id
- contenido
- created_at

### respuestas_psicoorientacion
- id
- caso_id
- autor_id
- contenido
- visible_para_estudiante
- created_at

### configuracion
- clave
- valor
- updated_at

## 3. Roles esperados

- estudiante
- docente
- psicoorientador
- admin

## 4. Reglas de negocio

- solo el estudiante dueño ve su caso completo
- docente solo ve reportes que ha observado o que le fueron asignados
- psicoorientador ve todos los casos activos
- admin puede gestionar usuarios y roles
- notas internas no deben verse por el estudiante
- respuestas pueden ser visibles para el estudiante

## 5. Seguridad

- usar Supabase Auth
- activar RLS por tabla
- evitar service role en frontend
- validar con políticas en SQL

## 6. Puntos recomendados para migrar

1. crear esquema SQL base
2. cargar roles y permisos
3. crear profiles desde auth.users trigger
4. definir permisos por rol
5. cargar datos demo para validación

## 7. Recomendación final

Antes de pasar a producción, la base debe estar validada con:

- registro real
- creación de usuario con rol
- permisos por caso
- visibilidad de mensajes y notas
- actualización de estado con trazabilidad
