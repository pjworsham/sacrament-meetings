'use client';

import { useActionState } from "react";

import {
    createMeeting,
    updateMeeting,
    type State,
} from "@/lib/actions";

import type { SacramentMeeting } from '@/lib/types';


type MeetingFormProps = {
  meeting?: SacramentMeeting;
};

const initialState: State = {
  errors: {},
  message: null,
};

export default function MeetingForm({
  meeting,
}: MeetingFormProps) {
  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;

  const [state, formAction, isPending] = useActionState(
    action,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
>
      <div>
      <label
        htmlFor="date"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Date
      </label>

      <input
        id="date"
        name="date"
        type="date"
        defaultValue={meeting?.date ?? ''}
        className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
        aria-describedby="date-error"
        required
      />

      <div
        id="date-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.date?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>
    </div>

      <div>
        <label
          htmlFor="meeting_type"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Meeting Type
        </label>

        <select
          id="meeting_type"
          name="meeting_type"
          defaultValue={meeting?.meetingType ?? 'regular'}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
          aria-describedby="meetingType-error"
          required
         >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
        </select>
           <div id="meetingType-error" aria-live="polite" aria-atomic="true">
          {state.errors?.meetingType?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="presiding">Presiding</label>
        <input
          id="presiding"
          name="presiding"
          type="text"
          defaultValue={meeting?.presiding ?? ''}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
          aria-describedby="presiding-error"
          required
        />
         <div id="presiding-error" aria-live="polite" aria-atomic="true">
          {state.errors?.presiding?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="conducting">Conducting</label>
        <input
          id="conducting"
          name="conducting"
          type="text"
          defaultValue={meeting?.conducting ?? ''}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
          aria-describedby="conducting-error"
          required
          />
           <div id="conducting-error" aria-live="polite" aria-atomic="true">
            {state.errors?.conducting?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
      </div>

      <div>
        <label htmlFor="announcements">
          Announcements, separated by commas
        </label>
        <textarea
          id="announcements"
          name="announcements"
          defaultValue={meeting?.announcements?.join(', ') ?? ''}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
          aria-describedby="announcements-error"
          required
          />
          <div id="announcements-error" aria-live="polite" aria-atomic="true">
          {state.errors?.announcements?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
          </div>
      </div>

      <fieldset
        className="space-y-3 rounded-md border border-slate-300 p-4"
        aria-describedby="openingHymn-error"
      >
        <legend className="px-2 font-medium text-slate-700">
          Opening Hymn
        </legend>

        <div>
          <label
            htmlFor="openingHymnNumber"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Hymn Number
          </label>

          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            defaultValue={meeting?.openingHymn.number ?? ''}
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="openingHymnTitle"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Hymn Title
          </label>

          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            type="text"
            defaultValue={meeting?.openingHymn.title ?? ''}
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            required
          />
        </div>
        
      </fieldset>
       <div id="openingHymn-error" aria-live="polite" aria-atomic="true">
          {state.errors?.openingHymn?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>

      <div>
        <label htmlFor="openingPrayer">Opening Prayer</label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          defaultValue={meeting?.openingPrayer ?? ''}
          aria-describedby="openingPrayer-error"
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
          required
          />
          <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.openingPrayer?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
          </div>
      </div>

      <div>
      <label
        htmlFor="wardBusiness"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Ward Business
      </label>

      <textarea
        id="wardBusiness"
        name="wardBusiness"
        defaultValue={
          meeting?.wardBusiness
            .map((item) => item.description)
            .join(', ') ?? ''
        }
        className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
        aria-describedby="wardBusiness-error"
        required
      />

      <div
        id="wardBusiness-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.wardBusiness?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>
    </div>

      <div>
      <label
        htmlFor="stakeBusiness"
        className="flex items-center gap-2 text-sm font-medium text-slate-700"
      >
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          defaultChecked={meeting?.stakeBusiness ?? false}
          aria-describedby="stakeBusiness-error"
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        Stake Business
      </label>

      <div
        id="stakeBusiness-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.stakeBusiness?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>
    </div>

      <fieldset
        className="space-y-4 rounded-md border border-slate-300 p-4"
        aria-describedby="sacramentHymn-error"
      >
        <legend className="px-2 text-sm font-medium text-slate-700">
          Sacrament Hymn
        </legend>

        <div>
          <label
            htmlFor="sacramentHymnNumber"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Hymn Number
          </label>

          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            defaultValue={meeting?.sacramentHymn.number ?? ''}
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="sacramentHymnTitle"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Hymn Title
          </label>

          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            type="text"
            defaultValue={meeting?.sacramentHymn.title ?? ''}
            aria-describedby="sacramentHymn-error"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            required
          />
        </div>
      </fieldset>

      <div
        id="sacramentHymn-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.sacramentHymn?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      <fieldset
        className="space-y-4 rounded-md border border-slate-300 p-4"
        aria-describedby="speakers-error"
      >
        <legend className="px-2 text-sm font-medium text-slate-700">
          Speaker
        </legend>

        <div>
          <label
            htmlFor="speakerName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Speaker Name
          </label>

          <input
            id="speakerName"
            name="speakerName"
            type="text"
            defaultValue={meeting?.speakers[0]?.name ?? ''}
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="speakerTopic"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Speaker Topic
          </label>

          <input
            id="speakerTopic"
            name="speakerTopic"
            type="text"
            defaultValue={meeting?.speakers[0]?.topic ?? ''}
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="speakerType"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Speaker Type
          </label>

          <select
            id="speakerType"
            name="speakerType"
            defaultValue={meeting?.speakers[0]?.type ?? 'speaker'}
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            required
          >
            <option value="speaker">Speaker</option>
            <option value="musical-number">Musical Number</option>
          </select>
        </div>
      </fieldset>

      <div
        id="speakers-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.speakers?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>



      <fieldset
        className="space-y-4 rounded-md border border-slate-300 p-4"
        aria-describedby="closingHymn-error"
      >
        <legend className="px-2 text-sm font-medium text-slate-700">
          Closing Hymn
        </legend>

        <div>
          <label
            htmlFor="closingHymnNumber"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Hymn Number
          </label>

          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            defaultValue={meeting?.closingHymn.number ?? ''}
            aria-describedby="closingHymn-error"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="closingHymnTitle"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Hymn Title
          </label>

          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            type="text"
            defaultValue={meeting?.closingHymn.title ?? ''}
            aria-describedby="closingHymn-error"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            required
          />
        </div>
      </fieldset>

      <div
        id="closingHymn-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.closingHymn?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>
    
      <div>
      <label
        htmlFor="closingPrayer"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Closing Prayer
      </label>

      <input
        id="closingPrayer"
        name="closingPrayer"
        type="text"
        defaultValue={meeting?.closingPrayer ?? ''}
        className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
        aria-describedby="closingPrayer-error"
        required
      />

      <div
        id="closingPrayer-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.closingPrayer?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>
    </div>

    <div aria-live="polite" aria-atomic="true">
      {state.message && (
        <p className="text-sm text-red-600">
          {state.message}
        </p>
      )}
    </div>

      <button type="submit" disabled={isPending}>
        {isPending
          ? 'Saving...'
          : meeting
            ? 'Update Meeting'
            : 'Create Meeting'}
      </button>
    </form>
  );
}














