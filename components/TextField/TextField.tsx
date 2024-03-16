'use client';

import { Input } from '@material-tailwind/react';
import { Controller, useFormContext } from 'react-hook-form';

interface TextFieldProps {
  id: string;
  label: string;
}

const TextField: React.FC<TextFieldProps> = ({ id, label }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={id}
      control={control}
      render={({ field: { value, onChange, name } }) => {
        return (
          <Input
            placeholder=""
            color="white"
            name={name}
            id={name}
            label={label}
            onChange={onChange}
            value={value}
            className="bg-gray-700 disabled:bg-gray-600"
            crossOrigin={undefined}
          />
        );
      }}
    />
  );
};

export default TextField;
