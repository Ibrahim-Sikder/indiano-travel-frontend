"use client";

import React from "react";
import INTForm from "@/components/Forms/Form";
import INTInput from "@/components/Forms/Input";
import INTModal from "@/components/shared/INTModal/INTModal";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import INTTextArea from "@/components/Forms/TextArea";
import INTTextEditor from "./TextEditor";
import INTFileUploader from "@/components/Forms/FileUpload";
import INTMultiSelect from "@/components/Forms/MultiSelect";
import { Gender, tags } from "@/types";
import Link from "next/link";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateContentModal = ({ open, setOpen }: TProps) => {
  const [value, setValue] = React.useState("1");
  const methods = useForm();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const submitHandler = async (values: FieldValues) => {
    console.log(values);
  };

  const tabStyles = {
    width: 150,
    height: "40px",
    margin: '0 auto',
    backgroundColor: "#059669",
    color: "white",
    borderRadius: 2,
    padding: "0px",
    fontSize: "12px",
    lineHeight: "20px",
    minHeight: "unset",
    "&.Mui-selected": {
      backgroundColor: "#0891B2",
      color: "#fff",
      borderBottom: "none",
    },
    "&:focus": {
      outline: "none",
    },
  };

  return (
    <INTModal
      sx={{
        width: "500px",
        height: "auto",
        mx: "auto",
        textAlign: "center",
        p: "30px",
      }}
      open={open}
      setOpen={setOpen}
      title="Publish"
    >
     <Stack spacing={2} justifyContent='center' alignItems='center'>
      <Button component={Link} href='/dashboard/super-admin/content/publish' sx={tabStyles}>English </Button>
      <Button component={Link} href='/dashboard/super-admin/content/publish' sx={tabStyles}>Bangla </Button>
      <Button component={Link} href='/dashboard/super-admin/content/publish' sx={tabStyles}>Hindi </Button>
     </Stack>
    </INTModal>
  );
};

export default CreateContentModal;
