import { Anime } from './page';

interface AnimeCardProps {
  data: Anime[];
}

export function AnimeCard({ data }: AnimeCardProps) {
  return (
    <div>
      {data.map((anime) => {
        return <li key={anime.anime_url}>{anime.title}</li>;
      })}
    </div>
  );
}
