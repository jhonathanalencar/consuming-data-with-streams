import { join } from 'node:path';

import { FastifyHttpServer } from './infra/http-server/FastifyHttpServer';
import { DatasetController } from './application/controller/DatasetController';
import { ConsumeDataset } from './application/usecase/ConsumeDataset';

import { logger } from './config/logger';
import { env } from './config/env';
import { GetAnimesByGenre } from './application/usecase/GetAnimesByGenre';
import { GetMostPopularAnimes } from './application/usecase/GetMostPopularAnimes';

const httpServer = new FastifyHttpServer(logger);
const consumeDataset = new ConsumeDataset();
const getAnimesByGenre = new GetAnimesByGenre();
const getMostPopularAnimes = new GetMostPopularAnimes();

const filePath = join(__dirname, 'assets', 'anime.csv');
new DatasetController(
  httpServer,
  filePath,
  consumeDataset,
  getAnimesByGenre,
  getMostPopularAnimes
);

httpServer.listen(env.PORT, env.HOST);
