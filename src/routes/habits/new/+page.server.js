import { createHabit } from '$lib/db/habits';
import { getAllCategories } from '$lib/db/categories';
import { redirect } from '@sveltejs/kit';

export async function load() {
	const categories = await getAllCategories();
	return { categories };
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const newHabit = {
			title: formData.get('name'),
			description: formData.get('description'),
			category: formData.get('category'),
			frequency: formData.get('frequency'),
			createdAt: new Date()
		};
		await createHabit(newHabit);
		throw redirect(303, '/habits');
	}
};
