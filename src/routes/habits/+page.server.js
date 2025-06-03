import { getAllHabits, getAllCategories, createHabit } from '$lib/db/habits';

export async function load() {
	const habits = await getAllHabits();
	const categories = await getAllCategories();

	return { habits, categories };
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const habit = {
			title: formData.get('name'),
			description: formData.get('description'),
			category: formData.get('category'),
			createdAt: new Date()
		};

		await createHabit(habit);
	}
};
