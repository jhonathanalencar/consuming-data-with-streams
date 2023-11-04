'use client';

import { useState } from 'react';

import { useExecuteOnMount } from '@/hooks/useExecuteOnMount';
import { startConsume } from '@/utils/consumeDatasetStream';

import { AnimeList } from '@/components/AnimeList';
import { Section } from '@/components/Section';

let abortController = new AbortController();

export default function PopularAnimesPage() {
  const [animes, setAnimes] = useState<Anime[]>([]);

  function updateState() {
    let count = 0;

    return new WritableStream({
      write(data) {
        ++count;
        setAnimes((prev) => {
          return [...prev, data];
        });
      },
      abort(reason) {
        console.log('aborted', reason);
      },
    });
  }

  useExecuteOnMount(() =>
    startConsume(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/animes/popular?timeout=50`,
      abortController.signal,
      updateState
    )
  );

  return (
    <Section.Root>
      <Section.Container>
        <Section.Title>Popular</Section.Title>

        <AnimeList animes={animes} />
      </Section.Container>
    </Section.Root>
  );
}
