import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="p-4 border-l-4 border-blue-600 bg-gray-50 rounded">
      <h3 className="text-xl font-bold">
        {meeting.date}
      </h3>

      <p className="text-gray-700">
        <strong>Meeting Type:</strong> {meeting.meetingType}
      </p>

      <p className="text-gray-700">
        <strong>Conducting:</strong> {meeting.conducting}
      </p>

      <p className="text-gray-700">
        <strong>Presiding:</strong> {meeting.presiding}
      </p>

      <p className="text-gray-700">
        <strong>Sacrament Hymn:</strong> #{meeting.sacramentHymn.number}{" "}
        {meeting.sacramentHymn.title}
      </p>

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-3 inline-block text-blue-600 hover:underline"
      >
        View Meeting Details
      </Link>
    </article>
  );
}