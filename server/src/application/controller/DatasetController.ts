import { HttpServer } from '../../infra/http-server/HttpServer';
import { ConsumeDataset } from '../usecase/ConsumeDataset';
import { GetAnimesByGenre } from '../usecase/GetAnimesByGenre';
import { GetMostPopularAnimes } from '../usecase/GetMostPopularAnimes';
import { GetTopAnimes } from '../usecase/GetTopAnimes';
import { GetNewestAnimes } from '../usecase/GetNewestAnimes';
import { SearchAnimesByText } from '../usecase/SearchAnimesByText';

export class DatasetController {
  constructor(
    readonly httpServer: HttpServer,
    readonly filePath: string,
    readonly consumeDataset: ConsumeDataset,
    readonly searchAnimesByText: SearchAnimesByText,
    readonly getAnimesByGenre: GetAnimesByGenre,
    readonly getMostPopularAnimes: GetMostPopularAnimes,
    readonly getTopAnimes: GetTopAnimes,
    readonly getNewestAnimes: GetNewestAnimes
  ) {
    this.httpServer.register(
      'get',
      '/search',
      async (
        params: { query: { q?: string; timeout?: string; skip?: number } },
        body: any,
        reply: any
      ) => {
        await searchAnimesByText.execute(
          this.filePath,
          reply,
          params.query.q || ''
        );
      }
    );

    this.httpServer.register(
      'get',
      '/animes',
      async (
        params: { query: { timeout?: string; skip?: number } },
        body: any,
        reply: any
      ) => {
        await consumeDataset.execute(
          this.filePath,
          reply,
          params.query.timeout,
          params.query.skip
        );
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
        params: { query: { timeout?: string; skip?: number } },
        body: any,
        reply: any
      ) => {
        await this.getMostPopularAnimes.execute(
          this.filePath,
          reply,
          params.query.timeout,
          params.query.skip
        );
      }
    );

    this.httpServer.register(
      'get',
      '/animes/top',
      async (
        params: { query: { timeout?: string; skip?: number } },
        body: any,
        reply: any
      ) => {
        await this.getTopAnimes.execute(
          this.filePath,
          reply,
          params.query.timeout,
          params.query.skip
        );
      }
    );

    this.httpServer.register(
      'get',
      '/animes/new',
      async (
        params: { query: { timeout?: string; skip?: number } },
        body: any,
        reply: any
      ) => {
        await this.getNewestAnimes.execute(
          this.filePath,
          reply,
          params.query.timeout,
          params.query.skip
        );
      }
    );
  }
}
