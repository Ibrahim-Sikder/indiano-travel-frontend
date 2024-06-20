// components/StateCreate.tsx
"use client";

import INTDynamicSelect from "@/components/Forms/DynamicSelect";
import INTFileUploader from "@/components/Forms/FileUpload";
import INTForm from "@/components/Forms/Form";
import INTInput from "@/components/Forms/Input";
import { joditConfig } from "@/config";
import { state } from "@/utils/state";
import { Box, Button, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const CreatePlace = () => {
  const editor = useRef<any | null>(null);
  const [content, setContent] = useState<string>("");

  const submitHandler = async (values: FieldValues) => {
    const placeData = {
      ...values,
      content: content,
    };
  };

  return (
    <Box
      sx={{
        width: "1000px",
        mx: "auto",
        marginTop: "30px",
        overflow: "hidden",
      }}
    >
      <Typography fontWeight="bold" variant="h5" textAlign="center">
        Create City
      </Typography>
      <INTForm onSubmit={submitHandler}>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: 1, justifyContent: "center" }}
        >
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <INTFileUploader name="file" />
          </Grid>
          <Grid item xs={12}>
            <INTDynamicSelect
              fullWidth
              name="city"
              label="Select a City"
              options={state}
            />
          </Grid>
          <Grid item xs={12}>
            <INTInput name="place" label="Name Of Place" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <JoditEditor
              //@ts-ignore
              ref={editor}
              value={content}
              config={joditConfig}
              tabIndex={1}
              onBlur={(newContent: string) => setContent(newContent)}
              onChange={(newContent: string) => setContent(newContent)}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Create Now
            </Button>
          </Grid>
        </Grid>
      </INTForm>
    </Box>
  );
};

export default CreatePlace;
