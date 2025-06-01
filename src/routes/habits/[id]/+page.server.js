import { getHabitById, deleteHabit } from '$lib/db/habits';
import {
	getEntriesByHabit,
	deleteEntriesByHabit,
	getStreakForHabit
} from '$lib/db/entries';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const habit = await getHabitById(params.id);
	const entries = await getEntriesByHabit(params.id);
	const streak = await getStreakForHabit(params.id); // NEU

	if (!habit) {
		throw error(404, 'Habit nicht gefunden');
	}

	return {
		habit,
		entries,
		streak
	};
}

export const actions = {
	delete: async ({ params }) => {
		console.log('Lösche Habit:', params.id);
		const result = await deleteHabit(params.id);
		console.log('Löschresultat:', result);

		if (result.deletedCount === 0) {
			return fail(404, { message: 'Nicht gefunden oder bereits gelöscht' });
		}

		await deleteEntriesByHabit(params.id);
		throw redirect(303, '/habits');
	}
};
