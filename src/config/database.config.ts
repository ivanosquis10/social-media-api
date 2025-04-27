import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { User } from '@src/users/entities/user.entity';
import { Posts } from '@src/posts/entities/posts.entity';
import env from './env';

/**
 * Configuración de TypeORM para PostgreSQL
 */
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: env.NODE_ENV !== 'production',
  autoLoadEntities: true,
  entities: [User, Posts],
  // migrations: ['dist/migrations/*{.ts,.js}'],
  // synchronize: env.NODE_ENV !== 'production', // Solo activar en desarrollo
  // logging: env.NODE_ENV === 'development',
  // ssl: env.NODE_ENV === 'production',
};

/**
 * Función para obtener la configuración de TypeORM
 * Útil cuando necesitamos añadir lógica adicional antes de retornar la configuración
 */
export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  return databaseConfig;
};
