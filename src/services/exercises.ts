import { BASE_URL } from "@/config/env_d";
import { ExerciseType } from "@/config/models_d";

type RequestResponse<TData> = {
  error: boolean;
  data?: TData;
  message?: string;
};

type Exercise = ExerciseType & { _id: string }; // schema from db

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

export async function getExercises(): Promise<RequestResponse<Exercise[]>> {
  const promise = await fetch(`${BASE_URL}/api/exercise`, {
    next: { tags: ["get-all-exercises"] },
  });

  const data = await promise.json();

  if (!promise.ok) {
    return { error: true, message: data.message };
  }

  return { error: false, data: data.data };
}

export async function updateExercise(
  exercise: Exercise
): Promise<RequestResponse<Exercise>> {
  const { _id, ...updatedExercise } = exercise;
  const promise = await fetch(`${BASE_URL}/api/exercise/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedExercise),
  });

  const data = await promise.json();

  if (!promise.ok) {
    return { error: true, message: data.message };
  }

  return { error: false, data: data.data };
}

export async function deleteExercise(
  id: string
): Promise<RequestResponse<Exercise>> {
  const promisea = await fetch(`${BASE_URL}/api/exercise/${id}`, {
    method: "DELETE",
  });
  const data = await promisea.json();
  if (!promisea.ok) {
    return { error: true, message: data.message };
  }
  return { error: false, data: data.data };
}
