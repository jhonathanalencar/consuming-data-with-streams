import { menuLinks } from '@/constants/menuLinks';
import * as Dialog from '@radix-ui/react-dialog';

import { MenuLink } from './MenuLink';
import { GenresSubmenuDropdown } from './GenresSubmenuDropdown';

export function DropdownMenuDialog() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed left-0 top-0 z-[1] h-full w-full bg-black/90" />

      <Dialog.Content className="fixed left-0 top-[4rem] z-[1] h-[calc(100%-4rem)] w-72 max-w-full overflow-y-auto bg-zinc-950 py-4 drop-shadow-md">
        <Dialog.Title className="px-4 py-2 text-sm font-bold text-gray-400">
          Browse
        </Dialog.Title>

        <nav>
          <ul>
            {menuLinks.map((menuLink) => {
              return (
                <MenuLink
                  key={menuLink.pathTo}
                  pathTo={menuLink.pathTo}
                  text={menuLink.text}
                />
              );
            })}

            <li>
              <GenresSubmenuDropdown />
            </li>
          </ul>
        </nav>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
