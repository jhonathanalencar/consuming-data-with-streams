import { AnimeCard } from '@/components/AnimeCard';

interface AnimeListProps {
  animes: Anime[];
}

export function AnimeList({ animes }: AnimeListProps) {
  return (
    <section className="w-full p-4">
      <div className="grid-cols-list grid w-full place-items-center gap-4">
        {animes.map((anime) => {
          return <AnimeCard key={anime.id} anime={anime} />;
        })}
      </div>
    </section>
  );
}
