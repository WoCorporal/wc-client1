import Container from "@mui/material/Container";
import { ExerciseTable } from "@/app/components/DataGrid";
import { getExercises } from "@/services/exercises";

export async function ExerciseList() {
  const data = await getExercises();

  if (data.error) {
    throw new Error(data.message);
  }

  return (
    <Container maxWidth="lg">
      <ExerciseTable rows={data.data!} />
    </Container>
  );
}
