import { z } from 'zod';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

/**
 * Esquema de validación para las variables de entorno
 * Agrega nuevas variables aquí para validarlas y tiparlas
 */
const envSchema = z.object({
  // Variables del servidor
  PORT: z.coerce.number().positive().default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Variables de base de datos
  DATABASE_URL: z.string().optional(),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().positive().default(5432),
  DB_USERNAME: z
    .string()
    .min(1, 'El nombre de usuario de la base de datos es requerido'),
  DB_PASSWORD: z
    .string()
    .min(1, 'La contraseña de la base de datos es requerida'),
  DB_NAME: z.string().min(1, 'El nombre de la base de datos es requerido'),

  // Otras variables (ejemplo)
  API_SECRET: z.string().optional(),
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.string().optional(),
});

/**
 * Tipo inferido de las variables de entorno validadas
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Validar y parsear las variables de entorno
 */
const validateEnv = (): Env => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = `❌ Configuración de entorno inválida:\n${error.errors
        .map((err) => `- ${err.path.join('.')}: ${err.message}`)
        .join('\n')}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    throw error;
  }
};

/**
 * Variables de entorno validadas y tipadas
 */
const env = validateEnv();

export default env;
