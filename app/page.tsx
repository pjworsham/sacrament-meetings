import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-140px)] bg-slate-50 px-6 py-12">
      <section className="mx-auto grid max-w-5xl items-center gap-10 rounded-2xl bg-white p-8 shadow-md md:grid-cols-2 md:p-12">
        <div className="flex justify-center">
          <Image
            src="/Christ.webp"
            alt="Jesus Christ"
            width={420}
            height={520}
            className="h-auto w-full max-w-sm rounded-xl object-cover shadow-lg"
            priority
          />
        </div>

        <div className="text-center md:text-left">
          <p className="mb-3 text-4xl font-semibold uppercase tracking-widest text-blue-600">
            Canton Ward
          </p>

          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Welcome to the Sacrament Meeting Program
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            View current sacrament meeting programs, review upcoming meetings,
            and manage meeting details in one place.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <Link
              href="/meetings/current"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              View Current Program
            </Link>

            <Link
              href="/meetings"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              View All Meetings
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

