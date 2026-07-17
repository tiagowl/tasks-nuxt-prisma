import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { calculateTaskStatus } from '~/server/utils/status'
import { capitalizeFirstWord } from '~/utils/formatters'

const updateSubtaskSchema = z.object({
  completed: z.boolean().optional(),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional(),
}).refine(
  (data) => data.completed !== undefined || data.description !== undefined,
  { message: 'Informe completed e/ou description' },
)

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const data = updateSubtaskSchema.parse(body)

    const subtask = await prisma.subtask.findUnique({ where: { id } })
    if (!subtask) {
      throw createError({ statusCode: 404, statusMessage: 'Subtarefa não encontrada' })
    }

    const updated = await prisma.subtask.update({
      where: { id },
      data: {
        ...(data.completed !== undefined ? { completed: data.completed } : {}),
        ...(data.description !== undefined
          ? { description: capitalizeFirstWord(data.description) }
          : {}),
      },
    })

    const taskStatus = await calculateTaskStatus(subtask.taskId)

    return { subtask: updated, taskStatus }
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
