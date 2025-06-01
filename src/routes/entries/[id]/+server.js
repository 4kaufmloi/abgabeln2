import { createEntry } from '$lib/db/entries';
import { redirect } from '@sveltejs/kit';

export const POST = async ({ params }) => {
  const today = new Date().toISOString().split('T')[0];

  const newEntry = {
    habitId: params.id,
    date: today,
    status: true
  };

  console.log('Neuer Eintrag:', newEntry);

  await createEntry(newEntry);

  throw redirect(303, '/'); 
};
