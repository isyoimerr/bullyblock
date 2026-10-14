-- =====================================================================
-- Datos de DEMOSTRACIÓN (ficticios). Opcional: solo para mostrar el panel.
-- 1) Registra un estudiante desde la app (por ejemplo demo@estudiante.com).
-- 2) Cambia el correo de abajo y ejecuta en el SQL Editor.
-- No usar en producción real.
-- =====================================================================
do $$
declare v_id uuid;
begin
  select id into v_id from auth.users where email = 'demo@estudiante.com';
  if v_id is null then raise exception 'Primero registra el estudiante demo@estudiante.com'; end if;

  insert into public.reportes (reportante_id, tipo, descripcion, lugar, fecha_hecho, urgente) values
    (v_id, 'fisica',     'DEMO: En el patio un compañero me empujó varias veces durante el descanso.', 'patio', current_date, true),
    (v_id, 'ciberacoso', 'DEMO: Me están enviando mensajes ofensivos por un grupo de WhatsApp del curso.', 'redes', current_date - 1, false),
    (v_id, 'verbal',     'DEMO: Me ponen apodos que me hacen sentir mal todos los días en el salón.', 'salon', current_date - 2, false),
    (v_id, 'exclusion',  'DEMO: Me dejan solo en los trabajos en grupo y no me dejan sentarme con ellos.', 'salon', current_date - 3, false),
    (v_id, 'objetos',    'DEMO: Escondieron mi maleta y rayaron mi cuaderno de matemáticas.', 'salon', current_date - 4, false);

  update public.reportes set estado = 'en_revision'
   where descripcion like 'DEMO: Me están enviando%';
  update public.reportes set estado = 'en_atencion'
   where descripcion like 'DEMO: Me ponen apodos%';
  update public.reportes set estado = 'cerrado'
   where descripcion like 'DEMO: Escondieron%';
end $$;
