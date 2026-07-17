import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../../_/nitro.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const subtasks_get = defineEventHandler(async (event) => {
  const taskId = getRouterParam(event, "id");
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) {
    throw createError({ statusCode: 404, statusMessage: "Tarefa n\xE3o encontrada" });
  }
  const subtasks = await prisma.subtask.findMany({
    where: { taskId },
    orderBy: { createdAt: "asc" }
  });
  return subtasks;
});

export { subtasks_get as default };
//# sourceMappingURL=subtasks.get.mjs.map
