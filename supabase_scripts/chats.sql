create table chats (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone not null default now(),
  user_id uuid references auth.users on delete cascade not null default auth.uid()
);

alter table chats enable row level security;

revoke all on table chats from authenticated;
revoke all on table chats from anon;

grant all on table chats to authenticated;
grant select (id) on table chats to authenticated;
grant delete on table chats to authenticated;

create policy "Users can access previous chats"
on chats
for all
to authenticated
using ((select auth.uid()) = user_id);