import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, SxProps } from '@mui/material';

type TRadioOption = {
  label: string;
  value: string;
};

type TRadioButtonProps = {
  name: string;
  label?: string;
  options: TRadioOption[];
  row?: boolean;
  sx?: SxProps;
};

const INTRadioButton = ({ name, label, options, row = false, sx }: TRadioButtonProps) => {
  // const { control } = useFormContext();

  return (
    <FormControl component="fieldset" sx={sx}>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <Controller
        name={name}
        // control={control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup {...field} row={row}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export default INTRadioButton;
