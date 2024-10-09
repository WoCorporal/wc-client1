import { useState } from "react"

type Exercise = {
    name: string
    description: string
    category: string
    difficulty: number
    video: string
}

export default function FetchExercise(){
    const [loading, setLoading] = useState<boolean>(false)
    const [sendStatus,setSendStatus] = useState<boolean>(false)

    // Aviso de ejercicio agregado con exito
    const handleSendStatus = ()=>{
        setSendStatus(true)
        setTimeout(()=>{
            setSendStatus(false)
        },2000)
    }   


    // Enviar ejercicio a la base de datos
   const handleFetch = ({name,description,difficulty,video,category}:Exercise)=>{
    const exerciseData = {
        name: name,
        description: description,
        difficulty: difficulty,
        video: video,
        category: [category]
    }
    setLoading(true)
    fetch("/api/exercise",{
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(exerciseData)
    })
    .then((res)=>{
        console.log(res.json())
    })
    .catch(err=>console.log(err))
    .finally(()=> {
        handleSendStatus()
        setLoading(false)
    })
   }
   return{
    loading,
    handleFetch,
    sendStatus
   }
}

