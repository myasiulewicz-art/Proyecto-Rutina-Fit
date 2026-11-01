-- ============================================================
-- Rutina Fit - base de datos para Supabase (PostgreSQL)
-- Pegar completo en: Supabase > SQL Editor > New query > Run
-- ============================================================

-- 1) TABLAS -------------------------------------------------

-- Datos de cada usuaria (el id es el mismo que el del inicio de sesión)
create table if not exists public.perfiles (
  id               uuid primary key references auth.users(id) on delete cascade,
  nombre           text,
  peso             numeric(5,1),
  objetivo         text,
  fecha_inicio     date,
  rutina_completa  boolean not null default false,
  creado_en        timestamptz not null default now()
);

-- Catálogo de ejercicios (igual para todas)
-- unidad: 'r' = repeticiones, 's' = segundos
create table if not exists public.ejercicios (
  id           text primary key,
  nombre       text not null,
  grupos       text[] not null,
  unidad       text not null check (unidad in ('r', 's')),
  series_sug   int not null default 3,
  valor_sug    int not null default 12
);

-- Días de entrenamiento de cada usuaria (dia_semana: 0 = lunes ... 6 = domingo)
create table if not exists public.dias_rutina (
  id           uuid primary key default gen_random_uuid(),
  usuaria_id   uuid not null references auth.users(id) on delete cascade,
  dia_semana   int not null check (dia_semana between 0 and 6),
  unique (usuaria_id, dia_semana)
);

-- Ejercicios cargados en cada día, con series, repeticiones (o segundos) y descanso
create table if not exists public.dia_ejercicios (
  id             uuid primary key default gen_random_uuid(),
  dia_id         uuid not null references public.dias_rutina(id) on delete cascade,
  ejercicio_id   text not null references public.ejercicios(id),
  series         int not null check (series between 1 and 10),
  valor          int not null check (valor between 1 and 300),
  descanso_seg   int not null default 60 check (descanso_seg between 0 and 300),
  orden          int not null default 0
);

-- Días de período marcados en el calendario del ciclo
create table if not exists public.ciclo (
  usuaria_id   uuid not null references auth.users(id) on delete cascade,
  fecha        date not null,
  primary key (usuaria_id, fecha)
);

-- Ejercicios tildados como hechos (semana = fecha del lunes de esa semana)
create table if not exists public.ejercicios_hechos (
  usuaria_id     uuid not null references auth.users(id) on delete cascade,
  semana         date not null,
  dia_id         uuid not null references public.dias_rutina(id) on delete cascade,
  ejercicio_id   text not null references public.ejercicios(id),
  primary key (usuaria_id, semana, dia_id, ejercicio_id)
);

create index if not exists idx_dia_ejercicios_dia on public.dia_ejercicios(dia_id);
create index if not exists idx_dias_rutina_usuaria on public.dias_rutina(usuaria_id);

-- 2) PERFIL AUTOMÁTICO AL REGISTRARSE ----------------------

create or replace function public.crear_perfil()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfiles (id, nombre)
  values (new.id, new.raw_user_meta_data ->> 'nombre')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists al_crear_usuaria on auth.users;
create trigger al_crear_usuaria
  after insert on auth.users
  for each row execute function public.crear_perfil();

-- 3) SEGURIDAD: cada usuaria ve y modifica solo lo suyo ----

alter table public.perfiles          enable row level security;
alter table public.ejercicios        enable row level security;
alter table public.dias_rutina       enable row level security;
alter table public.dia_ejercicios    enable row level security;
alter table public.ciclo             enable row level security;
alter table public.ejercicios_hechos enable row level security;

drop policy if exists "perfil propio" on public.perfiles;
create policy "perfil propio" on public.perfiles
  for all to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "catalogo visible" on public.ejercicios;
create policy "catalogo visible" on public.ejercicios
  for select to authenticated using (true);

