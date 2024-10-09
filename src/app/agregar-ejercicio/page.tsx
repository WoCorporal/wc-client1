"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExercise } from "@/services/exercises";
import { exerciseSchema } from "@/utils/schemas/exercise";
import { ExerciseType } from "@/config/models_d";
import FetchExercise from "./__hooks/FetchExercise";
import Toast from "../components/Toast";

export default function AgregarEjercicio() {
  const { loading, handleFetch, sendStatus } = FetchExercise();
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
    <section className="w-full min-h-screen h-fit flex flex-col items-center py-5 gap-y-4 bg-[#151515] relative">
      <h1 className="text-lg font-normal text-[#151515] bg-[#EBF400] px-2">
        <span className="font-bold text-2xl italic">WO</span> Corporal
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full px-4 sm:px-0 sm:w-3/6 lg:w-2/6"
      >
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex flex-col gap-y-2">
            <label
              className="after:content-['*'] after:text-red-600 font-normal text-neutral-300"
              htmlFor=""
            >
              Nombre
            </label>
            <input
              {...register("name")}
              placeholder="Ej: Press de banca"
              autoComplete="off"
              className="bg-transparent border-neutral-700 text-white border-[1px] py-2 px-2 rounded-lg focus:border-neutral-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-base text-small text-center">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label
              className="after:content-['*'] after:text-red-600 font-normal text-neutral-300"
              htmlFor=""
            >
              Categoría
            </label>
            <select
              {...register("category")}
              className="bg-transparent border-neutral-700 text-neutral-400 border-[1px] py-[11px] px-2 rounded-lg focus:border-neutral-500 focus:outline-none"
              id="category"
              multiple
            >
              <option className="bg-[#181818] text-white" value="resistencia">
                Resistencia
              </option>
              <option
                className="bg-[#181818] text-white"
                value="fortalecimiento"
              >
                Fortalecimiento
              </option>
              <option className="bg-[#181818] text-white" value="equilibrio">
                Equilibrio
              </option>
              <option className="bg-[#181818] text-white" value="flexibilidad">
                Flexibilidad
              </option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-base text-small text-center">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label
            className="after:content-['*'] after:text-red-600 font-normal text-neutral-300"
            htmlFor=""
          >
            Descripción
          </label>
          <textarea
            {...register("description")}
            className="bg-transparent border-neutral-700 text-white border-[1px] py-2 px-2 rounded-lg focus:border-neutral-500 focus:outline-none"
            id="description"
          ></textarea>
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
            className="bg-transparent border-neutral-700 text-neutral-400 border-[1px] py-2 px-4 rounded-lg focus:border-neutral-500 focus:outline-none"
            name="difficulty"
            id="difficulty"
          >
            <option className="bg-[#181818] text-white" value="1">
              1
            </option>
            <option className="bg-[#181818] text-white" value="2">
              2
            </option>
            <option className="bg-[#181818] text-white" value="3">
              3
            </option>
            <option className="bg-[#181818] text-white" value="4">
              4
            </option>
            <option className="bg-[#181818] text-white" value="5">
              5
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-y-2">
          <label
            className="after:content-['(Opcional)'] after:text-neutral-500 after:ml-2 text-neutral-300"
            htmlFor=""
          >
            Video
          </label>
          <input
            {...register("videos")}
            autoComplete="off"
            className="bg-transparent border-neutral-700 text-white border-[1px] py-2 px-2 rounded-lg focus:border-neutral-500 focus:outline-none"
          />
          {errors.video && (
            <p className="text-red-500 text-base text-small text-center">
              {errors.video.message}
            </p>
          )}
        </div>

        <button className="sm:px-12 lg:px-20 py-4 font-semibold flex justify-center items-center text-base xl:text-xl text-[#181818] uppercase bg-[#D4FC04] hover:bg-[#ecf400b1] rounded-tl-3xl rounded-br-3xl mt-4">
          {loading ? (
            <div className="loader">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
              <div className="bar4"></div>
              <div className="bar5"></div>
              <div className="bar6"></div>
              <div className="bar7"></div>
              <div className="bar8"></div>
              <div className="bar9"></div>
              <div className="bar10"></div>
              <div className="bar11"></div>
              <div className="bar12"></div>
            </div>
          ) : (
            "Cargar ejercicio"
          )}
        </button>
      </form>
    </section>
  );
}
