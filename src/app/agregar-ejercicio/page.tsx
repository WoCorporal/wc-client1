"use client"
import React, { useState } from "react"
import FetchExercise from "./__hooks/FetchExercise"
import Toast from "../components/Toast"


type Exercise = {
    name: string
    description: string
    category: string
    difficulty: number
    video: string
}

export default function AgregarEjercicio(){
    const [formValues,setFormValues] = useState<Exercise>({
        name: '',
        description: '',
        category: '',
        difficulty: 0,
        video: ''
    })
    const { loading , handleFetch, sendStatus} = FetchExercise()
    const [formHasError,setFormHasError] = useState(false)

    // Cambiar estado al cambiar valor de las entradas posibles
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
        const { name , value} = event.target
        if(name === 'difficulty'){
            setFormValues({
                ...formValues,
                [name]: Number(value)
            })
        }
        else{
            setFormValues({
                ...formValues,
                [name]: value
            })
        }
        
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        // Validación de posibles espacios en blanco y no seleccionado de dificultad
        if(formValues.name.trim() === '' || formValues.description.trim() === '' || formValues.category.trim() === '' || formValues.difficulty === 0){
            setFormHasError(true)
        }
        // Enviado y reseteo de valores de las entradas
        else{
            handleFetch(formValues)
            setFormHasError(false)
            setFormValues({
                name: '',
            description: '',
            category: '',
            difficulty: 0,
            video: ''

            })
        }
    }

    return(
        <section className="w-full min-h-screen h-fit flex flex-col items-center py-5 gap-y-4 bg-[#151515] relative">
            <h1 className="text-lg font-normal text-[#151515] bg-[#EBF400] px-2"><span className="font-bold text-2xl italic">WO</span> Corporal</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full px-4 sm:px-0 sm:w-3/6 lg:w-2/6">

                <div className="flex flex-col w-full gap-y-2">
                    <label className="after:content-['*'] after:text-red-600 font-normal text-neutral-300" htmlFor="">Nombre</label>
                    <input value={formValues.name} placeholder="Ej: Press de banca" autoComplete="off" onChange={handleChange} name="name" className="bg-transparent border-neutral-700 text-white border-[1px] py-2 px-2 rounded-lg focus:border-neutral-500 focus:outline-none" type="text" />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <label className="after:content-['*'] after:text-red-600 font-normal text-neutral-300" htmlFor="">Categoría</label>
                    <select value={formValues.category} onChange={handleChange} className="bg-transparent border-neutral-700 text-neutral-400 border-[1px] py-[11px] px-2 rounded-lg focus:border-neutral-500 focus:outline-none" name="category" id="category">
                        <option className="bg-[#181818] text-white" value="resistencia">Resistencia</option>
                        <option className="bg-[#181818] text-white" value="fortalecimiento">Fortalecimiento</option>
                        <option className="bg-[#181818] text-white" value="equilibrio">Equilibrio</option>
                        <option className="bg-[#181818] text-white" value="flexbilidad">Flexibilidad</option>
                    </select>
                </div>



                <div className="flex flex-col gap-y-2">
                    <label className="after:content-['*'] after:text-red-600 font-normal text-neutral-300" htmlFor="">Descripción</label>
                    <textarea onChange={handleChange} value={formValues.description} className="bg-transparent border-neutral-700 text-white border-[1px] py-2 px-2 rounded-lg focus:border-neutral-500 focus:outline-none" name="description" id="description"></textarea>
                </div>

                

                <div className="flex flex-col gap-y-2">
                    <label className="after:content-['*'] after:text-red-600 font-normal text-neutral-300" htmlFor="">Nivel de dificultad</label>
                    <select value={formValues.difficulty} onChange={handleChange} className="bg-transparent border-neutral-700 text-neutral-400 border-[1px] py-2 px-4 rounded-lg focus:border-neutral-500 focus:outline-none" name="difficulty" id="difficulty">
                        <option className="bg-[#181818] text-white" value="1">1</option>
                        <option className="bg-[#181818] text-white" value="2">2</option>
                        <option className="bg-[#181818] text-white" value="3">3</option>
                        <option className="bg-[#181818] text-white" value="4">4</option>
                        <option className="bg-[#181818] text-white" value="5">5</option>
                    </select>
                </div>

                <div className="flex flex-col gap-y-2">
                    <label className="after:content-['(Opcional)'] after:text-neutral-500 after:ml-2 text-neutral-300" htmlFor="">Video</label>
                    <input value={formValues.video} autoComplete="off" onChange={handleChange} name="video" className="bg-transparent border-neutral-700 text-white border-[1px] py-2 px-2 rounded-lg focus:border-neutral-500 focus:outline-none" type="text" />    
                </div>                
                {formHasError && <p className="text-red-500 text-base text-medium text-center">Completa todos los campos  obligatorios</p>}
                <button className="sm:px-12 lg:px-20 py-4 font-semibold flex justify-center items-center text-base xl:text-xl text-[#181818] uppercase bg-[#D4FC04] hover:bg-[#ecf400b1] rounded-tl-3xl rounded-br-3xl mt-4">{loading?(
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
                ):'Cargar ejercicio'}</button>
            </form>
            {sendStatus && <Toast/>}
        </section>
    )
}