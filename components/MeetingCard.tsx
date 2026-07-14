import Link from "next/link";

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
    return ( 
        <Link href={` /meetings/${meeting.id}`}>
            <div className="rouonded-lg border p-4 shadow">
                <h2>{meeting.title}</h2>
                <p>{meeting.date}</p>
            </div>
        </Link>
    )
}