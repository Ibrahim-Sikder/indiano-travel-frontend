/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { KeyOff } from "@mui/icons-material";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUserMutation } from "@/redux/api/users/userApi";
import INTForm from "@/components/Forms/Form";
import INTInput from "@/components/Forms/Input";
import INTDatePicker from "@/components/Forms/DatePicker";
import INTSelect from "@/components/Forms/Select";
import INTMultiSelect from "@/components/Forms/MultiSelect";
import INTRadioButton from "@/components/Forms/RadioButton";
import AutoGeneratePasswordInput from "@/components/Forms/AutoGeneratePasswordInput";
import INTModal from "@/components/shared/INTModal/INTModal";
import { DEPARTMENT, Gender, Role } from "@/types";
import { generatePassword } from "@/utils/AutoGeneratePassword";

const userSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
  }),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password required'),
  dob: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid date of birth'),
  gender: z.enum(['male', 'female', 'others'], {
    message: "Gender must be 'male', 'female', or 'others'",
  }),
  role: z.enum(['admin', 'manager', 'editor'], {
    message: "Role must be 'admin', 'manager', or 'editor'",
  }),
  department: z.array(
    z.enum(['content', 'hotel', 'restaurant'], {
      message: "Department must be 'content', 'hotel', or 'restaurant'",
    })
  ).min(1, 'At least one department must be selected'),
});

const defaultValues = {
  name: { firstName: "", lastName: "" },
  phone: "",
  email: "",
  dob: "",
  gender: "male",
  role: "editor",
  department: [], 
};

export type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserCreateModal = ({ open, setOpen }: TProps) => {
  const [createUser] = useCreateUserMutation();
  const [password, setPassword] = useState("");

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(8);
    setPassword(newPassword);
  };

  const submitHandler = async (values: FieldValues) => {
    console.log("Submitted Values: ", values);
    
    try {
      const res = await createUser(values).unwrap();
      console.log("Response: ", res);

      if (res.employeeId) {
        toast.success("User created successfully!");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data.message, { duration: 5000 });
      console.log("Error: ", error);
    }
  };

  return (
    <INTModal open={open} setOpen={setOpen} title="Create a User">
      <INTForm
        onSubmit={submitHandler}
        resolver={zodResolver(userSchema)}
        defaultValues={defaultValues}
      >
        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <INTInput name="name.firstName" label="First Name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <INTInput name="name.lastName" label="Last Name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <INTInput name="phone" label="Phone" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <INTInput name="email" type="email" label="Email" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <INTDatePicker name="dob" label="Date Of Birth" disablePast={false} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <INTSelect items={Gender} name="gender" label="Gender" fullWidth />
            {/* <INTRadioButton
              name="gender"
              label="Gender"
              options={[
                { label: "Female", value: "female" },
                { label: "Male", value: "male" },
                { label: "Other", value: "other" },
              ]}
              row
            /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <INTSelect items={Role} name="role" label="Role" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <INTMultiSelect name="department" label="Department" items={DEPARTMENT} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AutoGeneratePasswordInput
              name="password"
              label="Password"
              fullWidth
              password={password}
            />
          </Grid>
          <Grid container justifyContent="flex-end" alignItems="flex-end">
            <Button
              onClick={handleGeneratePassword}
              variant="outlined"
              sx={{ border: "1px solid #ddd" }}
            >
              <KeyOff className="mr-1" /> Auto Generate
            </Button>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Create a User
        </Button>
      </INTForm>
    </INTModal>
  );
};

export default UserCreateModal;