drop policy if exists "dias propios" on public.dias_rutina;
create policy "dias propios" on public.dias_rutina
  for all to authenticated
  using (auth.uid() = usuaria_id) with check (auth.uid() = usuaria_id);

drop policy if exists "ejercicios del dia propios" on public.dia_ejercicios;
create policy "ejercicios del dia propios" on public.dia_ejercicios
  for all to authenticated
  using (exists (select 1 from public.dias_rutina d where d.id = dia_id and d.usuaria_id = auth.uid()))
  with check (exists (select 1 from public.dias_rutina d where d.id = dia_id and d.usuaria_id = auth.uid()));

drop policy if exists "ciclo propio" on public.ciclo;
create policy "ciclo propio" on public.ciclo
  for all to authenticated
  using (auth.uid() = usuaria_id) with check (auth.uid() = usuaria_id);

drop policy if exists "hechos propios" on public.ejercicios_hechos;
create policy "hechos propios" on public.ejercicios_hechos
  for all to authenticated
  using (auth.uid() = usuaria_id) with check (auth.uid() = usuaria_id);

-- 4) CATÁLOGO DE EJERCICIOS ---------------------------------

insert into public.ejercicios (id, nombre, grupos, unidad, series_sug, valor_sug) values
  ('sentadilla',            'Sentadilla',              '{Piernas}',            'r', 4, 12),
  ('sentadilla-sumo',       'Sentadilla sumo',         '{Piernas,Glúteos}',    'r', 4, 12),
  ('hip-thrust',            'Hip thrust',              '{Glúteos}',            'r', 4, 12),
  ('step-up',               'Step up',                 '{Piernas,Glúteos}',    'r', 3, 12),
  ('abdominales-bicicleta', 'Abdominales bicicleta',   '{Abdomen}',            'r', 3, 20),
  ('remo-mancuerna',        'Remo con mancuerna',      '{Brazos,Espalda}',     'r', 4, 12),
  ('puente-gluteos',        'Puente de glúteos',       '{Glúteos}',            'r', 4, 15),
  ('zancadas',              'Zancadas',                '{Piernas}',            'r', 3, 12),
  ('zancadas-caminando',    'Zancadas caminando',      '{Piernas}',            'r', 3, 12),
  ('peso-muerto-rumano',    'Peso muerto rumano',      '{Piernas,Glúteos}',    'r', 3, 10),
  ('peso-muerto',           'Peso muerto',             '{Piernas,Espalda}',    'r', 3, 10),
  ('patada-gluteo',         'Patada de glúteo',        '{Glúteos}',            'r', 3, 15),
  ('abductores',            'Abductores',              '{Glúteos}',            'r', 3, 15),
  ('elevacion-gemelos',     'Elevación de gemelos',    '{Piernas}',            'r', 3, 20),
  ('plancha',               'Plancha',                 '{Abdomen}',            's', 3, 30),
  ('plancha-lateral',       'Plancha lateral',         '{Abdomen}',            's', 3, 20),
  ('abdominales-crunch',    'Abdominales crunch',      '{Abdomen}',            'r', 3, 15),
  ('elevacion-piernas',     'Elevación de piernas',    '{Abdomen}',            'r', 3, 12),
  ('press-hombros',         'Press de hombros',        '{Brazos}',             'r', 3, 12),
  ('curl-biceps',           'Curl de bíceps',          '{Brazos}',             'r', 3, 12),
  ('triceps-banco',         'Tríceps en banco',        '{Brazos}',             'r', 3, 12),
  ('flexiones-rodillas',    'Flexiones con rodillas',  '{Brazos}',             'r', 3, 10),
  ('superman',              'Superman',                '{Espalda}',            'r', 3, 12),
  ('saltos-tijera',         'Saltos de tijera',        '{Cardio}',             's', 3, 40),
  ('rodillas-altas',        'Rodillas altas',          '{Cardio}',             's', 3, 30)
on conflict (id) do nothing;
