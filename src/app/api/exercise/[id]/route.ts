import Exercise from "@/app/_db/models/exercises";
import { exerciseSchema } from "@/utils/schemas/exercise";
import mongoose from "mongoose";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    // partial() makes all fields optional
    const validation = exerciseSchema.partial().safeParse(body);

    if (!validation.success) {
      return Response.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const updated = await Exercise.findByIdAndUpdate(
      params.id,
      validation.data,
      {
        new: true, // return the updated document insted of the original
        runValidators: true, // check field validations
      }
    );
    return Response.json({ data: updated });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return Response.json({ message: "Invalid id" }, { status: 400 });
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
