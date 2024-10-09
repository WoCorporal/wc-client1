"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExercise } from "@/services/exercises";
import { exerciseSchema } from "@/utils/schemas/exercise";
import { ExerciseType } from "@/config/models_d";

export default function AgregarEjercicio() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExerciseType>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      category: [],
    },
  });

  const onSubmit: SubmitHandler<ExerciseType> = async (data) => {
    const result = await createExercise(data);
    if (result.error) {
      alert(result.message);
    } else {
      reset();
      alert(`Exercise created.\nID: ${(result.data as { id: string }).id}`);
    }
  };

  return (
    <section className="w-full h-screen flex flex-col items-center py-5 gap-y-4 bg-slate-950">
      <h1 className="text-lg font-normal text-black bg-[#EBF400] px-2">
        <span className="font-bold text-2xl italic">WO</span> Corporal
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex gap-x-4">
          <div className="flex flex-col gap-y-2">
            <label
              className="after:content-['*'] after:text-red-600 font-normal text-neutral-300"
              htmlFor=""
            >
              Nombre
            </label>
            <input
              required
              {...register("name")}
              placeholder="Ej: Press de banca"
              //   autoComplete="off"
              className="bg-slate-900 border-neutral-800 text-white border-[1px] py-2 px-2 focus:border-neutral-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-base text-small text-center">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label
              className="after:content-['*'] after:text-red-600 font-normal text-neutral-300"
              htmlFor=""
            >
              Categoría
            </label>
            <select
              {...register("category")}
              className="bg-slate-900 border-neutral-800 text-white border-[1px] py-[11px] px-2 focus:border-neutral-500 focus:outline-none"
              multiple
            >
              <option value="resistencia">Resistencia</option>
              <option value="fortalecimiento">Fortalecimiento</option>
              <option value="equilibrio">Equilibrio</option>
              <option value="flexibilidad">Flexibilidad</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-base text-small text-center">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="font-normal text-neutral-300" htmlFor="">
            Descripción
          </label>
          <textarea
            {...register("description")}
            className="bg-slate-900 border-neutral-800 text-white border-[1px] py-2 px-2 focus:border-neutral-500 focus:outline-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-base text-small text-center">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label
            className="after:content-['*'] after:text-red-600 font-normal text-neutral-300"
            htmlFor=""
          >
            Nivel de dificultad
          </label>
          <select
            {...register("difficulty")}
            className="bg-slate-900 border-neutral-800 text-neutral-400 border-[1px] py-2 px-2 focus:border-neutral-500 focus:outline-none"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.difficulty && (
            <p className="text-red-500 text-base text-small text-center">
              {errors.difficulty.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label
            className="after:content-['(Opcional)'] after:text-neutral-500 after:ml-2 text-neutral-300"
            htmlFor=""
          >
            Video
          </label>
          <input
            {...register("video")}
            autoComplete="off"
            className="bg-slate-900 border-neutral-800 text-white border-[1px] py-2 px-2 focus:border-neutral-500 focus:outline-none"
          />
          {errors.video && (
            <p className="text-red-500 text-base text-small text-center">
              {errors.video.message}
            </p>
          )}
        </div>
        <button className="px-20 py-4 font-semibold text-base text-white bg-blue-700 hover:bg-blue-600 rounded-xl mt-4">
          Cargar ejercicio
        </button>
      </form>
    </section>
  );
}
