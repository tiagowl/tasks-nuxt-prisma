import { u as useRuntimeConfig } from './nitro.mjs';
import jwt from 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const getSecret = () => {
  const config = useRuntimeConfig();
  return config.jwtSecret;
};
function signJwt(payload) {
  const config = useRuntimeConfig();
  const expiresIn = `${config.sessionTimeout}m`;
  return jwt.sign(payload, getSecret(), { expiresIn });
}
function verifyJwt(token) {
  return jwt.verify(token, getSecret());
}

export { signJwt, verifyJwt };
//# sourceMappingURL=jwt.mjs.map
