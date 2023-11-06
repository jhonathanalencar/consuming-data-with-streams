import { useEffect, useState } from 'react';

import { startConsume } from '@/utils/consumeDatasetStream';

import { AnimeList } from '@/components/AnimeList';
import { Section } from '@/components/Section';

interface SearchResultsProps {
  query: string;
}

let count = 0;

export function SearchResults({ query }: SearchResultsProps) {
  let abortController = new AbortController();

  const [animes, setAnimes] = useState<Anime[]>([]);

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/search?q=${query}&timeout=30`;

  function updateState() {
    return new WritableStream({
      write(data) {
        ++count;

        if (count <= 100) {
          setAnimes((prev) => {
            return [...prev, data];
          });
        }

        if (count === 100) {
          abortController.abort();
          count = 0;
        }
      },
      abort(reason) {
        console.log('aborted', reason);
      },
    });
  }

  useEffect(() => {
    if (query.trim().length > 0) {
      startConsume(URL, abortController.signal, updateState);
    }
    setAnimes([]);

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    count = 0;
  }, []);

  return (
    <Section.Container>
      <Section.Title>Results</Section.Title>
      <AnimeList animes={animes} />
    </Section.Container>
  );
}
