'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const hymnSchema = z.object ({
    number: z.number(),
    title: z.string(),
});

const CreateMeetingSchema = z.object({
    date: z.string().min(1),
    meetingType: z.string(),
    presiding: z.string(),
    conducting: z.string(),
    announcements: z.string(),
    openingHymn: hymnSchema,
    openingPrayer: z.string(),
    wardBusiness: z.string(),
    stakeBusiness: z.boolean(),   
    sacramentHymn: hymnSchema,
    speakers: z.string(),
    closingHymn: hymnSchema,
    closingPrayer: z.string(),   
});

export type State = {
  errors?: {
    date?: string[];
    meeting_type?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymn?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];  
    sacramentHymn?: string[];
    speakers?: string[];
    closingHymn?: string[];
    closingPrayer?: string[];
    yearCompleted?: string[];
  };
  message?: string | null;
};

export async function createMeeting(_prevState: State, formData: FormData): Promise<State> {
  const validatedFields = CreateMeetingSchema.safeParse({
    date: formData.get('date'),
    meeting_type: formData.get('meeting_type'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: formData.get('announcements'),
    openingHymn: formData.get('openingHymn'),
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: formData.get('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness'),   
    sacramentHymn: formData.get('sacramentHymn'),
    speakers: formData.get('speakers'),
    closingHymn: formData.get('closingHymn'),
    closingPrayer: formData.get('closingPrayer'),
    yearCompleted: formData.get('yearCompleted'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create meeting.',
    };
  }

  const {     
    date, 
    meetingType, 
    presiding,
    conducting,
    announcements,
    openingHymn,
    openingPrayer,
    wardBusiness,
    stakeBusiness,  
    sacramentHymn,
    speakers,
    closingHymn,
    closingPrayer,
     } = validatedFields.data;

  try {
    await sql`
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
        ${date}, 
        ${meetingType}, 
        ${presiding}, 
        ${conducting},
        ${announcements},
        ${JSON.stringify(openingHymn)},
        ${openingPrayer},
        ${wardBusiness},
        ${stakeBusiness},  
        ${JSON.stringify(sacramentHymn)},
        ${speakers},
        ${JSON.stringify(closingHymn)},
        ${closingPrayer}
      )
    `;
  } catch {
    return {
      message: 'Database Error: Failed to create meeting.',
    };
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(id: string, formData: FormData) {
  const validatedFields = CreateMeetingSchema.safeParse({
    date: formData.get('date'),
    meeting_type: formData.get('meeting_type'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: formData.get('announcements'),
    openingHymn: formData.get('openingHymn'),
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: formData.get('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness'),   
    sacramentHymn: formData.get('sacramentHymn'),
    speakers: formData.get('speakers'),
    closingHymn: formData.get('closingHymn'),
    closingPrayer: formData.get('closingPrayer'),
    yearCompleted: formData.get('yearCompleted'),
  });

  if (!validatedFields.success) {
    throw new Error('Invalid meeting input.');
  }

  const {
    date,
    meetingType,
    presiding,
    conducting,
    announcements,
    openingHymn,
    openingPrayer,
    wardBusiness,
    stakeBusiness,   
    sacramentHymn,
    speakers,
    closingHymn,
    closingPrayer,
  } = validatedFields.data;

  try {
    await sql`
        UPDATE meetings
        SET
            date = ${date},
            meeting_type = ${meetingType},
            presiding = ${presiding},
            conducting = ${conducting},
            announcements = ${announcements},
            opening_hymn = ${JSON.stringify(openingHymn)},
            opening_prayer = ${openingPrayer},
            ward_business = ${wardBusiness},
            stake_business = ${stakeBusiness},
            sacrament_hymn =  ${JSON.stringify(sacramentHymn)},
            speakers = ${speakers},
            closing_hymn = ${JSON.stringify(closingHymn)},
            closing_prayer = ${closingPrayer},
        WHERE id = ${id}
        `;
  } catch (error) {
    console.error('Failed to update meeting:', error);
    throw new Error('Database Error: Failed to update meeting.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: number) {
  try {
    await sql`
      DELETE FROM meetings
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error('Database Error: Failed to delete meeting.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}