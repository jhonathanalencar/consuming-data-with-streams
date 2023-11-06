import { FastifyReply } from 'fastify';

import { DatasetStream } from '../../utils/DatasetStream';

export class GetAnimesByGenre {
  async execute(
    filePath: string,
    reply: FastifyReply,
    genre: string,
    timeout?: string,
    skip?: number
  ) {
    await DatasetStream.consume(
      filePath,
      reply,
      Number(timeout) || 0,
      skip || 0,
      (data: any) => {
        const lowerCasedGenres = data.genres.map((genre: string) =>
          genre.toLowerCase()
        );

        return !lowerCasedGenres.includes(genre);
      }
    );
  }
}
