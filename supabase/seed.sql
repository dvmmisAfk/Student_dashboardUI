-- ============================================================
-- LearnFlow AI OS — seed data
-- ============================================================
-- Run AFTER the migration. Safe to re-run (uses ON CONFLICT DO NOTHING).
-- ============================================================

insert into public.courses (id, title, progress, icon_name, color_scheme, created_at)
values
  (
    'a1b2c3d4-0001-0000-0000-000000000001',
    'Advanced Neural Architectures',
    72,
    'Brain',
    'blue',
    now() - interval '2 days'
  ),
  (
    'a1b2c3d4-0002-0000-0000-000000000002',
    'Rust Systems Programming',
    45,
    'Cpu',
    'purple',
    now() - interval '5 days'
  ),
  (
    'a1b2c3d4-0003-0000-0000-000000000003',
    'Distributed Systems Engineering',
    88,
    'Network',
    'cyan',
    now() - interval '1 day'
  ),
  (
    'a1b2c3d4-0004-0000-0000-000000000004',
    'Quantum Computing Foundations',
    31,
    'Atom',
    'green',
    now() - interval '8 days'
  )
on conflict (id) do nothing;
