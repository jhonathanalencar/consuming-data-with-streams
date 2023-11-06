'use client';

import { useCallback, useRef, useState } from 'react';

import { useExecuteOnMount } from '@/hooks/useExecuteOnMount';
import { startConsume, stopConsume } from '@/utils/consumeDatasetStream';

import { AnimeList } from '@/components/AnimeList';
import { Section } from '@/components/Section';

let count = 0;

export default function TopAnimesPage() {
  let abortController = new AbortController();

  const [animes, setAnimes] = useState<Anime[]>([]);
  const [skip, setSkip] = useState(0);
  const [offset, setOffset] = useState(30);

  const LENGTH = animes.length;
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/animes/top?timeout=100&skip=${skip}`;

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
        if (length === offset) {
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

  useExecuteOnMount(() =>
    startConsume(
      `${process.env.NEXT_PUBLIC_API_URL}/animes/top?timeout=100`,
      abortController.signal,
      updateState
    )
  );

  return (
    <Section.Root>
      <Section.Container>
        <Section.Title>Top</Section.Title>

        <AnimeList animes={animes} lastAnimeRef={lastAnimeRef} />
      </Section.Container>
    </Section.Root>
  );
}
