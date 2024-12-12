const isNotProduction = process.env.NODE_ENV !== "production";

if (isNotProduction) {
	const dotenv = await import("dotenv");
	dotenv.config();
}

import { MongoClient } from "mongodb";

const CONNECTION_STRING = process.env.MONGODB_CONN_STRING;
const DATABASE_NAME = process.env.MONGODB_DB_NAME;

let client = null;

const getClientInstance = async () => {
	if (!client) {
		client = await MongoClient.connect(CONNECTION_STRING);
		await client.connect();
	}

	return client;
};

const getDb = async () => {
	const client = await getClientInstance();
	return client.db(DATABASE_NAME);
};

export { getClientInstance, getDb };
