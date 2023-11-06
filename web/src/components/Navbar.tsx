import Link from 'next/link';

import { MagnifyingGlass } from '@/libs/phosphor';

import { DropdownMenu } from './DropdownMenu';

export function Navbar() {
  return (
    <header className="shrink-0 grow-0 basis-16">
      <div className=" fixed left-0 right-0 z-[100] grid h-16 bg-gray-900 shadow-md">
        <div className="header-content-grid container mx-auto grid px-4">
          <div className="header-logo flex items-center">
            <Link href="/" className="px-4">
              <strong className="h-full text-2xl font-bold tracking-tight text-emerald-200">
                Ani<span className="font-black text-yellow-500">Stream</span>
              </strong>
            </Link>
          </div>

          <div className="header-menu flex">
            <div className="flex items-center justify-center">
              <DropdownMenu />
            </div>
          </div>

          <div className="header-actions flex">
            <div className="flex items-center justify-center">
              <Link
                href="/search"
                className="group rounded-md border-2 border-transparent px-2 py-1 outline-none transition-colors focus-visible:border-yellow-500"
              >
                <MagnifyingGlass
                  size={32}
                  weight="bold"
                  className="text-yellow-500 group-focus-visible:text-zinc-100"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
