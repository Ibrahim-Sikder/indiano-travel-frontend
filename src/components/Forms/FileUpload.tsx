"use client";

import BackupIcon from "@mui/icons-material/Backup";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type INTFileUploaderProps = {
  name: string;
};

const INTFileUploader = ({ name }: INTFileUploaderProps) => {
  const { control, setValue, watch } = useFormContext();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const selectedFile = watch(name);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(name, file);
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setTimeout(() => {}, 1000);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Box
          sx={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "8px",
            border: "1px dashed #ddd",
            width: "300px",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              padding: "30px",
              textAlign: "center",
              background: "#F9FAFB",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
              borderRadius: "8px",
            }}
          >
            <input
              type="file"
              id="files"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="files"
              className="cursor-pointer py-2 rounded-md shadow-[rgba(0, 0, 0, 0.1) 0px 1px 2px 0px]"
              style={{ display: uploadedImage ? "none" : "block" }}
            >
              <BackupIcon
                sx={{
                  mr: 2,
                  color: "#111",
                  fontSize: 60,
                  background: "#E8EDFF",
                  padding: "10px",
                  borderRadius: "100%",
                }}
              />
              <Typography component="h2">
                Drag & Drop or Choose File to Upload
              </Typography>
            </label>
            {uploadedImage && (
              <Box mt={2}>
                <Image
                  src={uploadedImage}
                  alt="Uploaded"
                  layout="responsive"
                  width={300}
                  height={200}
                  style={{ borderRadius: "8px" }}
                />
              </Box>
            )}
            {field.value && (
              <Box mt={2}>
                <Button
                  onClick={handleUpload}
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    background: "#059065",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Upload
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    />
  );
};

export default INTFileUploader;
