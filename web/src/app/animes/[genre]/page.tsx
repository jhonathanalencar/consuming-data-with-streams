'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';

import { useExecuteOnMount } from '@/hooks/useExecuteOnMount';
import { startConsume } from '@/utils/consumeDatasetStream';
import { ANIME_GENRES, ANIME_GENRES_ICON } from '@/constants/animeGenres';

import { AnimeList } from '@/components/AnimeList';

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
      `http://localhost:3001/animes/${genre}`,
      abortController.signal,
      updateState
    )
  );

  return (
    <section className="h-full w-full bg-zinc-950">
      <div className="flex items-center gap-2 p-4">
        {ANIME_GENRES_ICON[genre]}
        <h1 className="text-2xl font-black text-zinc-100">
          {ANIME_GENRES[genre]}
        </h1>
      </div>

      <AnimeList animes={animes} />
    </section>
  );
}
