import { AnimeCard } from '@/components/AnimeCard';

interface AnimeListProps {
  animes: Anime[];
  lastAnimeRef: (animeCard: HTMLAnchorElement) => void;
}

export function AnimeList({ animes, lastAnimeRef }: AnimeListProps) {
  return (
    <section className="w-full">
      <div className="grid w-full grid-cols-list place-items-center gap-4">
        {/* {animes.map((anime) => {
          return <AnimeCard key={anime.id} anime={anime} />;
        })} */}
        {animes.map((anime, index) => {
          if (animes.length === index + 1) {
            return (
              <AnimeCard key={anime.id} ref={lastAnimeRef} anime={anime} />
            );
          }

          return <AnimeCard key={anime.id} anime={anime} />;
        })}
      </div>
    </section>
  );
}
