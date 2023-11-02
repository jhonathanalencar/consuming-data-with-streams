'use client';

import * as Dialog from '@radix-ui/react-dialog';

import { List } from '@/libs/phosphor';

import { DropdownMenuDialog } from './DropdownMenuDialog';

export function DropdownMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <List size={32} weight="bold" className="text-emerald-200" />
      </Dialog.Trigger>

      <DropdownMenuDialog />
    </Dialog.Root>
  );
}
