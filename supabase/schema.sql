-- Bio Ahwa Care Queue — Supabase schema
-- Run this in Supabase SQL Editor

create extension if not exists "pgcrypto";

-- Clinics
create table clinics (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city text not null,
  address text,
  phone text,
  created_at timestamptz default now()
);

-- Users (staff)
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  clinic_id uuid references clinics(id),
  role text not null check (role in ('admin', 'secretary', 'doctor', 'lab')),
  full_name text,
  created_at timestamptz default now()
);

-- Patients
create table patients (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references clinics(id),
  full_name text not null,
  phone text,
  created_at timestamptz default now()
);

-- Queues (one per day per clinic)
create table queues (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references clinics(id),
  date date not null default current_date,
  is_open boolean default true,
  created_at timestamptz default now(),
  unique(clinic_id, date)
);

-- Queue entries
create table queue_entries (
  id uuid primary key default gen_random_uuid(),
  queue_id uuid references queues(id) on delete cascade,
  clinic_id uuid references clinics(id),
  patient_name text not null,
  phone text,
  reason text,
  status text not null default 'waiting'
    check (status in ('waiting','called','in_consultation','lab_processing','results_ready','completed','absent','cancelled')),
  ticket_number int not null,
  tracking_id text unique not null,
  qr_token text unique not null default encode(gen_random_bytes(12), 'hex'),
  doctor_id uuid,
  entered_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Doctors
create table doctors (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references clinics(id),
  user_id uuid references users(id),
  full_name text not null,
  specialty text,
  is_active boolean default true
);

-- Lab results
create table lab_results (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references clinics(id),
  queue_entry_id uuid references queue_entries(id),
  tracking_id text unique not null,
  patient_name text not null,
  test_name text not null,
  status text not null default 'pending'
    check (status in ('pending','processing','ready')),
  result_summary text,
  doctor text,
  requested_at timestamptz default now(),
  ready_at timestamptz
);

-- Notifications log
create table notifications (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references clinics(id),
  queue_entry_id uuid references queue_entries(id),
  channel text check (channel in ('whatsapp','sms','print')),
  sent_at timestamptz default now()
);

-- Audit logs
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references clinics(id),
  user_id uuid,
  action text not null,
  table_name text,
  record_id uuid,
  payload jsonb,
  created_at timestamptz default now()
);

-- RLS
alter table clinics enable row level security;
alter table users enable row level security;
alter table patients enable row level security;
alter table queues enable row level security;
alter table queue_entries enable row level security;
alter table doctors enable row level security;
alter table lab_results enable row level security;
alter table notifications enable row level security;
alter table audit_logs enable row level security;

-- Policies (staff sees their clinic only)
create policy "clinic staff read" on queue_entries
  for select using (
    clinic_id in (
      select clinic_id from users where id = auth.uid()
    )
  );

create policy "clinic staff insert" on queue_entries
  for insert with check (
    clinic_id in (
      select clinic_id from users where id = auth.uid()
    )
  );

create policy "clinic staff update" on queue_entries
  for update using (
    clinic_id in (
      select clinic_id from users where id = auth.uid()
    )
  );

-- Public read for lab results (by tracking_id, no auth needed)
create policy "public lab results read" on lab_results
  for select using (true);

-- Realtime
alter publication supabase_realtime add table queue_entries;
alter publication supabase_realtime add table lab_results;
