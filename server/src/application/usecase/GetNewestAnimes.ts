import { FastifyReply } from 'fastify';

import { DatasetStream } from '../../utils/DatasetStream';

export class GetNewestAnimes {
  async execute(filePath: string, reply: FastifyReply) {
    await DatasetStream.consume(filePath, reply, 0, (data: any) => {
      return data.season.split(' ')[1] < 2022;
    });
  }
}
