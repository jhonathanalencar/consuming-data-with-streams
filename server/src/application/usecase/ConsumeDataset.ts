import { createReadStream } from 'node:fs';
import { Readable, Transform } from 'node:stream';
import { TransformStream, WritableStream } from 'node:stream/web';
import { setTimeout } from 'node:timers/promises';
import { FastifyReply } from 'fastify';
import csvtojson from 'csvtojson';

import { csvParseParams } from '../../config/csv';

export class ConsumeDataset {
  async execute(filePath: string, reply: FastifyReply) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Content-Type': 'application/octet-stream',
    };

    let items = 0;
    const abortController = new AbortController();

    reply.raw.writeHead(200, headers);

    reply.raw.once('close', () => {
      console.log(`Connection was closed!`, items);
      abortController.abort();
    });

    try {
      await Readable.toWeb(createReadStream(filePath))
        .pipeThrough(Transform.toWeb(csvtojson(csvParseParams)))
        .pipeThrough(
          new TransformStream({
            transform(chunk, controller) {
              const data = JSON.parse(Buffer.from(chunk).toString());

              const mappedData = {
                id: data.anime_id,
                title: data.title,
                synopsis: data.synopsis,
                anime_url: data.anime_url,
                main_pic: data.main_pic,
                num_episodes: data.num_episodes,
                genres: data.genres,
                pics: data.pics,
              };

              controller.enqueue(JSON.stringify(mappedData).concat('\n'));
            },
          })
        )
        .pipeTo(
          new WritableStream({
            async write(chunk) {
              // await setTimeout(200);
              items++;
              reply.raw.write(chunk);
            },
            close() {
              reply.raw.end();
            },
          }),
          {
            signal: abortController.signal,
          }
        );
    } catch (error: any) {
      if (!error.message.includes('abort')) throw error;
    }
  }
}
