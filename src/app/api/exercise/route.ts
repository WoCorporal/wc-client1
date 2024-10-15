import mongoose from "mongoose";
import exercise from "@/app/_db/models/exercises";
import { exerciseSchema } from "@/utils/schemas/exercise";
import { MONGODB_DUPLICATE_KEY_ERROR } from "@/utils/codeErrors/mongodb"
import dbConnect from "@/app/_db/conexion";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const validation = exerciseSchema.safeParse(body);

  if (!validation.success) {
    console.log(validation.error);
    return NextResponse.json(
      { message: validation.error.issues[0].message },
      { status: 400 }
    );
  }

  try {
    const savedExercise = await exercise.create(validation.data);
    return NextResponse.json({ data: { id: savedExercise.id } }, { status: 201 });
  } catch (error) {
    if ((error as { code: number }).code === MONGODB_DUPLICATE_KEY_ERROR) {
      return NextResponse.json({ message: "duplicate key error" }, { status: 400 });
    }
    if (error instanceof mongoose.Error.ValidationError) {
      const fieldError = error.errors[Object.keys(error.errors)[0]];
      if (fieldError.kind === "required") {
        return NextResponse.json(
          { message: `${fieldError.path} is required` },
          { status: 400 }
        );
      }
    }
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");

  try {
    await dbConnect();

    const filter: {
      category?: string;
      difficulty?: number;
    } = {}; 

    if (category) {
      filter.category = category.toLowerCase();
    }

    if (difficulty) {
      filter.difficulty = parseInt(difficulty);
    }

    const exercises = await exercise.find(filter);
    return NextResponse.json(exercises);
  } catch (error) {
    console.error(error); // Registrar el error
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
