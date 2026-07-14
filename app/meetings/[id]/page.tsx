import { getMeetingById } from "@/lib/meetings-db";

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = getMeetingById(Number(id));

  if (!meeting) {
    return <h1>Meeting not found</h1>;
  }

  return (
    <div>
      <h1>{meeting.date}</h1>
      {/* render meeting details here */}
    </div>
  );
}