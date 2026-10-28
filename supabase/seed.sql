-- =====================================================================
-- Seed seguro para demo / pruebas locales
-- NO ES PARA PRODUCCIÓN REAL.
-- Este script solo actualiza usuarios ya existentes y crea reportes sintéticos
-- con roles y nombres coherentes, sin destruir la base actual.
-- =====================================================================

-- 1) Asegurar que existan los roles del sistema.
do $$
begin
  if not exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'rol_usuario'
      and e.enumlabel = 'docente'
  ) then
    alter type public.rol_usuario add value 'docente';
  end if;

  if not exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'rol_usuario'
      and e.enumlabel = 'psicoorientador'
  ) then
    alter type public.rol_usuario add value 'psicoorientador';
  end if;

  if not exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'rol_usuario'
      and e.enumlabel = 'admin'
  ) then
    alter type public.rol_usuario add value 'admin';
  end if;
end $$;

-- 2) Corregir usuarios de ejemplo si ya existen.
update public.perfiles p
set
  nombre = case
    when lower(u.email) = 'estudiante@gmail.com' then 'Estudiante Demo'
    when lower(u.email) = 'profesor@gmail.com' then 'Profesor Demo'
    when lower(u.email) = 'psicorientador@gmail.com' then 'Psicorientador Demo'
    when lower(u.email) = 'admin@gmail.com' then 'Administrador Demo'
    else coalesce(nullif(trim(p.nombre), ''), split_part(u.email, '@', 1))
  end,
  rol = case
    when lower(u.email) = 'estudiante@gmail.com' then 'estudiante'
    when lower(u.email) = 'profesor@gmail.com' then 'docente'
    when lower(u.email) = 'psicorientador@gmail.com' then 'psicoorientador'
    when lower(u.email) = 'admin@gmail.com' then 'admin'
    else p.rol
  end,
  activo = true,
  aprobado = true
from auth.users u
where p.id = u.id
  and lower(u.email) in (
    'estudiante@gmail.com',
    'profesor@gmail.com',
    'psicorientador@gmail.com',
    'admin@gmail.com'
  );

-- 3) Crear reportes sintéticos para prueba, sin pisar datos reales.
with estudiantes as (
  select p.id, u.email
  from public.perfiles p
  join auth.users u on u.id = p.id
  where p.rol = 'estudiante'
  limit 10
),
docentes as (
  select p.id
  from public.perfiles p
  where p.rol = 'docente'
  limit 4
),
psico as (
  select p.id
  from public.perfiles p
  where p.rol = 'psicoorientador'
  limit 1
)
insert into public.reportes (
  reportante_id,
  tipo,
  descripcion,
  lugar,
  fecha_hecho,
  involucrados,
  urgente,
  prioridad,
  estado,
  asignado_a
)
select
  e.id,
  case
    when row_number() over (order by e.email) % 4 = 1 then 'verbal'
    when row_number() over (order by e.email) % 4 = 2 then 'exclusion'
    when row_number() over (order by e.email) % 4 = 3 then 'ciberacoso'
    else 'otra'
  end,
  'Caso sintético para pruebas del flujo de BullyBlock. Esta descripción simula una situación real de acoso escolar para validar la atención del equipo.',
  case
    when row_number() over (order by e.email) % 3 = 1 then 'Pasillo'
    when row_number() over (order by e.email) % 3 = 2 then 'Patio'
    else 'Sala de clases'
  end,
  current_date - ((row_number() over (order by e.email) % 8) * interval '1 day'),
  'Compañeros del curso',
  case when row_number() over (order by e.email) % 5 = 0 then true else false end,
  case when row_number() over (order by e.email) % 5 = 0 then 'urgente' else 'normal' end,
  'nuevo',
  case
    when row_number() over (order by e.email) % 5 = 0 then (select id from psico limit 1)
    else (select id from docentes order by random() limit 1)
  end
from estudiantes e
where not exists (
  select 1
  from public.reportes r
  where r.reportante_id = e.id
);

-- 4) Verificación rápida.
select
  u.email,
  p.nombre,
  p.rol,
  p.activo,
  p.aprobado
from auth.users u
join public.perfiles p on p.id = u.id
where lower(u.email) in (
  'estudiante@gmail.com',
  'profesor@gmail.com',
  'psicorientador@gmail.com',
  'admin@gmail.com'
)
order by u.email;
