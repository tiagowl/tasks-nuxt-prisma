import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { capitalizeFirstWord } from '~/utils/formatters'

const updateTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título deve ter no máximo 200 caracteres'),
  publishedAt: z.string().datetime().optional().nullable(),
})

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const data = updateTaskSchema.parse(body)

    const existing = await prisma.task.findUnique({ where: { id } })
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Tarefa não encontrada' })
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        title: capitalizeFirstWord(data.title),
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      },
    })

    return task
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Error',
        data: error.errors,
      })
    }
    throw error
  }
})
