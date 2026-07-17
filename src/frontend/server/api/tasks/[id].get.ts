import { prisma } from '~/server/utils/prisma'
import { calculateTaskStatus } from '~/server/utils/status'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      subtasks: {
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!task) {
    throw createError({ statusCode: 404, statusMessage: 'Tarefa não encontrada' })
  }

  const status = await calculateTaskStatus(task.id)

  return { ...task, status }
})
