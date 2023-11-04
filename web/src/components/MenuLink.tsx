import Link from 'next/link';

import * as Dialog from '@radix-ui/react-dialog';

interface MenuLinkProps {
  pathTo: string;
  text: string;
}

export function MenuLink({ pathTo, text }: MenuLinkProps) {
  return (
    <li className="focus-within:bg-zinc-800 hover:bg-zinc-800">
      <Dialog.Close asChild>
        <Link
          href={pathTo}
          className="block rounded border-2 border-transparent px-4 py-3 font-semibold tracking-wide text-gray-200 outline-none focus-visible:border-yellow-500"
        >
          {text}
        </Link>
      </Dialog.Close>
    </li>
  );
}
