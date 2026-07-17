import { c as defineEventHandler, g as getRouterParam, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { z } from 'zod';
import { p as prisma } from '../../../_/prisma.mjs';
import { c as capitalizeFirstWord } from '../../../_/formatters.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const updateTaskSchema = z.object({
  title: z.string().min(1, "T\xEDtulo \xE9 obrigat\xF3rio").max(200, "T\xEDtulo deve ter no m\xE1ximo 200 caracteres"),
  publishedAt: z.string().datetime().optional().nullable()
});
const _id__put = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const data = updateTaskSchema.parse(body);
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: "Tarefa n\xE3o encontrada" });
    }
    const task = await prisma.task.update({
      where: { id },
      data: {
        title: capitalizeFirstWord(data.title),
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null
      }
    });
    return task;
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

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
