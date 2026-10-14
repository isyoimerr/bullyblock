-- =====================================================================
-- Asignar roles al personal. Pasos:
-- 1) En Supabase > Authentication > Users > "Add user" crea la cuenta
--    (correo + clave, marcando "Auto Confirm User").
-- 2) Cambia el correo de abajo por el real y ejecuta en el SQL Editor.
-- =====================================================================

update public.perfiles
   set rol = 'admin', nombre = 'Administrador BullyBlock'
 where id = (select id from auth.users where email = 'admin@estudiante.com');

update public.perfiles
   set rol = 'psicoorientador', nombre = 'Psicoorientación'
 where id = (select id from auth.users where email = 'orientacion@estudiante.com');

update public.perfiles
   set rol = 'docente', nombre = 'Docente Demo'
 where id = (select id from auth.users where email = 'docente@estudiante.com');
