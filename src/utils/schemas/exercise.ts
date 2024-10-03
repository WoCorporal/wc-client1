import { z } from "zod";

export const exerciseSchema = z
  .object({
    name: z.string({ message: "name is required" }).trim(),
    description: z
      .string({ invalid_type_error: "description must be a string" })
      .trim(),
    difficulty: z
      .number({
        invalid_type_error: "difficulty must be a number",
        required_error: "difficulty is required",
      })
      .min(1, { message: "the difficulty should be between 1-5" })
      .max(5, { message: "the difficulty should be between 1-5" }),
    videos: z.array(z.string().url({ message: "invalid video url" }), {
      message: "videos should be a list",
    }),
    category: z.preprocess(
      (value) => {
        if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
          return value.map((v) => v.toLocaleLowerCase());
        }
        return value;
      },
      z.array(
        z.enum(
          ["resistencia", "fortalecimiento", "equilibrio", "flexibilidad"],
          {
            message: "invalid category type",
          }
        ),
        {
          invalid_type_error: "category should be a list",
          required_error: "category is required",
        }
      )
    ),
  })
  .partial({ description: true, videos: true });
