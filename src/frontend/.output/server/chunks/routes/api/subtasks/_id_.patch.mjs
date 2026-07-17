import { c as defineEventHandler, g as getRouterParam, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { z } from 'zod';
import { p as prisma } from '../../../_/prisma.mjs';
import { c as calculateTaskStatus } from '../../../_/status.mjs';
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

const updateSubtaskSchema = z.object({
  completed: z.boolean().optional(),
  description: z.string().min(1, "Descri\xE7\xE3o \xE9 obrigat\xF3ria").max(500, "Descri\xE7\xE3o deve ter no m\xE1ximo 500 caracteres").optional()
}).refine(
  (data) => data.completed !== void 0 || data.description !== void 0,
  { message: "Informe completed e/ou description" }
);
const _id__patch = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const data = updateSubtaskSchema.parse(body);
    const subtask = await prisma.subtask.findUnique({ where: { id } });
    if (!subtask) {
      throw createError({ statusCode: 404, statusMessage: "Subtarefa n\xE3o encontrada" });
    }
    const updated = await prisma.subtask.update({
      where: { id },
      data: {
        ...data.completed !== void 0 ? { completed: data.completed } : {},
        ...data.description !== void 0 ? { description: capitalizeFirstWord(data.description) } : {}
      }
    });
    const taskStatus = await calculateTaskStatus(subtask.taskId);
    return { subtask: updated, taskStatus };
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

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
