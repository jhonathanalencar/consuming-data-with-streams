'use client';

import { useState } from 'react';

import { useExecuteOnMount } from '@/hooks/useExecuteOnMount';

import { AnimeList } from '@/components/AnimeList';
import { startConsume } from '@/utils/consumeDatasetStream';

let abortController = new AbortController();

export default function HomePage() {
  const [animes, setAnimes] = useState<Anime[]>([]);

  function updateState() {
    let count = 0;
    return new WritableStream({
      write(data) {
        ++count;
        if (count <= 30) {
          setAnimes((prev) => {
            return [...prev, data];
          });
        }
      },
      abort(reason) {
        console.log('aborted', reason);
      },
    });
  }

  useExecuteOnMount(() =>
    startConsume('http://localhost:3001', abortController.signal, updateState)
  );

  return (
    <section className="h-full w-full bg-zinc-950">
      <AnimeList animes={animes} />
    </section>
  );
}
