import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default async function CurrentPage() {
  const meetings = await getMeetings();

  const today = new Date();
  const dayOfWeek = today.getUTCDay();

  // Calculate the upcoming Sunday.
  const daysUntilSunday = (7 - dayOfWeek) % 7;

  const sunday = new Date(today);
  sunday.setUTCDate(today.getUTCDate() + daysUntilSunday);

  const sundayDate = sunday.toISOString().split("T")[0];

  const currentMeeting = meetings.find(
    (meeting) => meeting.date === sundayDate
  );

  if (currentMeeting) {
    redirect(`/meetings/${currentMeeting.id}`);
  }

  redirect("/meetings");
}
