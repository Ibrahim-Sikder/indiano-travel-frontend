import INTForm from "@/components/Forms/Form";
import INTInput from "@/components/Forms/Input";

import { DEPARTMENT, Gender, Role } from "@/types";
import { KeyOff } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";

import AutoGeneratePasswordInput from "@/components/Forms/AutoGeneratePasswordInput";
import { useCreateUserMutation } from "@/redux/api/users/userApi";
import { generatePassword } from "@/utils/AutoGeneratePassword";
import { toast } from "sonner";
import INTModal from "@/components/shared/INTModal/INTModal";
import INTDatePicker from "@/components/Forms/DatePicker";
import INTSelect from "@/components/Forms/Select";
import INTMultiSelect from "@/components/Forms/MultiSelect";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserModal = ({ open, setOpen }: TProps) => {
  const [createUser] = useCreateUserMutation();

  const [password, setPassword] = useState("");

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(8);
    setPassword(newPassword);
  };

  const submitHandler = async (values: FieldValues) => {
    try {
      const res = await createUser(values).unwrap();
      console.log(res);

      if (res.employeeId) {
        toast.success("User create successfully!");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data.message, { duration: 5000 });
    }
  };

  return (
    <INTModal open={open} setOpen={setOpen} title="Create a User">
      <INTForm onSubmit={submitHandler}>
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
            <INTDatePicker
              name="dob"
              label="Date Of Birth"
              disablePast={false}
            />
            {/* <TAInput name="dob" label="Date Of Birth" fullWidth /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <INTSelect items={Gender} name="gender" label="Gender" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <INTSelect items={Role} name="role" label="Role" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <INTMultiSelect
              name="department"
              label="Department"
              items={DEPARTMENT}
            />
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

export default UserModal;
