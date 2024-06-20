"use client";

import INTInput from "@/components/Forms/Input";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import INTTextArea from "@/components/Forms/TextArea";
import INTForm from "@/components/Forms/Form";
import INTMultiSelect from "@/components/Forms/MultiSelect";
import INTFileUploader from "@/components/Forms/FileUpload";
import { FieldValues, FormProvider, useForm, useWatch } from "react-hook-form";
import { tags } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TinyMCEEditor from "../../state/_components/TinyMCEEditor";

const validationSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(120).max(150),
  metaDescription: z.string().min(1),
  metaTitle: z.string().min(1),
  permalink: z.string().min(1),
  tags: z.array(z.string()),
});

const defaultValues = {
  name: "",
  metaTitle: " ",
  metaDescription: "",
  tags: "",
  description: "",
};

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") 
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "") 
    .replace(/-+$/, ""); 
};

const PublishPage = () => {
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const submitHandler = async (values: FieldValues) => {
    console.log(values);
  };
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: React.SetStateAction<string>) => {
    setEditorContent(content);
  };

  return (
    <FormProvider {...methods}>
      <INTForm onSubmit={submitHandler}>
        <Box
          width={{ xs: "95%", sm: "90%", md: "80%", lg: "70%", xl: "80%" }}
          mx="auto"
          sx={{ paddingBottom: "50px" }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid item xs={12}>
                <INTInput name="title" label="Title" sx={{ width: "100%" }} />
              </Grid>
              <Grid item xs={12}>
                <INTTextArea
                  name="description"
                  placeholder="Description"
                  minRows={3}
                  sx={{
                    width: "100%",
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TinyMCEEditor
                  value={editorContent}
                  onEditorChange={handleEditorChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "left" }} marginTop={5}>
                <Typography
                  variant="h5"
                  component="div"
                  fontWeight="bold"
                  marginTop={{ xs: "20px", md: "50px" }}
                >
                  SEO SECTION
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <INTInput
                  name="metaTitle"
                  label="Meta Title"
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12}>
                <INTTextArea
                  name="metaDescription"
                  placeholder="Meta description"
                  minRows={3}
                  sx={{
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <INTInput name="url" label="URL" sx={{ width: "100%" }} />
              </Grid>
              <Grid item xs={12}>
                <INTMultiSelect
                  items={tags}
                  name="tags"
                  label="Tags"
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <Stack direction="column" spacing={2} marginTop={5}>
                <Grid item xs={12}>
                  <Button
                    sx={{ width: { xs: "100%", sm: "300px" } }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Publish
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <INTFileUploader name="file" />
                </Grid>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </INTForm>
    </FormProvider>
  );
};

export default PublishPage;
