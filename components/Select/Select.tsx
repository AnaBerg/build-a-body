'use client';

import { Select as MtSelect, Option } from '@material-tailwind/react';
import { Controller, useFormContext } from 'react-hook-form';

type Item = {
  label: string;
  value: string;
};

interface SelectProps {
  items: Array<Item>;
  label: string;
  id: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ items, label, id, disabled = false }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={id}
      control={control}
      render={({ field: { name, onChange, value } }) => (
        <MtSelect
          name={name}
          id={name}
          onChange={onChange}
          value={value}
          label={label}
          disabled={disabled}
          className="disabled:bg-gray-600"
          placeholder=""
        >
          {items.map(({ label, value }, i) => (
            <Option key={i} value={value}>
              {label}
            </Option>
          ))}
        </MtSelect>
      )}
    />
  );
};

export default Select;
