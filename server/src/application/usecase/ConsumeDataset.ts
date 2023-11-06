import { FastifyReply } from 'fastify';

import { DatasetStream } from '../../utils/DatasetStream';

export class ConsumeDataset {
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
      () => false
    );
  }
}
