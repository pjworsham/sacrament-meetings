'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addMeeting as addMeetingToDatabase,
  updateMeeting as updateMeetingInDatabase,
  deleteMeeting as deleteMeetingFromDatabase,
} from './meetings-db';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';

export async function createUser(
  prevState: string | undefined,
  formData: FormData
) {
  
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    return "All fields are required.";
  }

  // Check for an existing user
  const existing = await sql`
    SELECT id
    FROM users
    WHERE email = ${email}
  `;

  if (existing.rows.length > 0) {
    return "An account with this email already exists.";
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user
  await sql`
    INSERT INTO users (name, email, password_hash)
    VALUES (
      ${name},
      ${email},
      ${hashedPassword}
    )
  `;

  return "Account created successfully.";
}

async function requireOwnerSession() {
  const session = await auth();
  if (!session?.user) throw new Error('Not authenticated');
  return session;
}

const hymnSchema = z.object({
  number: z.coerce.number().int().positive('Enter a valid hymn number.'),
  title: z.string().min(1, 'Enter the hymn title.'),
});

const wardBusinessSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, 'Enter the ward business description.'),
});

const speakerSchema = z.object({
  name: z.string().trim().min(1, 'Enter the speaker name.'),
  topic: z.string().trim().min(1, 'Enter the speaker topic.'),
  type: z.enum(['speaker', 'musical-number']),
});

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Select a date.'),

  meetingType: z.enum([
    'testimony',
    'regular',
    'stake',
    'general',
  ]),

  presiding: z.string().trim().min(1, 'Enter who is presiding.'),
  conducting: z.string().trim().min(1, 'Enter who is conducting.'),

  announcements: z.array(z.string()),

  openingHymn: hymnSchema,
  openingPrayer: z.string().trim().min(1, 'Enter the opening prayer.'),

  wardBusiness: z.array(wardBusinessSchema),
  stakeBusiness: z.boolean(),

  sacramentHymn: hymnSchema,

  speakers: z.array(speakerSchema),

  closingHymn: hymnSchema,
  closingPrayer: z.string().trim().min(1, 'Enter the closing prayer.'),
});

export type State = {
  errors?: Record<string, string[] | undefined>;
  message?: string | null;
};

function getMeetingFormValues(formData: FormData) {
  const announcements =
    String(formData.get('announcements') ?? '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

  return {
    date: formData.get('date'),
    meetingType: formData.get('meeting_type'),

    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),

    announcements,

    openingHymn: {
      number: formData.get('openingHymnNumber'),
      title: formData.get('openingHymnTitle'),
    },

    openingPrayer: formData.get('openingPrayer'),

    wardBusiness: [
      {
        description: String(formData.get('wardBusiness') ?? ''),
      },
    ],

    stakeBusiness: formData.get('stakeBusiness') === 'on',

    sacramentHymn: {
      number: formData.get('sacramentHymnNumber'),
      title: formData.get('sacramentHymnTitle'),
    },

    speakers: [
      {
        name: String(formData.get('speakerName') ?? ''),
        topic: String(formData.get('speakerTopic') ?? ''),
        type: formData.get('speakerType'),
      },
    ],

    closingHymn: {
      number: formData.get('closingHymnNumber'),
      title: formData.get('closingHymnTitle'),
    },

    closingPrayer: formData.get('closingPrayer'),
  };
}

export async function createMeeting(
  _prevState: State,
  formData: FormData
): Promise<State> {
    await requireOwnerSession();
  const validatedFields = MeetingFormSchema.safeParse(
    getMeetingFormValues(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create meeting.',
    };
  }

  try {
    await addMeetingToDatabase(validatedFields.data);
  } catch (error) {
    console.error('Failed to create meeting:', error);
    throw new Error('Unable to create the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: State,
  formData: FormData
): Promise<State> {
    await requireOwnerSession();
  const validatedFields = MeetingFormSchema.safeParse(
    getMeetingFormValues(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update meeting.',
    };
  }

  try {
    const updatedMeeting = await updateMeetingInDatabase(
      id,
      validatedFields.data
    );

    if (!updatedMeeting) {
      return {
        message: 'Meeting not found.',
      };
    }
  } catch (error) {
    console.error('Failed to update meeting:', error);
    throw new Error('Unable to update the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    const meetingWasDeleted =
      await deleteMeetingFromDatabase(id);

    if (!meetingWasDeleted) {
      throw new Error('Meeting not found.');
    }
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error('Database Error: Failed to delete meeting.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error; // re-throw so Next.js handles redirects correctly
  }
}
