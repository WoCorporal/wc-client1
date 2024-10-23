export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "wc-client1";
export const MONGO_URL =
  process.env.MONGO_URL || `mongodb://localhost:27017/${MONGO_DB_NAME}`;
export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
