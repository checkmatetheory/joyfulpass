-- Joyful web accounts, subscriptions, practice history and leads.
-- Run in the Supabase SQL editor (or `supabase db push`). Auth users live in
-- auth.users (magic-link sign-in); everything here hangs off that id.

-- Subscriptions: written ONLY by the Stripe webhook (service role).
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  app_slug text not null,
  stripe_customer_id text not null,
  stripe_subscription_id text not null unique,
  status text not null,
  price_lookup_key text,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists subscriptions_user_app_idx on public.subscriptions (user_id, app_slug);
create index if not exists subscriptions_customer_idx on public.subscriptions (stripe_customer_id);

alter table public.subscriptions enable row level security;
create policy "Users read their own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);
-- No insert/update/delete policies: only the service role (webhook) writes.

-- One row per finished practice/mock attempt.
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  app_slug text not null,
  set_id text not null,
  kind text not null check (kind in ('practice', 'topic', 'mock')),
  question_count int not null,
  correct_count int not null,
  passed boolean not null,
  duration_seconds int,
  created_at timestamptz not null default now()
);
create index if not exists quiz_attempts_user_app_idx on public.quiz_attempts (user_id, app_slug, created_at desc);

-- Every answer, so the mistakes page can rebuild a user's weak spots.
create table if not exists public.question_responses (
  id bigint generated always as identity primary key,
  attempt_id uuid not null references public.quiz_attempts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  app_slug text not null,
  question_id text not null,
  correct boolean not null,
  created_at timestamptz not null default now()
);
create index if not exists question_responses_user_app_idx on public.question_responses (user_id, app_slug, question_id);

alter table public.quiz_attempts enable row level security;
alter table public.question_responses enable row level security;
create policy "Users manage their own attempts"
  on public.quiz_attempts for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage their own responses"
  on public.question_responses for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Email leads (free cheat sheet / score emails). Written by the server only.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  app_slug text,
  source text not null,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now(),
  unique (email, app_slug)
);
alter table public.leads enable row level security;
-- No policies: only the service role reads/writes leads.
