import { X } from '@/libs/phosphor';

import { Section } from '@/components/Section';

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
}

export function SearchBar({ query, setQuery }: SearchBarProps) {
  function handleClearSearchBar() {
    setQuery('');
  }

  return (
    <div className="w-full bg-zinc-900 py-8">
      <Section.Container>
        <div className="mx-auto flex w-full max-w-4xl items-center border-b-2 border-b-zinc-700 bg-transparent transition-colors focus-within:border-yellow-500 sm:pb-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="search"
            placeholder="Search..."
            className="block w-full bg-transparent text-lg text-zinc-200 outline-none placeholder:text-zinc-400 sm:text-2xl"
          />

          {query.trim().length > 0 ? (
            <button
              type="button"
              aria-label="Clear"
              onClick={handleClearSearchBar}
              className="text-zinc-300 transition-colors hover:text-zinc-100 focus-visible:border-yellow-500 focus-visible:text-zinc-100"
            >
              <X size={24} weight="bold" />
            </button>
          ) : null}
        </div>
      </Section.Container>
    </div>
  );
}
