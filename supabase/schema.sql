-- Run once in Supabase SQL Editor, then run seed.sql.
begin;
create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;
create policy "Admins can read their own membership" on public.admin_users
  for select to authenticated using (user_id = (select auth.uid()));

create function public.is_admin() returns boolean
  language sql stable security definer set search_path = ''
  as $$ select exists (select 1 from public.admin_users where user_id = (select auth.uid())); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table public.site_content (
  id integer primary key check (id = 1),
  data jsonb not null check (
    jsonb_typeof(data->'sections') = 'array' and
    jsonb_typeof(data->'photos') = 'array' and
    data ? 'sections' and data ? 'photos'
  ),
  revision integer not null default 1,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
revoke all on public.site_content from anon, authenticated;
grant select on public.site_content to anon, authenticated;
grant update (data, revision) on public.site_content to authenticated;
revoke insert, delete on public.site_content from anon, authenticated;
revoke update on public.site_content from anon;
create policy "Anyone can read published content" on public.site_content
  for select to anon, authenticated using (true);
create policy "Only assigned admins can publish" on public.site_content
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create function public.check_content_revision() returns trigger
  language plpgsql set search_path = '' as $$
  begin
    if new.revision <> old.revision + 1 then
      raise exception 'Revision must increase by one';
    end if;
    new.updated_at = now();
    return new;
  end; $$;
create trigger check_content_revision before update on public.site_content
  for each row execute function public.check_content_revision();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gallery', 'gallery', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
create policy "Admins read gallery files" on storage.objects for select to authenticated
  using (bucket_id = 'gallery' and public.is_admin());
create policy "Admins upload gallery files" on storage.objects for insert to authenticated
  with check (bucket_id = 'gallery' and public.is_admin());
create policy "Admins delete gallery files" on storage.objects for delete to authenticated
  using (bucket_id = 'gallery' and public.is_admin());

commit;
