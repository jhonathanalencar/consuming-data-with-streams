import { join } from 'node:path';

import { HttpServer } from '../../infra/http-server/HttpServer';
import { ConsumeDataset } from '../usecase/ConsumeDataset';
import { GetAnimesByGenre } from '../usecase/GetAnimesByGenre';
import { GetMostPopularAnimes } from '../usecase/GetMostPopularAnimes';
import { GetTopAnimes } from '../usecase/GetTopAnimes';

export class DatasetController {
  constructor(
    readonly httpServer: HttpServer,
    readonly filePath: string,
    readonly consumeDataset: ConsumeDataset,
    readonly getAnimesByGenre: GetAnimesByGenre,
    readonly getMostPopularAnimes: GetMostPopularAnimes,
    readonly getTopAnimes: GetTopAnimes
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
        await this.getAnimesByGenre.execute(this.filePath, params.genre, reply);
      }
    );

    this.httpServer.register(
      'get',
      '/animes/popular',
      async (params: any, body: any, reply: any) => {
        await this.getMostPopularAnimes.execute(this.filePath, reply);
      }
    );

    this.httpServer.register(
      'get',
      '/animes/top',
      async (params: any, body: any, reply: any) => {
        await this.getTopAnimes.execute(this.filePath, reply);
      }
    );
  }
}
