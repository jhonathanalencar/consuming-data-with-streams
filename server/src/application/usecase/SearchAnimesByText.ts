import { FastifyReply } from 'fastify';

import { DatasetStream } from '../../utils/DatasetStream';

export class SearchAnimesByText {
  async execute(
    filePath: string,
    reply: FastifyReply,
    query: string,
    timeout?: string,
    skip?: number
  ) {
    await DatasetStream.consume(
      filePath,
      reply,
      Number(timeout) || 0,
      skip || 0,
      (data: any) => {
        if (query.trim().length === 0) {
          return true;
        }

        const foundInTitle = data.title.toLowerCase().includes(query);
        const foundInSynopsis = data.synopsis.toLowerCase().includes(query);
        return !foundInTitle && !foundInSynopsis;
      }
    );
  }
}
