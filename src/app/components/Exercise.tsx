import { getExercises } from "@/services/exercises";

export async function ExerciseList() {
  const data = await getExercises();

  if (data.error) {
    throw new Error(data.message);
  }

  return (
    <ul>
      {data.data?.map((e) => (
        <li key={e.name}>{e.name}</li>
      ))}
    </ul>
  );
}
