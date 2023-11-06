'use client';

import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

import { Section } from '@/components/Section';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query, 500);

  return (
    <Section.Root className="pt-0">
      <SearchBar query={query} setQuery={setQuery} />

      {query ? (
        <div className="mt-8">
          <SearchResults query={debouncedQuery} />
        </div>
      ) : null}
    </Section.Root>
  );
}
