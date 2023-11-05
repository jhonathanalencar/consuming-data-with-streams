import { useState } from 'react';
import Link from 'next/link';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as Dialog from '@radix-ui/react-dialog';

import { CaretUp, CaretDown } from '@/libs/phosphor';
import { genresSubmenuLinks } from '@/constants/menuLinks';
import { ANIME_GENRES } from '@/constants/animeGenres';

export function GenresSubmenuDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <div className="flex cursor-pointer items-center justify-between rounded border-2 border-transparent px-4 py-3 focus-within:border-yellow-500 focus-within:bg-zinc-800 hover:bg-zinc-800">
          <button className="outline-none">
            <span className="font-semibold tracking-wide text-zinc-200">
              Genres
            </span>
          </button>

          {open ? (
            <CaretUp size={24} className="text-zinc-200" />
          ) : (
            <CaretDown size={24} className="text-zinc-200" />
          )}
        </div>
      </Collapsible.Trigger>

      <Collapsible.Content className="collapsible-content">
        <ul>
          {genresSubmenuLinks.map((genre) => {
            return (
              <li
                key={genre}
                className="cursor-pointer border-2 border-transparent bg-zinc-700 focus-within:border-yellow-500 focus-within:bg-zinc-800 hover:bg-zinc-800"
              >
                <Dialog.Close asChild>
                  <Link
                    href={`/animes/${genre}`}
                    replace
                    className="block px-4 py-2 text-sm font-normal tracking-wider text-gray-300 outline-none focus-visible:border-yellow-500"
                  >
                    {ANIME_GENRES[genre]}
                  </Link>
                </Dialog.Close>
              </li>
            );
          })}
        </ul>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
