"use client";

import { useGetAllUsersQuery } from "@/redux/api/users/userApi";
import { Box, Button, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import UserCreateModal from "./_components/UserCreateModal";

const columns: GridColDef[] = [
  { field: "employeeId", headerName: "Employee ID", flex: 1, minWidth: 130 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => {
      const firstName = params.row?.name?.firstName || "";
      const lastName = params.row?.name?.lastName || "";
      return `${firstName} ${lastName}`;
    },
  },
  { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 230 },
  {
    field: "dob",
    headerName: "Date of Birth",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString("en-GB");
    },
  },
  { field: "gender", headerName: "Gender", flex: 1, minWidth: 120 },
  { field: "role", headerName: "Role", flex: 1, minWidth: 120 },
  { field: "department", headerName: "Department", flex: 1, minWidth: 150 },
];

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError, error } = useGetAllUsersQuery(undefined);
  console.log(data);
  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Box sx={{ width: "100%", padding: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          margin="10px 0"
          spacing={{ xs: 2, sm: 0 }}
        >
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Create User
          </Button>
          <TextField size="small" label="Search User" variant="outlined" />
        </Stack>

        <UserCreateModal open={isModalOpen} setOpen={handleClose} />

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Box sx={{ height: "calc(100vh - 150px)", width: "100%" }}>
            <DataGrid
              rows={data?.result || []}
              columns={columns}
              autoHeight
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#ddffdd",
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Users;
