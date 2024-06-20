
'use client'

import { Box, Button, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import CreateContentModal from "./_components/CreateContentModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef[] = [
  { field: "sl", headerName: "SL", width: 70 },
  { field: "title", headerName: "Title", flex: 1 },
  { field: "author", headerName: "Author", flex: 1 },
  { field: "editor", headerName: "Editor", flex: 1 },
  { field: "publisher", headerName: "Publisher", flex: 1 },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <EditIcon
          color="primary"
         
          style={{ cursor: "pointer" }}
        />
        <DeleteIcon
          color="error"
         
          style={{ cursor: "pointer" }}
        />
      </Stack>
    ),
  },
];

const rows = [
  {
    id: 1,
    sl: 1,
    title: "This is blog",
    author: "Mr Bin",
    editor: "Rahim",
    publisher: "Karim",
  },
];

const States = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };



 
  return (
    <Box suppressHydrationWarning={true} sx={{ width: "100%", padding: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        margin="10px 0"
      >
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Publish
        </Button>
        <TextField size="small" label="Search" variant="outlined" />
      </Stack>

      <CreateContentModal open={isModalOpen} setOpen={setIsModalOpen} />

      <Box sx={{ height: "calc(100vh - 150px)", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#ddffdd",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default States;
