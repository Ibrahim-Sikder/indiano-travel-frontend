"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import UserCreateModal from "../../super_admin/users/_components/UserCreateModal";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "phone", headerName: "Phone", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "dob", headerName: "Date of Birth", width: 130 },
  { field: "gender", headerName: "Gender", width: 130 },
  { field: "role", headerName: "Role", width: 130 },
  { field: "department", headerName: "Department", width: 130 },
];

const rows = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    dob: "01/01/1990",
    gender: "Male",
    role: "Developer",
    department: "Engineering",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    phone: "987-654-3210",
    email: "jane.smith@example.com",
    dob: "02/02/1992",
    gender: "Female",
    role: "Designer",
    department: "Design",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    phone: "456-789-0123",
    email: "alice.johnson@example.com",
    dob: "03/03/1985",
    gender: "Female",
    role: "Manager",
    department: "HR",
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    phone: "321-654-0987",
    email: "bob.brown@example.com",
    dob: "04/04/1980",
    gender: "Male",
    role: "Developer",
    department: "IT",
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Davis",
    phone: "789-012-3456",
    email: "charlie.davis@example.com",
    dob: "05/05/1995",
    gender: "Non-binary",
    role: "Analyst",
    department: "Finance",
  },
];

const Users = () => {
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
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Create User
        </Button>
        <TextField size="small" label="Search User" variant="outlined" />
      </Stack>

      <UserCreateModal open={isModalOpen} setOpen={setIsModalOpen} />

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

export default Users;
