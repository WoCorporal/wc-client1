import { revalidateTag } from "next/cache";
import mongoose from "mongoose";
import connectDB from "@/app/_db/conexion";
import Exercise from "@/app/_db/models/exercises";
import { exerciseSchema } from "@/utils/schemas/exercise";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
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
    revalidateTag("get-all-exercises");
    return Response.json({ data: updated });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return Response.json({ message: "Invalid id" }, { status: 400 });
    }
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedDoc = await Exercise.findByIdAndDelete(params.id);
    if (!deletedDoc) {
      return Response.json({ message: "Resource not found" }, { status: 404 });
    }
    revalidateTag("get-all-exercises");
    return Response.json({ message: "deleted resource", data: deletedDoc });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return Response.json({ message: "Invalid id" }, { status: 400 });
    }
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
