// eslint-disable-next-line semi
'use client'

import { GlobalContext } from '@/context/Context';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

export default function Nav() {
  const fullPath = usePathname();
  const lastSlashIndex = fullPath.lastIndexOf('/');
  const route = lastSlashIndex !== -1 ? fullPath.substring(lastSlashIndex + 1) : fullPath;
  const context=useContext(GlobalContext);

  return (
    <nav className={context.showNav ? "bg-white shadow" : "hidden bg-white shadow"}>
      <div className="max-w-7xl mx-auto py-4 px-2 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 capitalize">{route}</h1>
      </div>
    </nav>
  );
}

