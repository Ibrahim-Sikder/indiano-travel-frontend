import { SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  size?: "small" | "medium";
  type?: string;
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  variant?: "outlined" | "filled" | "standard";
  margin?: "none" | "normal" | "dense";
  onChange?: (e: any) => void;
};

const INTInput = ({
  name,
  label,
  size = "small",
  type = "text",
  fullWidth,
  sx,
  placeholder,
  required,
  variant = "outlined",
  margin = "normal",
  onChange, // Add this line
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          size={size}
          variant={variant}
          fullWidth={fullWidth}
          sx={{ ...sx }}
          placeholder={placeholder}
          required={required}
          margin={margin}
          error={!!error?.message}
          helperText={error?.message}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e); // Call the onChange prop if provided
          }}
        />
      )}
    />
  );
};

export default INTInput;
