import { prisma } from '~/server/utils/prisma'
import { calculateTaskStatus } from '~/server/utils/status'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const subtask = await prisma.subtask.findUnique({ where: { id } })
  if (!subtask) {
    throw createError({ statusCode: 404, statusMessage: 'Subtarefa não encontrada' })
  }

  const taskId = subtask.taskId
  await prisma.subtask.delete({ where: { id } })

  const taskStatus = await calculateTaskStatus(taskId)

  return { message: 'Subtarefa excluída com sucesso', taskStatus }
})
