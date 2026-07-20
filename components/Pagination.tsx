'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-center gap-2 py-10">
      
      {/* 1. ⬅️ PREVIOUS BUTTON (INTERACTIVE VS DISABLED) */}
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:bg-zinc-50 hover:text-zinc-900 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Previous
        </Link>
      ) : (
        <span className="flex h-10 cursor-not-allowed items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-600">
          Previous
        </span>
      )}

      {/* 2. 🔢 PAGE NUMBERS (MAKES THE CURRENT PAGE HIGHLY READABLE) */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          const isCurrent = page === currentPage;

          return isCurrent ? (
            <span
              key={page}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-black"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={createPageURL(page)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 bg-white text-sm font-medium text-zinc-600 transition-all duration-150 hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* 3. ➡️ NEXT BUTTON (INTERACTIVE VS DISABLED) */}
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:bg-zinc-50 hover:text-zinc-900 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Next
        </Link>
      ) : (
        <span className="flex h-10 cursor-not-allowed items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-600">
          Next
        </span>
      )}

    </div>
  );
}