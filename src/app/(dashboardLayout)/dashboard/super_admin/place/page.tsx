"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AndraImage from "../../../../../assets/images/states/andhra.jpg";
import ArunachalImage from "../../../../../assets/images/states/arunachal-pradesh.jpg";
import AssamImage from "../../../../../assets/images/states/assam.jpg";
import BiharImage from "../../../../../assets/images/states/bihar.jpg";
import ChhattisgarhImage from "../../../../../assets/images/states/chhattisgarh.jpg";
import GoaImage from "../../../../../assets/images/states/goa.jpg";
import GujaratImage from "../../../../../assets/images/states/gujarat.jpg";
import HaryanaImage from "../../../../../assets/images/states/haryana.jpg";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "stateName", headerName: "Name", flex: 1 },
  {
    field: "stateImage",
    headerName: "Image",
    flex: 1,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={params.value}
          alt={params.row.stateName}
          suppressHydrationWarning={true}
          style={{ width: "100px", height: "auto" }}
        />
      </Box>
    ),
  },
  { field: "stateCapital", headerName: "Capital", flex: 1 },
];

const rows = [
  {
    id: 1,
    stateName: "Andhra Pradesh",
    stateImage: AndraImage,
    stateCapital: "Amaravati",
  },
  {
    id: 2,
    stateName: "Arunachal Pradesh",
    stateImage: ArunachalImage,
    stateCapital: "Itanagar",
  },
  {
    id: 3,
    stateName: "Assam",
    stateImage: AssamImage,
    stateCapital: "Dispur",
  },
  {
    id: 4,
    stateName: "Bihar",
    stateImage: BiharImage,
    stateCapital: "Patna",
  },
  {
    id: 5,
    stateName: "Chhattisgarh",
    stateImage: ChhattisgarhImage,
    stateCapital: "Raipur",
  },
  {
    id: 6,
    stateName: "Goa",
    stateImage: GoaImage,
    stateCapital: "Panaji",
  },
  {
    id: 7,
    stateName: "Gujarat",
    stateImage: GujaratImage,
    stateCapital: "Gandhinagar",
  },
  {
    id: 8,
    stateName: "Haryana",
    stateImage: HaryanaImage,
    stateCapital: "Chandigarh",
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
    <Box sx={{ width: "100%", padding: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        margin="10px 0"
      >
        <Button
          component={Link}
          href="/dashboard/super_admin/place/create"
          variant="contained"
          color="primary"
        >
          Create Place
        </Button>
        <TextField size="small" label="Search States" variant="outlined" />
      </Stack>

      <Box sx={{ height: "calc(100vh - 150px)", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#ddffdd",
              color: "",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default States;
