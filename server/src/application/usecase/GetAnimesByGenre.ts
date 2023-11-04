import { FastifyReply } from 'fastify';

import { DatasetStream } from '../../utils/DatasetStream';

export class GetAnimesByGenre {
  async execute(filePath: string, genre: string, reply: FastifyReply) {
    await DatasetStream.consume(filePath, reply, 100, (data: any) => {
      const lowerCasedGenres = data.genres.map((genre: string) =>
        genre.toLowerCase()
      );

      return !lowerCasedGenres.includes(genre);
    });
  }
}
