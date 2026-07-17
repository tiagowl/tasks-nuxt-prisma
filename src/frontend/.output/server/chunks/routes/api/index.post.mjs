import { c as defineEventHandler, r as readBody, e as createError } from '../../_/nitro.mjs';
import { z } from 'zod';
import { p as prisma } from '../../_/prisma.mjs';
import { c as calculateTaskStatus } from '../../_/status.mjs';
import { c as capitalizeFirstWord } from '../../_/formatters.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const createSubtaskSchema = z.object({
  taskId: z.string().uuid("ID da tarefa inv\xE1lido"),
  description: z.string().min(1, "Descri\xE7\xE3o \xE9 obrigat\xF3ria").max(500, "Descri\xE7\xE3o deve ter no m\xE1ximo 500 caracteres")
});
const index_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const data = createSubtaskSchema.parse(body);
    const task = await prisma.task.findUnique({ where: { id: data.taskId } });
    if (!task) {
      throw createError({ statusCode: 404, statusMessage: "Tarefa n\xE3o encontrada" });
    }
    const subtask = await prisma.subtask.create({
      data: {
        taskId: data.taskId,
        description: capitalizeFirstWord(data.description)
      }
    });
    const taskStatus = await calculateTaskStatus(data.taskId);
    return { subtask, taskStatus };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation Error",
        data: error.errors
      });
    }
    throw error;
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
