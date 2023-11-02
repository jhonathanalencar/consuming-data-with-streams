import Image from 'next/image';

import { useImageUrlWithFallback } from '@/hooks/useImageUrlWithFallback';

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  const { imageUrlWithFallback } = useImageUrlWithFallback(
    anime.main_pic,
    '/image-fallback.jpg'
  );

  return (
    <div className="w-full max-w-[192px] rounded bg-zinc-800 p-2 shadow-md">
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
    </div>
  );
}
