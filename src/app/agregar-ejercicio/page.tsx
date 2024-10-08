"use client"
import React, { useState } from "react"

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        // Validación de posibles espacios en blanco y no seleccionado de dificultad
        if(formValues.name.trim() === '' || formValues.description.trim() === '' || formValues.category.trim() === '' || formValues.difficulty === 0){
            setFormHasError(true)
        }
        // Enviado y reseteo de valores de las entradas
        else{
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
        <section className="w-full h-screen flex flex-col items-center py-5 gap-y-4 bg-slate-950">
            <h1 className="text-lg font-normal text-black bg-[#EBF400] px-2"><span className="font-bold text-2xl italic">WO</span> Corporal</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <div className="flex gap-x-4">
                <div className="flex flex-col gap-y-2">
                    <label className="after:content-['*'] after:text-red-600 font-normal text-neutral-300" htmlFor="">Nombre</label>
                    <input value={formValues.name} placeholder="Ej: Press de banca" autoComplete="off" onChange={handleChange} name="name" className="bg-slate-900 border-neutral-800 text-white border-[1px] py-2 px-2 focus:border-neutral-500 focus:outline-none" type="text" />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label className="after:content-['*'] after:text-red-600 font-normal text-neutral-300" htmlFor="">Categoría</label>
                    <select value={formValues.category} onChange={handleChange} className="bg-slate-900 border-neutral-800 text-white border-[1px] py-[11px] px-2 focus:border-neutral-500 focus:outline-none" name="category" id="category">
                        <option value="resistencia">Resistencia</option>
                        <option value="fortalecimiento">Fortalecimiento</option>
                        <option value="equilibrio">Equilibrio</option>
                        <option value="flexbilidad">Flexibilidad</option>
                    </select>
                </div>
                </div>


                <div className="flex flex-col gap-y-2">
                    <label className="after:content-['*'] after:text-red-600 font-normal text-neutral-300" htmlFor="">Descripción</label>
                    <textarea onChange={handleChange} value={formValues.description} className="bg-slate-900 border-neutral-800 text-white border-[1px] py-2 px-2 focus:border-neutral-500 focus:outline-none" name="description" id="description"></textarea>
                </div>

                

                <div className="flex flex-col gap-y-2">
                    <label className="after:content-['*'] after:text-red-600 font-normal text-neutral-300" htmlFor="">Nivel de dificultad</label>
                    <select value={formValues.difficulty} onChange={handleChange} className="bg-slate-900 border-neutral-800 text-neutral-400 border-[1px] py-2 px-2 focus:border-neutral-500 focus:outline-none" name="difficulty" id="difficulty">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div className="flex flex-col gap-y-2">
                    <label className="after:content-['(Opcional)'] after:text-neutral-500 after:ml-2 text-neutral-300" htmlFor="">Video</label>
                    <input value={formValues.video} autoComplete="off" onChange={handleChange} name="video" className="bg-slate-900 border-neutral-800 text-white border-[1px] py-2 px-2 focus:border-neutral-500 focus:outline-none" type="text" />    
                </div>                
                {formHasError && <p className="text-red-500 text-base text-medium text-center">Completa todos los campos  obligatorios</p>}
                <button className="px-20 py-4 font-semibold text-base text-white bg-blue-700 hover:bg-blue-600 rounded-xl mt-4">Cargar ejercicio</button>
            </form>
        </section>
    )
}