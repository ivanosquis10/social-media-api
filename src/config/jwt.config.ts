import { JwtModuleOptions } from '@nestjs/jwt';
import { env } from '@config/index';

export const jwtConfig: JwtModuleOptions = {
  secret: env.JWT_SECRET || 'super-secret-key',
  signOptions: {
    expiresIn: env.JWT_EXPIRES_IN || '24h',
  },
};
