create table public.lead_submissions (
  id uuid primary key default gen_random_uuid(),
  destination text not null,
  group_size text not null,
  priority text not null,
  contact text not null,
  created_at timestamp with time zone default now() not null,
  status text default 'new' not null,
  notes text
);

create index idx_lead_submissions_created_at on public.lead_submissions(created_at desc);

create index idx_lead_submissions_status on public.lead_submissions(status);