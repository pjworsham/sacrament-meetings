import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingById, } from '@/lib/meetings-db';


export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }
  return (
    <main>
      <h1>Edit Meeting</h1>

      <MeetingForm meeting={meeting} />
    </main>
  );
}