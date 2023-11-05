'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';

import { useExecuteOnMount } from '@/hooks/useExecuteOnMount';
import { startConsume } from '@/utils/consumeDatasetStream';
import { ANIME_GENRES, ANIME_GENRES_ICON } from '@/constants/animeGenres';

import { AnimeList } from '@/components/AnimeList';
import { Section } from '@/components/Section';

interface AnimesByGenrePageProps {
  params: { genre: string };
}

let abortController = new AbortController();

export default function AnimesByGenrePage({
  params: { genre },
}: AnimesByGenrePageProps) {
  const [animes, setAnimes] = useState<Anime[]>([]);

  if (!ANIME_GENRES[genre]) {
    notFound();
  }

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
    startConsume(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/animes/${genre.replaceAll(
        '-',
        ' '
      )}?timeout=200`,
      abortController.signal,
      updateState
    )
  );

  return (
    <Section.Root>
      <Section.Container>
        <Section.Title>
          <div className="flex items-center gap-2">
            {ANIME_GENRES_ICON[genre]}
            {ANIME_GENRES[genre]}
          </div>
        </Section.Title>

        <AnimeList animes={animes} />
      </Section.Container>
    </Section.Root>
  );
}
