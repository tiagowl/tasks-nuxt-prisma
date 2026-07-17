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

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      subtasks: {
        orderBy: { createdAt: "asc" }
      }
    }
  });
  if (!task) {
    throw createError({ statusCode: 404, statusMessage: "Tarefa n\xE3o encontrada" });
  }
  const status = await calculateTaskStatus(task.id);
  return { ...task, status };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
