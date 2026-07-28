import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold text-red-600">
        Meeting not found
      </h1>

      <p className="mb-6 text-gray-700">
        The meeting you are looking for does not exist or may have been removed.
      </p>

      <Link
        href="/meetings"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Back to Meetings
      </Link>
    </main>
  );
}