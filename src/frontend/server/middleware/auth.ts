export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname

  if (
    pathname === '/api/auth/login' ||
    pathname.startsWith('/api/_') ||
    pathname === '/__nuxt_error'
  ) {
    return
  }

  if (!pathname.startsWith('/api/')) {
    return
  }

  const authHeader = getHeader(event, 'authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const token = authHeader.replace('Bearer ', '')
  try {
    const { verifyJwt } = await import('~/server/utils/jwt')
    const payload = verifyJwt(token)
    event.context.auth = { userId: payload.sub as string }
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
  }
})
