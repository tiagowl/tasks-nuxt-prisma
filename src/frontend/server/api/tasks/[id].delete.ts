import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const existing = await prisma.task.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Tarefa não encontrada' })
  }

  await prisma.task.delete({ where: { id } })

  return { message: 'Tarefa excluída com sucesso' }
})
