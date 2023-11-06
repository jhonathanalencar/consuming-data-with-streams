'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { notFound } from 'next/navigation';

import { useExecuteOnMount } from '@/hooks/useExecuteOnMount';
import { startConsume, stopConsume } from '@/utils/consumeDatasetStream';
import { ANIME_GENRES, ANIME_GENRES_ICON } from '@/constants/animeGenres';

import { Section } from '@/components/Section';
import { AnimeCard } from '@/components/AnimeCard';
import { AnimeList } from '@/components/AnimeList';

interface AnimesByGenrePageProps {
  params: { genre: string };
}

let count = 0;

export default function AnimesByGenrePage({
  params: { genre },
}: AnimesByGenrePageProps) {
  let abortController = new AbortController();

  const [animes, setAnimes] = useState<(Anime & { lastItem?: boolean })[]>([]);
  const [skip, setSkip] = useState(0);
  const [offset, setOffset] = useState(30);

  const LENGTH = animes.length;
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/animes/${genre.replaceAll(
    '-',
    ' '
  )}?timeout=100&skip=${skip}`;

  function updateState() {
    return new WritableStream({
      write(data) {
        ++count;

        if (count === offset) {
          data.lastItem = true;
          setSkip(offset);
          setOffset((prev) => prev + 30);
          stopConsume(abortController);
        }

        setAnimes((prev) => {
          return [...prev, data];
        });
      },
      abort(reason) {
        console.log('aborted', reason);
      },
    });
  }

  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  const lastAnimeRef = useCallback(
    (animeCard: HTMLAnchorElement) => {
      if (intersectionObserver.current) {
        if (LENGTH === offset) {
          stopConsume(abortController);
        }

        intersectionObserver.current.disconnect();
      }

      intersectionObserver.current = new IntersectionObserver((entries) => {
        const lastAnimeCard = entries[0];

        if (!lastAnimeCard.isIntersecting) return;

        startConsume(URL, abortController.signal, updateState);
      });

      if (animeCard) {
        intersectionObserver.current.observe(animeCard);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [LENGTH, offset, skip, URL]
  );

  useEffect(() => {
    count = 0;
  }, [genre]);

  if (!ANIME_GENRES[genre]) {
    notFound();
  }

  useExecuteOnMount(() =>
    startConsume(URL, abortController.signal, updateState)
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

        <section className="w-full">
          <AnimeList animes={animes} lastAnimeRef={lastAnimeRef} />
        </section>
      </Section.Container>
    </Section.Root>
  );
}
