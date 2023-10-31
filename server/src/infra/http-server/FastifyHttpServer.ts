import fastify, { FastifyInstance, FastifyLoggerOptions } from 'fastify';

import { HttpServer } from './HttpServer';

export class FastifyHttpServer implements HttpServer {
  app: FastifyInstance;

  constructor(logger: FastifyLoggerOptions) {
    this.app = fastify({
      logger,
    });
  }

  async listen(port: number, host: string): Promise<void> {
    this.app.listen({
      port,
      host,
    });
  }
}
