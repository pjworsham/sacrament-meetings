'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold text-red-600">
        Something went wrong
      </h1>

      <p className="mb-6 text-gray-700">
        We could not load the meeting information. Please try again, or return
        to the meetings page.
      </p>
      <p className="mb-6 rounded-md bg-red-50 p-3 text-sm text-red-600">
        {error.message}
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}