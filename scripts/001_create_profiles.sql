-- Create profiles table for user data
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies for profiles table
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can delete their own profile"
  on public.profiles for delete
  using (auth.uid() = id);

-- Create messages table for anonymous chat
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  room_id text not null,
  content text not null,
  is_encrypted boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.messages enable row level security;

-- Policies for messages table
create policy "Users can view messages in rooms they're in"
  on public.messages for select
  using (true);

create policy "Users can insert their own messages"
  on public.messages for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own messages"
  on public.messages for delete
  using (auth.uid() = user_id);

-- Create rooms table for chat communities
create table if not exists public.rooms (
  id text primary key,
  name text not null,
  description text,
  is_private boolean default false,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.rooms enable row level security;

-- Policies for rooms table
create policy "Anyone can view public rooms"
  on public.rooms for select
  using (is_private = false or created_by = auth.uid());

create policy "Users can create rooms"
  on public.rooms for insert
  with check (auth.uid() = created_by);

create policy "Room creators can update their rooms"
  on public.rooms for update
  using (auth.uid() = created_by);

-- Create indexes for better performance
create index if not exists messages_room_id_idx on public.messages(room_id);
create index if not exists messages_user_id_idx on public.messages(user_id);
create index if not exists messages_created_at_idx on public.messages(created_at);
