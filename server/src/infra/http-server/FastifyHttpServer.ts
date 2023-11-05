import fastify, {
  FastifyInstance,
  FastifyLoggerOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import { HttpMethods, HttpServer } from './HttpServer';

export class FastifyHttpServer implements HttpServer {
  app: FastifyInstance;

  constructor(logger: FastifyLoggerOptions) {
    this.app = fastify({
      logger,
    });
  }

  async register(
    method: HttpMethods,
    url: string,
    callback: Function
  ): Promise<void> {
    this.app[method](
      url,
      async (request: FastifyRequest, reply: FastifyReply) => {
        const output = await callback(
          { ...(request.params as {}), query: request.query },
          request.body,
          reply
        );

        if (reply.sent || reply.raw.closed) {
          return;
        }

        return reply.send(output);
      }
    );
  }

  async listen(port: number, host: string): Promise<void> {
    this.app.listen({
      port,
      host,
    });
  }
}
