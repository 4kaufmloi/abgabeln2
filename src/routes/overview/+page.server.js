import { getAllHabits } from '$lib/db/habits';
import { getEntriesByDate } from '$lib/db/entries';

export async function load() {
	const habits = await getAllHabits();
	const today = new Date().toISOString().split('T')[0];
	const entries = await getEntriesByDate(today);

	const doneHabitIds = entries.map(entry => entry.habitId.toString?.() || entry.habitId);

	return {
		habits,
		entries, 
		doneHabitIds,
		stats: {
			date: today,
			total: habits.length,
			done: doneHabitIds.length,
			percent: habits.length
				? Math.round((doneHabitIds.length / habits.length) * 100)
				: 0
		}
	};
}
