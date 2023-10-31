import { FastifyHttpServer } from './infra/http-server/FastifyHttpServer';
import { logger } from './config/logger';

const httpServer = new FastifyHttpServer(logger);

httpServer.listen(3001, '0.0.0.0');
