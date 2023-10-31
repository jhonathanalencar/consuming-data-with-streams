import zod from 'zod';

const envSchema = zod.object({
  PORT: zod.number().default(3001),
  HOST: zod.string().default('0.0.0.0'),
});

export const env = envSchema.parse(process.env);
