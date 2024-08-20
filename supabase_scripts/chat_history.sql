create table chat_history (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone not null default now(),
  user_id uuid references auth.users on delete cascade not null default auth.uid(),
  chat_id bigint references public.chats on delete cascade not null,
  role text not null,
  message text not null
);

alter table chat_history enable row level security;

revoke all on table chat_history from authenticated;
revoke all on table chat_history from anon;

grant all (role, message, chat_id) on table chat_history to authenticated;
grant select (id) on table chat_history to authenticated;
grant delete on table chat_history to authenticated;

create policy "Users can access previous chat histories"
on chat_history
for all
to authenticated
using ((select auth.uid()) = user_id);

grant all (chat_id) on table chat_history to authenticated;