/* This is a database connection function*/
import mongoose from "mongoose";
import { MONGO_URL } from "@/config/env_d";

type IConnection = { isConnected?: number };
const connection: IConnection = {}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  try {
    if (connection.isConnected) {
      console.log("Ya existe una conexion, continuamos en esa!");
      return;
    }

    /* connecting to our database */
    const db = await mongoose.connect(MONGO_URL, {});

    connection.isConnected = db.connections[0].readyState;
    console.log("|> Mongo DB conectado ");
  } catch (e) {
    console.log("Error", e);
  }
}
export default dbConnect;
