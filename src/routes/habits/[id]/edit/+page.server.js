import { getHabitById, updateHabit } from '$lib/db/habits';
import { getAllCategories } from '$lib/db/categories';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const habit = await getHabitById(params.id);
	const categories = await getAllCategories();

	return { habit, categories };
}

export const actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();

		const updatedHabit = {
			title: formData.get('title'),
			description: formData.get('description'),
			category: formData.get('category'),
		};

		await updateHabit(params.id, updatedHabit);
		throw redirect(303, `/habits/${params.id}`);
	}
};
