import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import { deleteMeeting } from '@/lib/actions';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

const meetingTypeLabels = {
  regular: "Regular Sacrament Meeting",
  testimony: "Fast & Testimony Meeting",
  stake: "Stake Conference",
  general: "General Conference",
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const isSacramentMeeting =
    meeting.meetingType === 'regular' ||
    meeting.meetingType === 'testimony';

  const deleteMeetingWithId = deleteMeeting.bind(
    null,
    meeting.id
  );

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold text-blue-700">
        {meetingTypeLabels[meeting.meetingType]}
      </h2>

      <p className="mt-1 text-gray-600">
        {formattedDate}
      </p>

      <div className="mt-4 space-y-2">
        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>

        {isSacramentMeeting && (
          <p>
            <strong>Sacrament Hymn:</strong>{' '}
            #{meeting.sacramentHymn.number}{' '}
            {meeting.sacramentHymn.title}
          </p>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/meetings/${meeting.id}`}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Open Program
        </Link>

        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="rounded bg-slate-600 px-4 py-2 text-white transition hover:bg-slate-700"
        >
          Edit
        </Link>

        <form action={deleteMeetingWithId}>
          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}