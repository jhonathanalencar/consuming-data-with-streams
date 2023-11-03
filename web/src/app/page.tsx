'use client';

import { useState } from 'react';

import { useExecuteOnMount } from '@/hooks/useExecuteOnMount';
import { startConsume } from '@/utils/consumeDatasetStream';

import { AnimeList } from '@/components/AnimeList';
import { Section } from '@/components/Section';

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
    <Section.Root>
      <Section.Container>
        <Section.Title>Most Popular</Section.Title>

        <AnimeList animes={animes} />
      </Section.Container>
    </Section.Root>
  );
}
