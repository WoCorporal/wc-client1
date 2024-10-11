import { BASE_URL } from "@/config/env_d";
import { ExerciseType } from "@/config/models_d";

type RequestResponse<TData> = {
  error: boolean;
  data?: TData;
  message?: string;
};

export async function createExercise(
  exercise: ExerciseType
): Promise<RequestResponse<{ id: string }>> {
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

export async function getExercises(): Promise<RequestResponse<ExerciseType[]>> {
  const promise = await fetch(`${BASE_URL}/api/exercise`, {
    next: { tags: ["get-all-exercises"] },
  });

  const data = await promise.json();

  if (!promise.ok) {
    return { error: true, message: data.message };
  }

  return { error: false, data: data.data };
}
