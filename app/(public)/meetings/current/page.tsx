import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default async function CurrentPage() {
  const meetings = await getMeetings();

  const today = new Date();
  const dayOfWeek = today.getUTCDay();

  const sunday = new Date(today);
  sunday.setUTCDate(today.getUTCDate() - dayOfWeek);

  const sundayDate = sunday.toISOString().split("T")[0];

  const currentMeeting = meetings.find(
    (meeting) => meeting.date === sundayDate
  );

  if (currentMeeting) {
    redirect(`/meetings/${currentMeeting.id}`);
  }

  redirect("/meetings");
}
