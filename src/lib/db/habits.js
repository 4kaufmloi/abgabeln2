import { getDb } from './db.js';
import { ObjectId } from 'mongodb';

export async function getAllHabits() {
	const db = await getDb();
	const rawHabits = await db.collection('habits').find().toArray();

	return rawHabits.map((habit) => ({
		...habit,
		_id: habit._id.toString()
	}));
}

export async function getHabitById(id) {
	const db = await getDb();
	const habit = await db.collection('habits').findOne({ _id: new ObjectId(id) });

	if (!habit) return null;

	return {
		...habit,
		_id: habit._id.toString()
	};
}

export async function createHabit(habit) {
	const db = await getDb();
	return db.collection('habits').insertOne(habit);
}

export async function deleteHabit(id) {
	const db = await getDb();
	return db.collection('habits').deleteOne({ _id: new ObjectId(id) });
}

export async function getAllCategories() {
	const db = await getDb();
	const categories = await db.collection('habits').distinct('category');
	return categories;
}

export async function updateHabit(id, update) {
	const db = await getDb();
	return db.collection('habits').updateOne(
		{ _id: new ObjectId(id) },
		{ $set: update }
	);
}