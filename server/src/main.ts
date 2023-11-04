import { join } from 'node:path';

import { logger } from './config/logger';
import { env } from './config/env';

import { FastifyHttpServer } from './infra/http-server/FastifyHttpServer';
import { DatasetController } from './application/controller/DatasetController';
import { ConsumeDataset } from './application/usecase/ConsumeDataset';
import { GetAnimesByGenre } from './application/usecase/GetAnimesByGenre';
import { GetMostPopularAnimes } from './application/usecase/GetMostPopularAnimes';
import { GetTopAnimes } from './application/usecase/GetTopAnimes';

const httpServer = new FastifyHttpServer(logger);
const consumeDataset = new ConsumeDataset();
const getAnimesByGenre = new GetAnimesByGenre();
const getMostPopularAnimes = new GetMostPopularAnimes();
const getTopAnimes = new GetTopAnimes();

const filePath = join(__dirname, 'assets', 'anime.csv');
new DatasetController(
  httpServer,
  filePath,
  consumeDataset,
  getAnimesByGenre,
  getMostPopularAnimes,
  getTopAnimes
);

httpServer.listen(env.PORT, env.HOST);
