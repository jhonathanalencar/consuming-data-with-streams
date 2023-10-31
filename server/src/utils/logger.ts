import píno from 'pino';

export const logger = píno({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
    },
  },
});
