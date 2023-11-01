import { join } from 'node:path';

import { HttpServer } from '../../infra/http-server/HttpServer';
import { ConsumeDataset } from '../usecase/ConsumeDataset';

export class DatasetController {
  constructor(
    readonly httpServer: HttpServer,
    readonly consumeDataset: ConsumeDataset
  ) {
    this.httpServer.register(
      'get',
      '/',
      async (params: any, body: any, reply: any) => {
        const filePath = join(__dirname, '../..', 'assets', 'anime.csv');

        await consumeDataset.execute(filePath, reply);
      }
    );
  }
}
