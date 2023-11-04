import { FastifyReply } from 'fastify';

import { DatasetStream } from '../../utils/DatasetStream';

export class GetMostPopularAnimes {
  async execute(filePath: string, reply: FastifyReply) {
    await DatasetStream.consume(filePath, reply, 0, (data: any) => {
      return data.popularity_rank > 100;
    });
  }
}
