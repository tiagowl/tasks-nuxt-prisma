import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  await prisma.subtask.deleteMany()
  await prisma.task.deleteMany()

  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Implementar sistema de autenticação JWT',
        publishedAt: new Date('2026-07-20'),
        subtasks: {
          create: [
            { description: 'Configurar middleware de verificação de token' },
            { description: 'Criar endpoint POST /api/auth/login' },
            { description: 'Implementar página de login no frontend' },
          ],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: 'Criar CRUD de tarefas completo',
        publishedAt: new Date('2026-07-22'),
        subtasks: {
          create: [
            { description: 'Implementar GET /api/tasks com listagem' },
            { description: 'Implementar POST /api/tasks para criação' },
            { description: 'Implementar PUT /api/tasks/:id para edição' },
            { description: 'Implementar DELETE /api/tasks/:id com cascade' },
            { description: 'Criar componentes de formulário e listagem' },
          ],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: 'Desenvolver quadro Kanban',
        publishedAt: new Date('2026-07-25'),
        subtasks: {
          create: [
            { description: 'Criar componente KanbanBoard com 3 colunas' },
            { description: 'Implementar lógica de status automático' },
            { description: 'Adicionar animações de transição entre colunas' },
          ],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: 'Implementar drawer animado para formulários',
        publishedAt: new Date('2026-07-18'),
        subtasks: {
          create: [
            { description: 'Criar componente TaskDrawer com transição CSS' },
            { description: 'Implementar backdrop semi-transparente' },
            { description: 'Adicionar suporte a formulário de criar/editar' },
          ],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: 'Configurar Neon database e Prisma',
        publishedAt: new Date('2026-07-15'),
        subtasks: {
          create: [
            { description: 'Criar schema Prisma com modelos Task e Subtask' },
            { description: 'Configurar conexão com Neon PostgreSQL' },
            { description: 'Executar migrations iniciais' },
            { description: 'Criar seed com dados de exemplo' },
          ],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: 'Revisar e testar fluxo de subtarefas',
        publishedAt: new Date('2026-07-28'),
        subtasks: {
          create: [
            { description: 'Testar marcação/desmarcação de subtarefas' },
            { description: 'Verificar recálculo de status da tarefa pai' },
            { description: 'Testar exclusão em cascata' },
          ],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: 'Preparar deploy em produção',
        publishedAt: null,
      },
    }),
  ])

  console.log(`Created ${tasks.length} tasks with subtasks`)
  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
