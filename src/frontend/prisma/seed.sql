-- ============================================================
-- Script de Seed para o Sistema de Gerenciamento de Tarefas
-- Database: PostgreSQL (Neon)
-- ============================================================

-- Limpa dados existentes (respeitando chaves estrangeiras)
TRUNCATE TABLE "Subtask" CASCADE;
TRUNCATE TABLE "Task" CASCADE;

-- Reinicia sequências (se aplicável)
-- ALTER SEQUENCE "Task_id_seq" RESTART;
-- ALTER SEQUENCE "Subtask_id_seq" RESTART;

-- ============================================================
-- Tarefas
-- ============================================================

INSERT INTO "Task" (id, title, "publishedAt", "createdAt", "updatedAt") VALUES
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Implementar sistema de autenticação JWT',
  '2026-07-20 10:00:00+00',
  NOW(),
  NOW()
),
(
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'Criar CRUD de tarefas completo',
  '2026-07-22 10:00:00+00',
  NOW(),
  NOW()
),
(
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  'Desenvolver quadro Kanban',
  '2026-07-25 10:00:00+00',
  NOW(),
  NOW()
),
(
  'd4e5f6a7-b8c9-0123-defa-234567890123',
  'Implementar drawer animado para formulários',
  '2026-07-18 10:00:00+00',
  NOW(),
  NOW()
),
(
  'e5f6a7b8-c9d0-1234-efab-345678901234',
  'Configurar Neon database e Prisma',
  '2026-07-15 10:00:00+00',
  NOW(),
  NOW()
),
(
  'f6a7b8c9-d0e1-2345-fabc-456789012345',
  'Revisar e testar fluxo de subtarefas',
  '2026-07-28 10:00:00+00',
  NOW(),
  NOW()
),
(
  'a7b8c9d0-e1f2-3456-abcd-567890123456',
  'Preparar deploy em produção',
  NULL,
  NOW(),
  NOW()
),
(
  'b8c9d0e1-f2a3-4567-bcde-678901234567',
  'Corrigir bug de recálculo de status',
  '2026-07-30 14:00:00+00',
  NOW(),
  NOW()
),
(
  'c9d0e1f2-a3b4-5678-cdef-789012345678',
  'Adicionar validação de formulário no frontend',
  '2026-08-01 09:00:00+00',
  NOW(),
  NOW()
),
(
  'd0e1f2a3-b4c5-6789-defa-890123456789',
  'Refatorar componentes do Kanban',
  '2026-08-05 11:00:00+00',
  NOW(),
  NOW()
);

-- ============================================================
-- Subtarefas
-- ============================================================

INSERT INTO "Subtask" (id, "taskId", description, completed, "createdAt", "updatedAt") VALUES
-- Tarefa 1: Autenticação JWT
('s001-aaaa-bbbb-cccc-dddd-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Configurar middleware de verificação de token', true, NOW(), NOW()),
('s001-aaaa-bbbb-cccc-dddd-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Criar endpoint POST /api/auth/login', true, NOW(), NOW()),
('s001-aaaa-bbbb-cccc-dddd-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Implementar página de login no frontend', false, NOW(), NOW()),

