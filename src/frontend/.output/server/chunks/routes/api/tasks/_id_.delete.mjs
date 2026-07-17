import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
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
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Tarefa n\xE3o encontrada" });
  }
  await prisma.task.delete({ where: { id } });
  return { message: "Tarefa exclu\xEDda com sucesso" };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
