import mongoose from "mongoose";
import { revalidateTag } from "next/cache";
import connectDB from "@/app/_db/conexion";
import exercise from "@/app/_db/models/exercises";
import { exerciseSchema } from "@/utils/schemas/exercise";
import { MONGODB_DUPLICATE_KEY_ERROR } from "@/utils/codeErrors/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const valdiation = exerciseSchema.safeParse(body);

    if (!valdiation.success) {
      return Response.json(
        { message: valdiation.error.issues[0].message },
        { status: 400 }
      );
    }

    const savedExercise = await exercise.create(valdiation.data);
    revalidateTag("get-all-exercises");
    return Response.json({ data: { id: savedExercise.id } }, { status: 201 });
  } catch (error) {
    if ((error as { code: number }).code === MONGODB_DUPLICATE_KEY_ERROR) {
      return Response.json({ message: "duplicate key error" }, { status: 400 });
    }
    if (error instanceof mongoose.Error.ValidationError) {
      const fieldError = error.errors[Object.keys(error.errors)[0]];
      if (fieldError.kind === "required") {
        return Response.json(
          { message: `${fieldError.path} is required` },
          { status: 400 }
        );
      }
    }
    console.log(error);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const exercises = await exercise.find();
    return Response.json({ data: exercises });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