-- Tarefa 2: CRUD de tarefas
('s002-aaaa-bbbb-cccc-dddd-000000000001', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Implementar GET /api/tasks com listagem', true, NOW(), NOW()),
('s002-aaaa-bbbb-cccc-dddd-000000000002', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Implementar POST /api/tasks para criação', true, NOW(), NOW()),
('s002-aaaa-bbbb-cccc-dddd-000000000003', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Implementar PUT /api/tasks/:id para edição', false, NOW(), NOW()),
('s002-aaaa-bbbb-cccc-dddd-000000000004', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Implementar DELETE /api/tasks/:id com cascade', false, NOW(), NOW()),
('s002-aaaa-bbbb-cccc-dddd-000000000005', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Criar componentes de formulário e listagem', false, NOW(), NOW()),

-- Tarefa 3: Quadro Kanban
('s003-aaaa-bbbb-cccc-dddd-000000000001', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'Criar componente KanbanBoard com 3 colunas', true, NOW(), NOW()),
('s003-aaaa-bbbb-cccc-dddd-000000000002', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'Implementar lógica de status automático', true, NOW(), NOW()),
('s003-aaaa-bbbb-cccc-dddd-000000000003', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'Adicionar animações de transição entre colunas', false, NOW(), NOW()),

-- Tarefa 4: Drawer animado
('s004-aaaa-bbbb-cccc-dddd-000000000001', 'd4e5f6a7-b8c9-0123-defa-234567890123', 'Criar componente TaskDrawer com transição CSS', true, NOW(), NOW()),
('s004-aaaa-bbbb-cccc-dddd-000000000002', 'd4e5f6a7-b8c9-0123-defa-234567890123', 'Implementar backdrop semi-transparente', true, NOW(), NOW()),
('s004-aaaa-bbbb-cccc-dddd-000000000003', 'd4e5f6a7-b8c9-0123-defa-234567890123', 'Adicionar suporte a formulário de criar/editar', false, NOW(), NOW()),

-- Tarefa 5: Configuração Neon + Prisma
('s005-aaaa-bbbb-cccc-dddd-000000000001', 'e5f6a7b8-c9d0-1234-efab-345678901234', 'Criar schema Prisma com modelos Task e Subtask', true, NOW(), NOW()),
('s005-aaaa-bbbb-cccc-dddd-000000000002', 'e5f6a7b8-c9d0-1234-efab-345678901234', 'Configurar conexão com Neon PostgreSQL', true, NOW(), NOW()),
('s005-aaaa-bbbb-cccc-dddd-000000000003', 'e5f6a7b8-c9d0-1234-efab-345678901234', 'Executar migrations iniciais', true, NOW(), NOW()),
('s005-aaaa-bbbb-cccc-dddd-000000000004', 'e5f6a7b8-c9d0-1234-efab-345678901234', 'Criar seed com dados de exemplo', true, NOW(), NOW()),

-- Tarefa 6: Revisão de subtarefas
('s006-aaaa-bbbb-cccc-dddd-000000000001', 'f6a7b8c9-d0e1-2345-fabc-456789012345', 'Testar marcação/desmarcação de subtarefas', true, NOW(), NOW()),
('s006-aaaa-bbbb-cccc-dddd-000000000002', 'f6a7b8c9-d0e1-2345-fabc-456789012345', 'Verificar recálculo de status da tarefa pai', false, NOW(), NOW()),
('s006-aaaa-bbbb-cccc-dddd-000000000003', 'f6a7b8c9-d0e1-2345-fabc-456789012345', 'Testar exclusão em cascata', false, NOW(), NOW()),

-- Tarefa 7: Deploy (sem subtarefas - proposital para testar null status)

-- Tarefa 8: Bug fix
('s008-aaaa-bbbb-cccc-dddd-000000000001', 'b8c9d0e1-f2a3-4567-bcde-678901234567', 'Identificar causa do recálculo incorreto', false, NOW(), NOW()),
('s008-aaaa-bbbb-cccc-dddd-000000000002', 'b8c9d0e1-f2a3-4567-bcde-678901234567', 'Implementar correção no cálculo de status', false, NOW(), NOW()),

-- Tarefa 9: Validação frontend
('s009-aaaa-bbbb-cccc-dddd-000000000001', 'c9d0e1f2-a3b4-5678-cdef-789012345678', 'Adicionar validação de título obrigatório', false, NOW(), NOW()),
('s009-aaaa-bbbb-cccc-dddd-000000000002', 'c9d0e1f2-a3b4-5678-cdef-789012345678', 'Adicionar validação de data', false, NOW(), NOW()),
('s009-aaaa-bbbb-cccc-dddd-000000000003', 'c9d0e1f2-a3b4-5678-cdef-789012345678', 'Adicionar mensagens de erro no formulário', false, NOW(), NOW()),

-- Tarefa 10: Refatoração Kanban
('s010-aaaa-bbbb-cccc-dddd-000000000001', 'd0e1f2a3-b4c5-6789-defa-890123456789', 'Extrair lógica de colunas para composable', false, NOW(), NOW()),
('s010-aaaa-bbbb-cccc-dddd-000000000002', 'd0e1f2a3-b4c5-6789-defa-890123456789', 'Melhorar desempenho com virtual scrolling', false, NOW(), NOW());

-- ============================================================
-- Verificação dos dados inseridos
-- ============================================================

SELECT '✅ Seed concluído!' AS resultado;
SELECT COUNT(*) || ' tarefas inseridas' AS total_tarefas FROM "Task";
SELECT COUNT(*) || ' subtarefas inseridas' AS total_subtarefas FROM "Subtask";
