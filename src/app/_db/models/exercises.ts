import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    videos: { type: [String] },
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
