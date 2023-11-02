'use client';

import { useState } from 'react';

import { useExecuteOnMount } from '@/hooks/useExecuteOnMount';

import { AnimeList } from '@/components/AnimeList';

async function consumeDataset(signal: AbortSignal) {
  const response = await fetch('http://localhost:3001', {
    signal,
  });
  if (!response.body) return;

  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(parseNDJSON());

  return reader;
}

function parseNDJSON() {
  let ndjsonBuffer = '';

  return new TransformStream({
    transform(chunk, controller) {
      ndjsonBuffer += chunk;

      const items = ndjsonBuffer.split('\n');
      items
        .slice(0, -1)
        .forEach((item) => controller.enqueue(JSON.parse(item)));

      ndjsonBuffer = items[items.length - 1];
    },
    flush(controller) {
      if (!ndjsonBuffer) return;
      controller.enqueue(JSON.parse(ndjsonBuffer));
    },
  });
}

let abortController = new AbortController();

export default function Home() {
  const [data, setData] = useState<Anime[]>([]);

  async function startConsume() {
    try {
      const readable = await consumeDataset(abortController.signal);
      await readable?.pipeTo(test(), { signal: abortController.signal });
    } catch (error: any) {
      if (!error.message.includes('abort')) throw error;
    }
  }

  function test() {
    let count = 0;
    return new WritableStream({
      write(data) {
        ++count;
        if (count <= 30) {
          setData((prev) => {
            return [...prev, data];
          });
        }
      },
      abort(reason) {
        console.log('aborted', reason);
      },
    });
  }

  useExecuteOnMount(startConsume);

  return (
    <section className="h-full w-full bg-zinc-950">
      <div className="">
        <AnimeList animes={data} />
      </div>
    </section>
  );
}
