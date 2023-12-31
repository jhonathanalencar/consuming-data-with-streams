import { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useImageUrlWithFallback } from '@/hooks/useImageUrlWithFallback';

interface AnimeCardProps {
  anime: Anime & { lastItem?: boolean };
}

export const AnimeCard = forwardRef<HTMLAnchorElement, AnimeCardProps>(
  ({ anime }, ref) => {
    const { imageUrlWithFallback } = useImageUrlWithFallback(
      anime.main_pic,
      '/image-fallback.jpg'
    );

    return (
      <Link
        href={anime.anime_url}
        target="_blank"
        rel="noreferrer"
        ref={ref && anime.lastItem ? ref : undefined}
        className="group outline-none"
      >
        <div className="relative w-full max-w-[192px] rounded border-2 border-transparent bg-zinc-800 p-2 shadow-md group-focus-visible:border-2 group-focus-visible:border-yellow-500">
          <Image
            src={imageUrlWithFallback}
            alt={anime.title}
            width={0}
            height={0}
            sizes="100vw"
            className="h-64 w-48 rounded-sm object-cover"
            priority={true}
          />
          <span
            title={anime.title}
            className="mt-1 block truncate font-semibold text-zinc-200"
          >
            {anime.title}
          </span>

          <div
            className="absolute inset-0 hidden h-full w-full animate-fade rounded bg-contain bg-center group-hover:block group-focus-visible:block"
            style={{
              backgroundImage: `url('${imageUrlWithFallback}')`,
            }}
          >
            <div className="relative flex h-full w-full flex-col gap-2 bg-gray-900/90 p-2">
              <span
                title={anime.title}
                className="block truncate text-center font-semibold text-zinc-100"
              >
                {anime.title}
              </span>
              <span className="text-sm font-medium text-zinc-400">
                {anime.num_episodes || '0'} Episodes
              </span>
              <p className="line-clamp-5 text-sm font-normal leading-snug text-zinc-300">
                {anime.synopsis}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);
AnimeCard.displayName = 'AnimeCard';
