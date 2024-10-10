const {
  MONGO_URL: _MONGO_URL, // mongodb url
  MONGO_DB_NAME: _MONGO_DB_NAME, // database name
  BASE_URL: _BASE_URL, // server base url
} = process.env;

export const MONGO_DB_NAME = _MONGO_DB_NAME || "test";
export const MONGO_URL =
  _MONGO_URL || `mongodb://localhost:27017/${MONGO_DB_NAME}`;
export const BASE_URL = _BASE_URL || "http://localhost:3000";
