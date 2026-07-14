import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 space-y-6">

      <header>
        <h1 className="text-3xl font-bold">
          Sacrament Meeting
        </h1>

        <p className="text-gray-600">
          {new Date(meeting.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <p>
          <strong>Meeting Type:</strong> {meeting.meetingType}
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-2">Presiding</h2>

        <p><strong>Presiding:</strong> {meeting.presiding}</p>
        <p><strong>Conducting:</strong> {meeting.conducting}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Opening Exercises</h2>

        <p>
          <strong>Opening Hymn:</strong> #{meeting.openingHymn.number}{" "}
          {meeting.openingHymn.title}
        </p>

        <p>
          <strong>Opening Prayer:</strong> {meeting.openingPrayer}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Ward Business</h2>

        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc list-inside">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p>No ward business.</p>
        )}

        <p className="mt-2">
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Sacrament</h2>

        <p>
          <strong>Sacrament Hymn:</strong> #{meeting.sacramentHymn.number}{" "}
          {meeting.sacramentHymn.title}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Speakers & Musical Numbers</h2>

        <ul className="space-y-2">
          {meeting.speakers.map((speaker, index) => (
            <li key={index} className="border rounded p-3">

              <p>
                <strong>{speaker.name}</strong>
              </p>

              <p>Type: {speaker.type}</p>

              {speaker.topic && (
                <p>Topic: {speaker.topic}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Closing Exercises</h2>

        <p>
          <strong>Closing Hymn:</strong> #{meeting.closingHymn.number}{" "}
          {meeting.closingHymn.title}
        </p>

        <p>
          <strong>Closing Prayer:</strong> {meeting.closingPrayer}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Announcements</h2>

        {meeting.announcements?.length ?? 0> 0 ? (
          <ul className="list-disc list-inside">
            {meeting.announcements?.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        ) : (
          <p>No announcements.</p>
        )}
      </section>

    </article>
  );
}