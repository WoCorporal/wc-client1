import exercise from "@/app/_db/models/exercises";
import { exerciseSchema } from "@/utils/schemas/exercise";
import { MONGODB_DUPLICATE_KEY_ERROR } from "@/utils/codeErrors/mongodb";

export async function POST(req: Request) {
  const body = await req.json();
  const valdiation = exerciseSchema.safeParse(body);

  if (!valdiation.success) {
    console.log(valdiation.error);
    return Response.json(
      { message: valdiation.error.issues[0].message },
      { status: 400 }
    );
  }

  try {
    const savedExercise = await exercise.create(valdiation.data);
    return Response.json({ data: { id: savedExercise.id } }, { status: 201 });
  } catch (error) {
    console.log(error);
    if ((error as { code: number }).code === MONGODB_DUPLICATE_KEY_ERROR) {
      return Response.json({ message: "duplicate key error" }, { status: 400 });
    }
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
