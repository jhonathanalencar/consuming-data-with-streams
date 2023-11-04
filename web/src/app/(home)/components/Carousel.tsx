import { useCallback, useState } from 'react';
import UseEmblaCarousel from 'embla-carousel-react';

import { CaretLeft, CaretRight } from '@/libs/phosphor';

interface CarouselProps {
  slides: any[];
}

export function Carousel({ slides }: CarouselProps) {
  const [emblaRef, emblaApi] = UseEmblaCarousel({
    watchDrag: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();

    if (emblaApi.canScrollPrev() !== canScrollPrev) {
      setCanScrollPrev((prev) => !prev);
    }

    if (!canScrollNext && emblaApi.canScrollNext()) {
      setCanScrollNext(true);
    }
  }, [canScrollNext, canScrollPrev, emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext();

    if (emblaApi.canScrollNext() !== canScrollNext) {
      setCanScrollNext((prev) => !prev);
    }

    if (!canScrollPrev && emblaApi.canScrollPrev()) {
      setCanScrollPrev(true);
    }
  }, [canScrollNext, canScrollPrev, emblaApi]);

  return (
    <div className="relative flex w-full px-4">
      <div className="w-full" ref={emblaRef}>
        <div className="grid auto-cols-max grid-flow-col gap-2 sm:gap-4">
          {emblaApi
            ? slides.map((slide, index) => (
                <div
                  key={index}
                  className="relative min-w-0 max-w-full flex-shrink-0 flex-grow-0 basis-full"
                >
                  {slide}
                </div>
              ))
            : Array(20)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-[304px] w-[192px] animate-pulse rounded bg-zinc-800"
                  />
                ))}
        </div>
      </div>

      {canScrollPrev && (
        <button
          className="group absolute left-0 top-0 h-full w-16 "
          onClick={scrollPrev}
        >
          <div className="relative flex h-full w-full bg-gradient-to-r from-black/70 to-transparent text-zinc-200 transition-colors before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:to-transparent before:opacity-0 before:transition-opacity group-hover:before:opacity-100">
            <CaretLeft
              size={32}
              weight="bold"
              className="z-[1] mx-auto block h-full text-zinc-200"
            />
          </div>
        </button>
      )}

      {canScrollNext && (
        <button
          className="group absolute right-0 top-0 h-full w-16"
          onClick={scrollNext}
        >
          <div className="relative flex h-full w-full bg-gradient-to-l from-black/70 to-transparent text-zinc-200 transition-colors before:absolute before:inset-0 before:bg-gradient-to-l before:from-black before:to-transparent before:opacity-0 before:transition-opacity group-hover:before:opacity-100">
            <CaretRight
              size={32}
              weight="bold"
              className="z-[1] mx-auto block h-full text-zinc-200"
            />
          </div>
        </button>
      )}
    </div>
  );
}
