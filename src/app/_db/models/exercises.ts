import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "name is required"],
      trim: true,
    },
    description: { type: String, trim: true },
    difficulty: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    video: { type: String, trim: true },
    category: {
      type: [String],
      enum: ["resistencia", "fortalecimiento", "equilibrio", "flexibilidad"],
      lowercase: true,
      set: (values: string[]) => values.map((v) => v.toLowerCase()),
    },
  },
  { timestamps: true }
);

export default mongoose.models.Exercise || mongoose.model("Exercise", schema);
