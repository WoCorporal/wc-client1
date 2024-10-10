import { exerciseSchema } from "@/utils/schemas/exercise";
import { z } from "zod";

export type ExerciseType = z.infer<typeof exerciseSchema>;
