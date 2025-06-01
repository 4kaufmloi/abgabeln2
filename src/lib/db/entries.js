import { ObjectId } from 'mongodb';
import { getDb } from './db.js';

export async function getEntriesByDate(date) {
	const db = await getDb();

	const entries = await db
		.collection('entries')
		.find({ date: { $regex: `^${date}` } })
		.toArray();

	return entries.map((entry) => ({
		...entry,
		_id: entry._id.toString(),
		habitId: entry.habitId?.toString?.() || entry.habitId
	}));
}

export async function getEntryById(id) {
	const db = await getDb();
	const entry = await db.collection('entries').findOne({ _id: new ObjectId(id) });

	if (!entry) return null;

	return {
		...entry,
		_id: entry._id.toString(),
		habitId: entry.habitId?.toString?.() || entry.habitId
	};
}

export async function createEntry({ habitId, date, status = true }) {
	const db = await getDb();

	return await db.collection('entries').insertOne({
		habitId: new ObjectId(habitId),
		date,
		status
	});
}

export async function deleteEntry(id) {
	const db = await getDb();
	return await db.collection('entries').deleteOne({ _id: new ObjectId(id) });
}

export async function getEntriesByHabit(habitId) {
	const db = await getDb();

	const entries = await db
		.collection('entries')
		.find({ habitId: new ObjectId(habitId) })
		.toArray();

	return entries.map((entry) => ({
		...entry,
		_id: entry._id.toString(),
		habitId: entry.habitId?.toString?.() || entry.habitId
	}));
}

export async function deleteEntriesByHabit(habitId) {
	const db = await getDb();
	await db.collection('entries').deleteMany({ habitId: new ObjectId(habitId) });
}

export async function getStreakForHabit(habitId) {
	const db = await getDb();

	const entries = await db
		.collection('entries')
		.find({ habitId: new ObjectId(habitId) })
		.sort({ date: -1 })
		.toArray();

	let streak = 0;
	let today = new Date();
	today.setHours(0, 0, 0, 0); 

	for (const entry of entries) {
		const entryDate = new Date(entry.date);
		entryDate.setHours(0, 0, 0, 0);

		if (entryDate.getTime() === today.getTime()) {
			streak++;
			today.setDate(today.getDate() - 1);
		} else if (entryDate.getTime() === new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).getTime()) {
			streak++;
			today.setDate(today.getDate() - 1);
		} else {
			break;
		}
	}

	return streak;
}
