"use client";
import { useCallback, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowParams,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { z } from "zod";
import { updateExercise, deleteExercise } from "@/services/exercises";
import { exerciseSchema } from "@/utils/schemas/exercise";
import { ExerciseType } from "@/config/models_d";

type Exercise = ExerciseType & { _id: string };

export function ExerciseTable({ rows }: { rows: Exercise[] }) {
  const [initialRows, setInitialRows] = useState<Exercise[]>(rows);
  const proccessRowUpdate = useCallback(async (newRow: GridRowModel) => {
    const validation = exerciseSchema
      .extend({ _id: z.string({ message: "_id is required" }) })
      .safeParse(newRow);
    if (!validation.success) {
      throw new Error(validation.error?.errors[0].message);
    }

    const result = await updateExercise(validation.data);
    if (result.error) {
      throw new Error(result.message);
    }
    return result.data!;
  }, []);

  const handleProccessRowUpdateError = useCallback((error: Error) => {
    alert(error.message);
  }, []);

  const handleDeleteExercise = async (id: string) => {
    const result = await deleteExercise(id as string);
    if (result.error) return alert(result.message);
    setInitialRows((prevState) => prevState.filter((row) => row._id !== id));
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      align: "left",
      flex: 1,
      editable: true,
    },
    {
      field: "description",
      headerName: "Descripcion",
      align: "left",
      flex: 1,
      editable: true,
    },
    {
      field: "difficulty",
      headerName: "dificultad",
      headerAlign: "left",
      align: "left",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "category",
      headerName: "categoria",
      align: "left",
      flex: 1,
      editable: true,
    },
    {
      field: "video",
      headerName: "Video URL",
      align: "left",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      cellClassName: "actions",
      align: "center",
      headerAlign: "left",
      getActions: ({ id }: GridRowParams<Exercise>) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Eliminar"
            color="inherit"
            onClick={async () => await handleDeleteExercise(id as string)}
          />,
        ];
      },
    },
  ];

  return (
    <Paper>
      <DataGrid
        getRowId={(row) => row._id}
        rows={initialRows}
        columns={columns}
        processRowUpdate={proccessRowUpdate}
        onProcessRowUpdateError={handleProccessRowUpdateError}
        // initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15, 100]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
