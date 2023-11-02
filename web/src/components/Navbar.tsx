import { List } from '@/libs/phosphor';

export function Navbar() {
  return (
    <header className="flex h-16 w-full flex-shrink-0 items-center justify-between bg-gray-950 px-8">
      <strong className="text-2xl font-bold tracking-tight text-emerald-200">
        Ani<span className="font-black text-yellow-500">Stream</span>
      </strong>
      <nav>
        <ul>
          <li>
            <List size={32} className="text-emerald-200" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
