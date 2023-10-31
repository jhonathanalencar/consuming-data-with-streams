import { FastifyLoggerOptions } from 'fastify';
import píno from 'pino';

export const logger: FastifyLoggerOptions = píno({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
    },
  },
});
