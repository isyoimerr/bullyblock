-- =====================================================================
-- BullyBlock · migración segura de roles
-- Objetivo: dejar la base con 4 roles sin romper datos existentes.
-- No borra valores antiguos ni elimina usuarios ni reportes.
-- Ejecutar en Supabase SQL Editor.
-- =====================================================================

-- 1) Agregar valores nuevos si no existen.
do $$
begin
  if not exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'rol_usuario'
      and e.enumlabel = 'estudiante'
  ) then
    alter type public.rol_usuario add value 'estudiante';
  end if;

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

-- 2) Normalizar roles legados sin destruir ni borrar nada.
update public.perfiles
set rol = case
  when rol = 'maestro' then 'docente'
  when rol = 'docente' then 'docente'
  when rol = 'psicoorientador' then 'psicoorientador'
  when rol = 'admin' then 'admin'
  else 'estudiante'
end
where rol is not null;

-- 3) Verificación rápida.
select rol, count(*) as total
from public.perfiles
group by rol
order by rol;

-- 4) Reglas de negocio recomendadas para no romper aquello que ya funciona.
-- - estudiante: solo reporta y ve sus propios casos.
-- - docente: atiende casos asignados.
-- - psicoorientador: revisa casos sensibles y de bienestar.
-- - admin: supervisa y administra, pero no debe ser responsable directo por defecto.

-- Nota: este script no elimina ni reemplaza filas existentes. Solo añade nuevos
-- valores de rol y normaliza los antiguos a la estructura deseada.
