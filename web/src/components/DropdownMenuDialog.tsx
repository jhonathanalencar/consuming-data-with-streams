import * as Dialog from '@radix-ui/react-dialog';

export function DropdownMenuDialog() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed left-0 top-0 z-50 h-full w-full bg-black/90" />
      <Dialog.Content className="fixed left-0 top-[4rem] h-[calc(100%-4rem)] w-72 max-w-full bg-zinc-900 drop-shadow-md">
        <Dialog.Title />
        <Dialog.Description />
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Portal>
  );
}
