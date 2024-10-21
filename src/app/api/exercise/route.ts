import mongoose from "mongoose";
import exercise from "@/app/_db/models/exercises";
import { exerciseSchema } from "@/utils/schemas/exercise";
import { MONGODB_DUPLICATE_KEY_ERROR } from "@/utils/codeErrors/mongodb";
import dbConnect from "@/app/_db/conexion";
import { NextResponse } from "next/server";

// POST: Crear un nuevo ejercicio
export async function POST(req: Request) {
  // Leer el cuerpo de la solicitud
  const body = await req.json();

  // Validar los datos con Zod
  const validation = exerciseSchema.safeParse(body);
  if (!validation.success) {
    console.log(validation.error);
    return NextResponse.json(
      { message: validation.error.issues[0].message }, 
      { status: 400 }
    );
  }

  try {
    // Conectar a la base de datos
    await dbConnect();

    // Crear el ejercicio y guardarlo en la base de datos
    const savedExercise = await exercise.create(validation.data);
    return NextResponse.json({ data: { id: savedExercise.id } }, { status: 201 });
  } catch (error) {
    // Manejo de errores específicos de MongoDB (clave duplicada)
    if ((error as { code: number }).code === MONGODB_DUPLICATE_KEY_ERROR) {
      return NextResponse.json({ message: "duplicate key error" }, { status: 400 });
    }

    // Manejo de errores de validación de Mongoose
    if (error instanceof mongoose.Error.ValidationError) {
      const fieldError = error.errors[Object.keys(error.errors)[0]];
      if (fieldError.kind === "required") {
        return NextResponse.json(
          { message: `${fieldError.path} is required` }, 
          { status: 400 }
        );
      }
    }

    // Manejo general de errores
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error." }, 
      { status: 500 }
    );
  }
}

// GET: Listar o filtrar ejercicios por categoría o dificultad
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");

  try {
    // Conectar a la base de datos
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

    // Buscar ejercicios con el filtro
    const exercises = await exercise.find(filter);

    // Si no hay resultados
    if (exercises.length === 0) {
      return NextResponse.json({ message: "No exercises found" }, { status: 404 });
    }

    return NextResponse.json(exercises, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los ejercicios:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
