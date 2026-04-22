-- Supabase 建表与权限 · 在 Supabase Dashboard → SQL Editor 粘贴后运行即可

-- 1. 发布的简历快照表
create table if not exists public.resumes (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now()
);

-- 2. 开启行级安全（RLS）
alter table public.resumes enable row level security;

-- 3. 任何人都可以用 id 读取已发布的简历（分享链接的核心）
drop policy if exists "public can read resumes" on public.resumes;
create policy "public can read resumes"
  on public.resumes
  for select
  using (true);

-- 4. MVP 阶段：任何人都可以插入（无登录）。
--    接入登录后把 with check 改成 (auth.uid() = owner_id) 并补 owner_id 字段。
drop policy if exists "public can insert resumes" on public.resumes;
create policy "public can insert resumes"
  on public.resumes
  for insert
  with check (true);

-- 5. 辅助索引：按时间倒序查询最近的发布（未来做管理后台时用得到）
create index if not exists resumes_created_at_idx
  on public.resumes (created_at desc);
