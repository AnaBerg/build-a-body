'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { DatePickerInput } from './components';

interface DatePickerProps {
  id: string;
  label: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ id, label }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={id}
      render={({ field: { name, onChange, value } }) => (
        <DatePickerInput initialDate={value} name={name} onChange={onChange} label={label} />
      )}
    />
  );
};

export default DatePicker;
