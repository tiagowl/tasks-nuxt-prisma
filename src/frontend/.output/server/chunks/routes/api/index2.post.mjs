import { c as defineEventHandler, r as readBody, e as createError } from '../../_/nitro.mjs';
import { z } from 'zod';
import { p as prisma } from '../../_/prisma.mjs';
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

const createTaskSchema = z.object({
  title: z.string().min(1, "T\xEDtulo \xE9 obrigat\xF3rio").max(200, "T\xEDtulo deve ter no m\xE1ximo 200 caracteres"),
  publishedAt: z.string().datetime().optional().nullable(),
  subtasks: z.array(z.string().min(1, "Descri\xE7\xE3o \xE9 obrigat\xF3ria").max(500, "Descri\xE7\xE3o deve ter no m\xE1ximo 500 caracteres")).optional().default([])
});
const index_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const data = createTaskSchema.parse(body);
    const title = capitalizeFirstWord(data.title);
    const subtasks = data.subtasks.map((description) => capitalizeFirstWord(description)).filter(Boolean);
    const task = await prisma.task.create({
      data: {
        title,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        ...subtasks.length > 0 ? {
          subtasks: {
            create: subtasks.map((description) => ({ description }))
          }
        } : {}
      },
      include: {
        subtasks: {
          orderBy: { createdAt: "asc" }
        },
        _count: {
          select: {
            subtasks: true
          }
        }
      }
    });
    return {
      ...task,
      status: subtasks.length > 0 ? "todo" : null,
      _count: {
        subtasks: task._count.subtasks,
        completedSubtasks: 0
      }
    };
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
//# sourceMappingURL=index2.post.mjs.map
