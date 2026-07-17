import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const taskId = getRouterParam(event, 'id')

  const task = await prisma.task.findUnique({ where: { id: taskId } })
  if (!task) {
    throw createError({ statusCode: 404, statusMessage: 'Tarefa não encontrada' })
  }

  const subtasks = await prisma.subtask.findMany({
    where: { taskId },
    orderBy: { createdAt: 'asc' },
  })

  return subtasks
})
