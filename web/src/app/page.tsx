'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimeCard } from './AnimeCard';

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

export type Anime = {
  id: string;
  title: string;
  synopsis: string;
  anime_url: string;
  main_pic: string;
  num_episodes: string;
  genres: string[];
  pics: string[];
};

let abortController = new AbortController();

export default function Home() {
  const [data, setData] = useState<Anime[]>([]);
  const isMountedRef = useRef(false);

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
        setData((prev) => {
          return [...prev, data];
        });
      },
      abort(reason) {
        console.log('aborted', reason);
      },
    });
  }

  useEffect(() => {
    if (isMountedRef.current) return;

    startConsume();

    return () => {
      isMountedRef.current = true;
    };
  }, []);

  return (
    <section>
      <h1>Mikasa</h1>
      <AnimeCard data={data} />
    </section>
  );
}
