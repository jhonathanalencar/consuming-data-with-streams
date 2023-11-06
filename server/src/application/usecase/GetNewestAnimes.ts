import { FastifyReply } from 'fastify';

import { DatasetStream } from '../../utils/DatasetStream';

export class GetNewestAnimes {
  async execute(
    filePath: string,
    reply: FastifyReply,
    timeout?: string,
    skip?: number
  ) {
    await DatasetStream.consume(
      filePath,
      reply,
      Number(timeout) || 0,
      skip || 0,
      (data: any) => {
        return data.season.split(' ')[1] < 2022;
      }
    );
  }
}
