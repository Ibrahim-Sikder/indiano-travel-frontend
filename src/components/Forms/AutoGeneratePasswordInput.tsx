import React from 'react';
import { SxProps, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type TInputProps = {
  name: string;
  label?: string;
  size?: 'small' | 'medium';
  type?: string;
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  margin?: 'none' | 'normal' | 'dense';
  password: string;
};

const AutoGeneratePasswordInput = ({
  name,
  label,
  size = 'small',
  type = 'text',
  fullWidth,
  sx,
  placeholder,
  required,
  variant = 'outlined',
  margin = 'normal',
  password, 
}: TInputProps) => {
  const { control, setValue } = useFormContext();
  const [value, setValueState] = React.useState(password);

  React.useEffect(() => {
    setValueState(password);
    setValue(name, password); 
  }, [password, name, setValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValueState(newValue);
    setValue(name, newValue);
  };

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
          value={value}
          onChange={handleChange}
        />
      )}
    />
  );
};

export default AutoGeneratePasswordInput;
