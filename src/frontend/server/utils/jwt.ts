import jwt from 'jsonwebtoken'

const getSecret = () => {
  const config = useRuntimeConfig()
  return config.jwtSecret
}

export function signJwt(payload: Record<string, unknown>) {
  const config = useRuntimeConfig()
  const expiresIn = `${config.sessionTimeout}m`
  return jwt.sign(payload, getSecret(), { expiresIn })
}

export function verifyJwt(token: string) {
  return jwt.verify(token, getSecret()) as jwt.JwtPayload
}
