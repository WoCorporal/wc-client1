import { useState } from "react";
import { createExercise } from "@/services/exercises";
import { ExerciseType } from "@/config/models_d";

export default function FetchExercise() {
  const [loading, setLoading] = useState<boolean>(false);
  const [sendStatus, setSendStatus] = useState<boolean>(false);

  // Aviso de ejercicio agregado con exito
  const handleSendStatus = () => {
    setSendStatus(true);
    setTimeout(() => {
      setSendStatus(false);
    }, 2000);
  };

  // Enviar ejercicio a la base de datos
  const handleFetch = async (exercise: ExerciseType) => {
    setLoading(true);
    const result = await createExercise(exercise);
    setLoading(false);
    if (!result.error) {
      handleSendStatus();
    }
    return result;
  };

  return {
    loading,
    handleFetch,
    sendStatus,
  };
}
