-- =====================================================================
-- BullyBlock · esquema de base de datos (Supabase / PostgreSQL)
-- Ejecutar UNA sola vez en: Supabase > SQL Editor > New query > Run
-- =====================================================================

create extension if not exists pgcrypto;

-- Mantener compatibilidad con cuentas antiguas: el sistema actual usa solo estudiante y maestro,
-- pero al migrar datos legados se normalizan los roles del personal a 'maestro'.
create type public.rol_usuario as enum ('estudiante', 'maestro');
create type public.estado_caso as enum ('nuevo', 'en_revision', 'en_atencion', 'cerrado');

-- ---------------------------------------------------------------------
-- Tablas
-- ---------------------------------------------------------------------
create table public.perfiles (
  id uuid primary key references auth.users on delete cascade,
  nombre text not null,
  documento text,
  grado smallint check (grado between 6 and 11),
  grupo text,
  rol public.rol_usuario not null default 'estudiante',
  activo boolean not null default true,
  aprobado boolean not null default true,
  creado_en timestamptz not null default now()
);

create table public.configuracion (
  clave text primary key,
  valor text not null
);

insert into public.configuracion (clave, valor) values
  ('MODO_REPORTE', 'identificado'),
  ('VALIDAR_ESTUDIANTES', 'false'),
  ('PLAZO_HORAS', '48');

create sequence public.reportes_seq;

create table public.reportes (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null default 'pendiente',
  reportante_id uuid not null references public.perfiles (id),
  tipo text not null check (tipo in ('fisica','verbal','exclusion','ciberacoso','objetos','otra')),
  descripcion text not null check (char_length(descripcion) between 20 and 2000),
  lugar text,
  fecha_hecho date,
  involucrados text check (char_length(involucrados) <= 1000),
  urgente boolean not null default false,
  prioridad text not null default 'normal' check (prioridad in ('normal','alta','urgente')),
  estado public.estado_caso not null default 'nuevo',
  asignado_a uuid references public.perfiles (id),
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);
create index on public.reportes (reportante_id);
create index on public.reportes (estado, creado_en desc);

create table public.mensajes (
  id uuid primary key default gen_random_uuid(),
  reporte_id uuid not null references public.reportes (id) on delete cascade,
  autor_id uuid not null references public.perfiles (id),
  autor_rol public.rol_usuario not null default 'estudiante',
  texto text not null check (char_length(texto) between 1 and 2000),
  creado_en timestamptz not null default now()
);
create index on public.mensajes (reporte_id, creado_en);

create table public.notas_internas (
  id uuid primary key default gen_random_uuid(),
  reporte_id uuid not null references public.reportes (id) on delete cascade,
  autor_id uuid not null references public.perfiles (id),
  texto text not null check (char_length(texto) between 1 and 4000),
  creado_en timestamptz not null default now()
);
create index on public.notas_internas (reporte_id, creado_en);

create table public.auditoria (
  id bigint generated always as identity primary key,
  usuario_id uuid references public.perfiles (id),
  accion text not null,
  reporte_id uuid,
  detalle jsonb,
  creado_en timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Funciones auxiliares de permisos
-- ---------------------------------------------------------------------
create or replace function public.es_personal() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from perfiles
                 where id = auth.uid() and activo and rol = 'maestro');
$$;

create or replace function public.es_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from perfiles where id = auth.uid() and activo and rol = 'maestro');
$$;

create or replace function public.es_aprobado() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from perfiles where id = auth.uid() and activo and aprobado);
$$;

-- ---------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------

-- Al registrarse en Auth se crea el perfil. El rol SIEMPRE es estudiante.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare validar boolean;
begin
  select coalesce((select valor = 'true' from configuracion where clave = 'VALIDAR_ESTUDIANTES'), false)
    into validar;
  insert into perfiles (id, nombre, documento, grado, grupo, rol, aprobado)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'nombre'), ''), 'Sin nombre'),
    nullif(new.raw_user_meta_data ->> 'documento', ''),
    nullif(new.raw_user_meta_data ->> 'grado', '')::smallint,
    nullif(new.raw_user_meta_data ->> 'grupo', ''),
    'estudiante',
    not validar
  );
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

-- Solo un usuario maestro puede cambiar rol, activo y aprobado (desde el SQL Editor sí se permite).
create or replace function public.perfiles_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.es_admin() then
    new.id := old.id;
    new.rol := old.rol;
    new.activo := old.activo;
    new.aprobado := old.aprobado;
  end if;
  return new;
end $$;

create trigger perfiles_guard_trg
  before update on public.perfiles for each row execute function public.perfiles_guard();

