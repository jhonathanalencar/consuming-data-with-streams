import { FastifyReply } from 'fastify';

import { DatasetStream } from '../../utils/DatasetStream';

export class GetTopAnimes {
  async execute(filePath: string, reply: FastifyReply) {
    await DatasetStream.consume(filePath, reply, 0, (data: any) => {
      return data.score_count < 350000;
    });
  }
}
