import { getMeetingById } from "@/lib/meetings-db";
import  MeetingDetail from "@/components/MeetingDetail";

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

  return <MeetingDetail meeting={meeting} />;
}