-- Reportes: código, límite de envíos y valores iniciales controlados por el servidor.
create or replace function public.reportes_before_insert() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and (
    select count(*) from reportes
    where reportante_id = new.reportante_id and creado_en > now() - interval '1 hour'
  ) >= 5 then
    raise exception 'Has enviado muchos reportes seguidos. Intenta de nuevo en un rato.';
  end if;
  new.codigo := 'BB-' || extract(year from now())::int || '-' || lpad(nextval('reportes_seq')::text, 4, '0');
  new.estado := 'nuevo';
  new.asignado_a := null;
  new.prioridad := case when new.urgente then 'urgente' else 'normal' end;
  new.creado_en := now();
  new.actualizado_en := now();
  return new;
end $$;

create trigger reportes_before_insert_trg
  before insert on public.reportes for each row execute function public.reportes_before_insert();

create or replace function public.reportes_before_update() returns trigger
language plpgsql as $$
begin
  new.actualizado_en := now();
  new.codigo := old.codigo;
  new.reportante_id := old.reportante_id;
  new.descripcion := old.descripcion;
  return new;
end $$;

create trigger reportes_before_update_trg
  before update on public.reportes for each row execute function public.reportes_before_update();

create or replace function public.reportes_after_update() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.estado is distinct from old.estado then
    insert into auditoria (usuario_id, accion, reporte_id, detalle)
    values (auth.uid(), 'cambiar_estado', new.id, jsonb_build_object('de', old.estado, 'a', new.estado));
  end if;
  if new.asignado_a is distinct from old.asignado_a then
    insert into auditoria (usuario_id, accion, reporte_id, detalle)
    values (auth.uid(), 'asignar', new.id, jsonb_build_object('a', new.asignado_a));
  end if;
  if new.prioridad is distinct from old.prioridad then
    insert into auditoria (usuario_id, accion, reporte_id, detalle)
    values (auth.uid(), 'cambiar_prioridad', new.id, jsonb_build_object('de', old.prioridad, 'a', new.prioridad));
  end if;
  return new;
end $$;

create trigger reportes_after_update_trg
  after update on public.reportes for each row execute function public.reportes_after_update();

-- Mensajes: el servidor fija el autor y su rol (el cliente no puede falsificarlos).
create or replace function public.mensajes_before_insert() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null then new.autor_id := auth.uid(); end if;
  select rol into new.autor_rol from perfiles where id = new.autor_id;
  return new;
end $$;

create trigger mensajes_before_insert_trg
  before insert on public.mensajes for each row execute function public.mensajes_before_insert();

-- Registro de auditoría al abrir un caso (lo llama el panel).
create or replace function public.registrar_vista(p_reporte uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if public.es_personal() then
    insert into auditoria (usuario_id, accion, reporte_id) values (auth.uid(), 'ver', p_reporte);
  end if;
end $$;

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table public.perfiles       enable row level security;
alter table public.configuracion  enable row level security;
alter table public.reportes       enable row level security;
alter table public.mensajes       enable row level security;
alter table public.notas_internas enable row level security;
alter table public.auditoria      enable row level security;

-- perfiles
create policy perfiles_select on public.perfiles for select to authenticated
  using (id = auth.uid() or public.es_personal());
create policy perfiles_update on public.perfiles for update to authenticated
  using (id = auth.uid() or public.es_admin())
  with check (id = auth.uid() or public.es_admin());

-- configuracion (lectura general, escritura solo admin)
create policy config_select on public.configuracion for select using (true);
create policy config_insert on public.configuracion for insert to authenticated with check (public.es_admin());
create policy config_update on public.configuracion for update to authenticated
  using (public.es_admin()) with check (public.es_admin());
create policy config_delete on public.configuracion for delete to authenticated using (public.es_admin());

-- reportes
create policy reportes_select on public.reportes for select to authenticated
  using (reportante_id = auth.uid() or public.es_personal());
create policy reportes_insert on public.reportes for insert to authenticated
  with check (reportante_id = auth.uid() and public.es_aprobado());
create policy reportes_update on public.reportes for update to authenticated
  using (public.es_personal()) with check (public.es_personal());

-- mensajes
create policy mensajes_select on public.mensajes for select to authenticated
  using (exists (select 1 from public.reportes r
                 where r.id = reporte_id and (r.reportante_id = auth.uid() or public.es_personal())));
create policy mensajes_insert on public.mensajes for insert to authenticated
  with check (autor_id = auth.uid() and public.es_aprobado()
              and exists (select 1 from public.reportes r
                          where r.id = reporte_id and (r.reportante_id = auth.uid() or public.es_personal())));

-- notas internas: SOLO personal
create policy notas_select on public.notas_internas for select to authenticated using (public.es_personal());
create policy notas_insert on public.notas_internas for insert to authenticated
  with check (public.es_personal() and autor_id = auth.uid());

-- auditoría: solo admin lee; escriben únicamente los triggers
create policy auditoria_select on public.auditoria for select to authenticated using (public.es_admin());

-- El rol anónimo no necesita acceso a nada salvo leer la configuración.
revoke all on public.perfiles, public.reportes, public.mensajes, public.notas_internas, public.auditoria from anon;
revoke execute on function public.registrar_vista(uuid) from anon;
