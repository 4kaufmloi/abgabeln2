import { getAllHabits, getAllCategories} from '$lib/db/habits';

export async function load() {
	const habits = await getAllHabits();
	const categories = await getAllCategories();

	return { habits, categories };
}
