"use client";
import INTFileUploader from "@/components/Forms/FileUpload";
import INTForm from "@/components/Forms/Form";
import INTInput from "@/components/Forms/Input";
import { joditConfig } from "@/config";
import { useCrateStateMutation } from "@/redux/api/state/stateApi";
import { Box, Button, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const CreateState: React.FC = () => {
  const editor = useRef<any | null>(null);
  const [content, setContent] = useState<string>("");
  const [createState] = useCrateStateMutation();
  const onSubmit = async (values: FieldValues) => {
    const stateData = {
      ...values,
      content: content,
    };

    try {
      const res = await createState(stateData).unwrap();
      if (res._id) {
        toast.success(`${res.name} State created successfully`);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
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
        Create Place
      </Typography>
      <INTForm onSubmit={onSubmit}>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: 1, justifyContent: "center" }}
        >
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <INTFileUploader name="file" />
          </Grid>
          <Grid item xs={12}>
            <INTInput fullWidth name="name" label="Name Of State" />
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

export default CreateState;
