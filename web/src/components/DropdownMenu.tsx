'use client';

import * as Dialog from '@radix-ui/react-dialog';

import { List } from '@/libs/phosphor';

import { DropdownMenuDialog } from './DropdownMenuDialog';
import { useState } from 'react';

export function DropdownMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <List size={32} weight="bold" className="text-emerald-200" />
      </Dialog.Trigger>

      <DropdownMenuDialog />
    </Dialog.Root>
  );
}
