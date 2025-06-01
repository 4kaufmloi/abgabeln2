import { getDb } from './db.js';
import { ObjectId } from 'mongodb';

export async function getAllCategories() {
	const db = await getDb();
	const categories = await db.collection('categories').find().sort({ name: 1 }).toArray();
	return categories.map(c => ({ id: c._id.toString(), name: c.name }));
}

export async function createCategory(name) {
	const db = await getDb();
	return await db.collection('categories').insertOne({ name });
}

export async function deleteCategory(id) {
	const db = await getDb();
	return await db.collection('categories').deleteOne({ _id: new ObjectId(id) });
}
