import { FastifyHttpServer } from './infra/http-server/FastifyHttpServer';
import { logger } from './config/logger';
import { env } from './config/env';

const httpServer = new FastifyHttpServer(logger);

httpServer.listen(env.PORT, env.HOST);
