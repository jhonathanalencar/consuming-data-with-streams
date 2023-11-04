import Link from 'next/link';

import { CaretRight } from '@/libs/phosphor';

interface ViewAllButtonProps {
  href: string;
}

export function ViewAllButton({ href }: ViewAllButtonProps) {
  return (
    <div className="group flex h-fit cursor-pointer items-center gap-1 rounded-md border-2 border-transparent p-2 text-zinc-300 transition-colors focus-within:border-yellow-500 focus-within:text-zinc-100 hover:text-zinc-100">
      <Link
        href={href}
        className="text-sm font-semibold uppercase tracking-wider outline-none"
      >
        view all
      </Link>
      <CaretRight size={18} weight="bold" className="" />
    </div>
  );
}
