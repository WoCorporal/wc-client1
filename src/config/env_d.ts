const { MONGO_URL: _MONGO_URL, MONGO_DB_NAME: _MONGO_DB_NAME } = process.env;

export const MONGO_DB_NAME = _MONGO_DB_NAME || "test";
export const MONGO_URL =
  _MONGO_URL || `mongodb://localhost:27017/${MONGO_DB_NAME}`;
