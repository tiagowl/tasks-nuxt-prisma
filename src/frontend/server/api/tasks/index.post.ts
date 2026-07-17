import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { capitalizeFirstWord } from '~/utils/formatters'

const createTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título deve ter no máximo 200 caracteres'),
  publishedAt: z.string().datetime().optional().nullable(),
  subtasks: z
    .array(z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição deve ter no máximo 500 caracteres'))
    .optional()
    .default([]),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = createTaskSchema.parse(body)

    const title = capitalizeFirstWord(data.title)
    const subtasks = data.subtasks
      .map((description) => capitalizeFirstWord(description))
      .filter(Boolean)

    const task = await prisma.task.create({
      data: {
        title,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        ...(subtasks.length > 0
          ? {
              subtasks: {
                create: subtasks.map((description) => ({ description })),
              },
            }
          : {}),
      },
      include: {
        subtasks: {
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: {
            subtasks: true,
          },
        },
      },
    })

    return {
      ...task,
      status: subtasks.length > 0 ? 'todo' : null,
      _count: {
        subtasks: task._count.subtasks,
        completedSubtasks: 0,
      },
    }
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
