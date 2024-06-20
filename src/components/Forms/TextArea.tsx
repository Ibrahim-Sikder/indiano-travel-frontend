import * as React from 'react';
import { SxProps } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Controller, useFormContext } from 'react-hook-form';

type TTextareaProps = {
  name: string;
  placeholder?: string;
  minRows?: number;
  sx?: SxProps;
  required?: boolean;
};

const INTTextArea = ({
  name,
  placeholder,
  minRows = 2,
  sx,
  required,
}: TTextareaProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field, fieldState: { error } }) => (
        <TextareaAutosize
          {...field}
          placeholder={placeholder}
          minRows={minRows}
          style={{ 
            width: '100%',
            maxHeight: '100px',
            ...sx 
          }}
        />
      )}
    />
  );
};

export default INTTextArea;
