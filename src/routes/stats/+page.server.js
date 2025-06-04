import { getAllHabits } from '$lib/db/habits';
import {
	getEntriesByDate,
	getStreakForHabit
} from '$lib/db/entries';

export async function load() {
	const rawHabits = await getAllHabits();

	const today = new Date();
	const todayStr = today.toISOString().split('T')[0];

	const todayEntries = await getEntriesByDate(todayStr);
	const doneToday = todayEntries.length;

	const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
	const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	const allMonthEntries = [];
	for (let d = new Date(monthStart); d <= monthEnd; d.setDate(d.getDate() + 1)) {
		const dateStr = new Date(d).toISOString().split('T')[0];
		const entries = await getEntriesByDate(dateStr);
		allMonthEntries.push(...entries);
	}

	const habits = [];
	const streaks = {};
	for (const habit of rawHabits) {
		const id = habit._id.toString();
		const title = habit.title || habit.name || 'Ohne Titel';
		habits.push({ ...habit, id, title });
		streaks[id] = await getStreakForHabit(habit._id);
	}

	return {
		stats: {
			totalHabits: habits.length,
			doneToday,
			last7Days: [...Array(7).keys()].map(i => {
				const d = new Date();
				d.setDate(today.getDate() - (6 - i));
				const dateStr = d.toISOString().split('T')[0];
				const count = allMonthEntries.filter(e => e.date.startsWith(dateStr)).length;
				return { date: dateStr, count };
			}),
			streaks
		},
		habits,
		entries: allMonthEntries 
	};
}
