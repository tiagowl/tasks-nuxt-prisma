import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username, password } = loginSchema.parse(body)

    const config = useRuntimeConfig()

    if (
      username !== config.credentialsUsername ||
      password !== config.credentialsPassword
    ) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Credenciais inválidas',
      })
    }

    const { signJwt } = await import('~/server/utils/jwt')
    const token = signJwt({ sub: username })

    return { token, user: { username } }
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
