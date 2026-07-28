import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = '',
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

// Mutation stubs — will be wired to the database in Week 04
export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${data.announcements ?? []},
      ${JSON.stringify(data.openingHymn)},
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)},
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)},
      ${JSON.stringify(data.speakers)},
      ${JSON.stringify(data.closingHymn)},
      ${data.closingPrayer}
    )
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
  `;

  return rows[0] as unknown as SacramentMeeting;
}

export async function updateMeeting(
  id: number,
  updates: Partial<Omit<SacramentMeeting, 'id'>>
): Promise<SacramentMeeting | null> {
  const currentMeeting = await getMeetingById(id);

  if (!currentMeeting) {
    return null;
  }

  const updatedMeeting = {
    ...currentMeeting,
    ...updates,
  };

  const rows = await sql`
    UPDATE meetings
    SET
      date = ${updatedMeeting.date},
      meeting_type = ${updatedMeeting.meetingType},
      presiding = ${updatedMeeting.presiding},
      conducting = ${updatedMeeting.conducting},
      announcements = ${updatedMeeting.announcements ?? []},
      opening_hymn = ${JSON.stringify(updatedMeeting.openingHymn)},
      opening_prayer = ${updatedMeeting.openingPrayer},
      ward_business = ${JSON.stringify(updatedMeeting.wardBusiness)},
      stake_business = ${updatedMeeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(updatedMeeting.sacramentHymn)},
      speakers = ${JSON.stringify(updatedMeeting.speakers)},
      closing_hymn = ${JSON.stringify(updatedMeeting.closingHymn)},
      closing_prayer = ${updatedMeeting.closingPrayer}
    WHERE id = ${id}
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}
