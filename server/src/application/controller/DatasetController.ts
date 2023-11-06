import { join } from 'node:path';

import { HttpServer } from '../../infra/http-server/HttpServer';
import { ConsumeDataset } from '../usecase/ConsumeDataset';
import { GetAnimesByGenre } from '../usecase/GetAnimesByGenre';
import { GetMostPopularAnimes } from '../usecase/GetMostPopularAnimes';
import { GetTopAnimes } from '../usecase/GetTopAnimes';
import { GetNewestAnimes } from '../usecase/GetNewestAnimes';

export class DatasetController {
  constructor(
    readonly httpServer: HttpServer,
    readonly filePath: string,
    readonly consumeDataset: ConsumeDataset,
    readonly getAnimesByGenre: GetAnimesByGenre,
    readonly getMostPopularAnimes: GetMostPopularAnimes,
    readonly getTopAnimes: GetTopAnimes,
    readonly getNewestAnimes: GetNewestAnimes
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
      async (
        params: { genre: string; query: { timeout?: string; skip: number } },
        body: any,
        reply: any
      ) => {
        await this.getAnimesByGenre.execute(
          this.filePath,
          reply,
          params.genre,
          params.query.timeout,
          params.query.skip
        );
      }
    );

    this.httpServer.register(
      'get',
      '/animes/popular',
      async (
        params: { query: { timeout?: string } },
        body: any,
        reply: any
      ) => {
        await this.getMostPopularAnimes.execute(
          this.filePath,
          reply,
          params.query.timeout
        );
      }
    );

    this.httpServer.register(
      'get',
      '/animes/top',
      async (
        params: { query: { timeout?: string } },
        body: any,
        reply: any
      ) => {
        await this.getTopAnimes.execute(
          this.filePath,
          reply,
          params.query.timeout
        );
      }
    );

    this.httpServer.register(
      'get',
      '/animes/new',
      async (
        params: { query: { timeout?: string } },
        body: any,
        reply: any
      ) => {
        await this.getNewestAnimes.execute(
          this.filePath,
          reply,
          params.query.timeout
        );
      }
    );
  }
}
