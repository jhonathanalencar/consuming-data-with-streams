import { FastifyHttpServer } from './infra/http-server/FastifyHttpServer';
import { logger } from './config/logger';
import { env } from './config/env';
import { DatasetController } from './application/controller/DatasetController';

const httpServer = new FastifyHttpServer(logger);
new DatasetController(httpServer);

httpServer.listen(env.PORT, env.HOST);
