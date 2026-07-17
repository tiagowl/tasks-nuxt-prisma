import { c as defineEventHandler, r as readBody, u as useRuntimeConfig, e as createError } from '../../../_/nitro.mjs';
import { z } from 'zod';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const loginSchema = z.object({
  username: z.string().min(1, "Usu\xE1rio \xE9 obrigat\xF3rio"),
  password: z.string().min(1, "Senha \xE9 obrigat\xF3ria")
});
const login_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password } = loginSchema.parse(body);
    const config = useRuntimeConfig();
    if (username !== config.credentialsUsername || password !== config.credentialsPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: "Credenciais inv\xE1lidas"
      });
    }
    const { signJwt } = await import('../../../_/jwt.mjs');
    const token = signJwt({ sub: username });
    return { token, user: { username } };
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

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
