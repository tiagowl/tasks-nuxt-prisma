import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { c as calculateTaskStatus } from '../../../_/status.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const _id__delete = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const subtask = await prisma.subtask.findUnique({ where: { id } });
  if (!subtask) {
    throw createError({ statusCode: 404, statusMessage: "Subtarefa n\xE3o encontrada" });
  }
  const taskId = subtask.taskId;
  await prisma.subtask.delete({ where: { id } });
  const taskStatus = await calculateTaskStatus(taskId);
  return { message: "Subtarefa exclu\xEDda com sucesso", taskStatus };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
