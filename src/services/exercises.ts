import { BASE_URL } from "@/config/env_d";
import { ExerciseType } from "@/config/models_d";

type RequestResponse = {
  error: boolean;
  data?: unknown;
  message?: string;
};

export async function createExercise(
  exercise: ExerciseType
): Promise<RequestResponse> {
  const promise = await fetch(`${BASE_URL}/api/exercise`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });

  const data = await promise.json();

  if (!promise.ok) {
    return { error: true, message: data.message };
  }
  return { error: false, data: data.data };
}
