import { FastifyHttpServer } from './infra/http-server/FastifyHttpServer';
import { DatasetController } from './application/controller/DatasetController';
import { ConsumeDataset } from './application/usecase/ConsumeDataset';

import { logger } from './config/logger';
import { env } from './config/env';
import { GetAnimesByGenre } from './application/usecase/GetAnimesByGenre';

const httpServer = new FastifyHttpServer(logger);
const consumeDataset = new ConsumeDataset();
const getAnimesByGenre = new GetAnimesByGenre();

new DatasetController(httpServer, consumeDataset, getAnimesByGenre);

httpServer.listen(env.PORT, env.HOST);
