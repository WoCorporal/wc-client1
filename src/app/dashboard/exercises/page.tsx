import { Suspense } from "react";
import { ExerciseList } from "@/app/components/Exercise";

export default async function Page() {
  return (
    <div>
      <h1 className="text-center my-3 text-[1.5rem]">Ejercicios</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ExerciseList />
      </Suspense>
    </div>
  );
}
