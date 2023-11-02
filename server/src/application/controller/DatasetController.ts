import { join } from 'node:path';

import { HttpServer } from '../../infra/http-server/HttpServer';
import { ConsumeDataset } from '../usecase/ConsumeDataset';
import { GetAnimesByGenre } from '../usecase/GetAnimesByGenre';

export class DatasetController {
  constructor(
    readonly httpServer: HttpServer,
    readonly consumeDataset: ConsumeDataset,
    readonly getAnimesByGenre: GetAnimesByGenre
  ) {
    this.httpServer.register(
      'get',
      '/',
      async (params: any, body: any, reply: any) => {
        const filePath = join(__dirname, '../..', 'assets', 'anime.csv');

        await consumeDataset.execute(filePath, reply);
      }
    );

    this.httpServer.register(
      'get',
      '/animes/:genre',
      async (params: { genre: string }, body: any, reply: any) => {
        const filePath = join(__dirname, '../..', 'assets', 'anime.csv');
        await getAnimesByGenre.execute(filePath, params.genre, reply);
      }
    );
  }
}
