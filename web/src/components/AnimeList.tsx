import { AnimeCard } from '@/components/AnimeCard';

interface AnimeListProps {
  animes: Anime[];
}

export function AnimeList({ animes }: AnimeListProps) {
  return (
    <section className="w-full">
      <div className="grid w-full grid-cols-list place-items-center gap-4">
        {animes.map((anime) => {
          return <AnimeCard key={anime.id} anime={anime} />;
        })}
      </div>
    </section>
  );
}
