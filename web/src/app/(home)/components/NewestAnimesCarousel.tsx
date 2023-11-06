import { useEffect, useState } from 'react';

import { useExecuteOnMount } from '@/hooks/useExecuteOnMount';
import { startConsume, stopConsume } from '@/utils/consumeDatasetStream';

import { AnimeCard } from '@/components/AnimeCard';
import { Carousel } from '@/app/(home)/components/Carousel';
import { Section } from '@/components/Section';
import { ViewAllButton } from './ViewAllButton';

interface NewestAnimesCarouselProps {
  slidesAmount: number;
}

let count = 0;

export function NewestAnimesCarousel({
  slidesAmount,
}: NewestAnimesCarouselProps) {
  let abortController = new AbortController();

  const [animes, setAnimes] = useState<Anime[]>([]);

  function updateState() {
    return new WritableStream({
      write(data) {
        ++count;

        if (count > slidesAmount) {
          stopConsume(abortController);
        }

        if (count <= slidesAmount) {
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
      `${process.env.NEXT_PUBLIC_API_URL}/animes/new`,
      abortController.signal,
      updateState
    )
  );

  useEffect(() => {
    count = 0;
  }, []);

  return (
    <>
      <Section.Container>
        <div className="flex justify-between">
          <Section.Title>New</Section.Title>

          <ViewAllButton href="/animes/new" />
        </div>
      </Section.Container>

      <Carousel
        slides={animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      />
    </>
  );
}
