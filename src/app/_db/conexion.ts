import mongoose from "mongoose";

export default function connect() {
  mongoose
    .connect("mongodb://localhost:27017/test")
    .then(() => console.log("db connected!"))
    .catch((error) => console.log(error));
}
