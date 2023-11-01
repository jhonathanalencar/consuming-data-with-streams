import { FastifyHttpServer } from './infra/http-server/FastifyHttpServer';
import { DatasetController } from './application/controller/DatasetController';
import { ConsumeDataset } from './application/usecase/ConsumeDataset';

import { logger } from './config/logger';
import { env } from './config/env';

const httpServer = new FastifyHttpServer(logger);
const consumeDataset = new ConsumeDataset();

new DatasetController(httpServer, consumeDataset);

httpServer.listen(env.PORT, env.HOST);
