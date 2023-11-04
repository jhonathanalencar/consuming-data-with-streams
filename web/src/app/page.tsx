'use client';

import { useState } from 'react';

import { useExecuteOnMount } from '@/hooks/useExecuteOnMount';
import { startConsume } from '@/utils/consumeDatasetStream';

import { Section } from '@/components/Section';
import { Carousel } from '@/components/Carousel';
import { AnimeCard } from '@/components/AnimeCard';

let abortController = new AbortController();

export default function HomePage() {
  const [animes, setAnimes] = useState<Anime[]>([]);

  function updateState() {
    let count = 0;
    return new WritableStream({
      write(data) {
        ++count;
        if (count <= 20) {
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
    startConsume(
      'http://localhost:3001/animes/popular',
      abortController.signal,
      updateState
    )
  );

  return (
    <Section.Root className="overflow-x-hidden">
      <Section.Container>
        <Section.Title>Most Popular</Section.Title>
      </Section.Container>

      <Carousel
        slides={animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      />
    </Section.Root>
  );
}
