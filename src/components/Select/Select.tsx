'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select as S,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectProps {
  name: string;
  label: string;
  disabled?: boolean;
  items: Array<{ label: string; value: string }>;
}

const Select: React.FC<SelectProps> = ({
  items,
  label,
  name,
  disabled = false,
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <S
            disabled={disabled}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map(({ label, value }, i) => (
                <SelectItem key={`${value}-${i}`} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </S>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Select;
