import { FastifyReply } from 'fastify';

import { DatasetStream } from '../../utils/DatasetStream';

export class GetTopAnimes {
  async execute(filePath: string, reply: FastifyReply, timeout?: string) {
    await DatasetStream.consume(
      filePath,
      reply,
      Number(timeout) || 0,
      0,
      (data: any) => {
        return data.score_count < 350000;
      }
    );
  }
}
