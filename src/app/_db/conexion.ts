import mongoose from "mongoose";

export default function connect() {
  mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => console.log("db connected!"))
    .catch((error) => console.log(error));
}
