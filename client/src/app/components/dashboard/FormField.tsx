// client/src/app/components/dashboard/FormField.tsx
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller, Control } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  label: string;
  control: Control<any>;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  control,
  error,
  required = false,
  multiline = false,
  rows,
  type = 'text'
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          multiline={multiline}
          rows={rows}
          required={required}
          error={!!error}
          helperText={error}
          fullWidth
          variant="outlined"
        />
      )}
    />
  );
}; 