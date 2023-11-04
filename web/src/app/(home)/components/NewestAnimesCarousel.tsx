import { useState } from 'react';

import { useExecuteOnMount } from '@/hooks/useExecuteOnMount';
import { startConsume } from '@/utils/consumeDatasetStream';

import { AnimeCard } from '@/components/AnimeCard';
import { Carousel } from '@/app/(home)/components/Carousel';
import { Section } from '@/components/Section';
import { ViewAllButton } from './ViewAllButton';

const abortController = new AbortController();

interface NewestAnimesCarouselProps {
  slidesAmount: number;
}

export function NewestAnimesCarousel({
  slidesAmount,
}: NewestAnimesCarouselProps) {
  const [animes, setAnimes] = useState<Anime[]>([]);

  function updateState() {
    let count = 0;

    return new WritableStream({
      write(data) {
        ++count;

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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/animes/new`,
      abortController.signal,
      updateState
    )
  );

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
