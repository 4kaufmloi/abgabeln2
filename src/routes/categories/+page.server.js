import { getAllCategories, createCategory, deleteCategory } from '$lib/db/categories';
import { redirect } from '@sveltejs/kit';

export async function load() {
	const categories = await getAllCategories();
	return { categories };
}

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		if (name) {
			await createCategory(name);
		}
		throw redirect(303, '/categories');
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (id) {
			await deleteCategory(id);
		}
		throw redirect(303, '/categories');
	}
};
