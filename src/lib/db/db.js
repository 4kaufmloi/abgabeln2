import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

const uri = env.MONGODB_URI;
const dbName = env.MONGODB_DBNAME;

if (!uri || !dbName) {
  throw new Error('Fehlende MongoDB-Umgebungsvariablen in .env');
}

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}
console.log("MONGODB_URI:", uri);
console.log("MONGODB_DBNAME:", dbName);
