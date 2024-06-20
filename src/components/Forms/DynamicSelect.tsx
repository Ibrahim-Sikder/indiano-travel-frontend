import { SxProps } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

type Option = {
  label: string;
};

type TStateProps = {
  name: string;
  label?: string;
  fullWidth?: boolean;
  sx?: SxProps;
  required?: boolean;
  options: Option[];
  size?: "small" | "medium";
};

const INTDynamicSelect = ({
  name,
  label = "Movie",
  fullWidth = false,
  sx,
  required,
  options,
  size = "small",
}: TStateProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          freeSolo
          disablePortal
          id="combo-box-demo"
          options={options}
          size={size}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.label
          }
          sx={{
            width: fullWidth ? "100%" : 300,
            "& .MuiAutocomplete-listbox": {
              maxHeight: 200,
              overflow: "auto",
            },
            ...sx,
          }}
          onChange={(_, newValue) =>
            field.onChange(newValue ? newValue.label : newValue)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              fullWidth={fullWidth}
              required={required}
              error={!!error}
              helperText={error?.message}
              sx={{
                width: fullWidth ? "100%" : 300,
                mx: fullWidth ? 0 : "auto",
              }}
            />
          )}
        />
      )}
    />
  );
};

export default INTDynamicSelect;
