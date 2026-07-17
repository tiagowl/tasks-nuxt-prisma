import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { calculateTaskStatus } from '~/server/utils/status'
import { capitalizeFirstWord } from '~/utils/formatters'

const createSubtaskSchema = z.object({
  taskId: z.string().uuid('ID da tarefa inválido'),
  description: z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição deve ter no máximo 500 caracteres'),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = createSubtaskSchema.parse(body)

    const task = await prisma.task.findUnique({ where: { id: data.taskId } })
    if (!task) {
      throw createError({ statusCode: 404, statusMessage: 'Tarefa não encontrada' })
    }

    const subtask = await prisma.subtask.create({
      data: {
        taskId: data.taskId,
        description: capitalizeFirstWord(data.description),
      },
    })

    const taskStatus = await calculateTaskStatus(data.taskId)

    return { subtask, taskStatus }
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
