'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const isBoard = pathname === '/' || pathname.startsWith('/map');
  const isDice = pathname === '/dice';

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-neutral-900 border-b border-neutral-800">
      <span className="text-neutral-200 text-sm font-medium">catanator</span>
      <div className="flex gap-4">
        <Link
          href="/"
          className={`text-sm transition-colors ${isBoard ? 'text-neutral-200' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          board
        </Link>
        <Link
          href="/dice"
          className={`text-sm transition-colors ${isDice ? 'text-neutral-200' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          dice
        </Link>
      </div>
    </nav>
  );
}
