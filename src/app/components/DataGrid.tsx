"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { ExerciseType } from "@/config/models_d";

type Exercise = ExerciseType & { _id: string };

const columns: GridColDef[] = [
  { field: "name", headerName: "Nombre", align: "center", flex: 1 },
  {
    field: "description",
    headerName: "Descripcion",
    align: "center",
    flex: 1,
  },
  { field: "difficulty", type: "number", headerName: "dificultad", flex: 1 },
  {
    field: "category",
    headerName: "categoria",
    align: "center",
    flex: 1,
  },
  {
    field: "video",
    headerName: "Video URL",
    align: "center",
    flex: 1,
  },
];

export function ExerciseTable({ rows }: { rows: Exercise[] }) {
  return (
    <Paper>
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        // initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
