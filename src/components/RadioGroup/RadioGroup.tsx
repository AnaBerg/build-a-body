'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup as RG, RadioGroupItem } from '@/components/ui/radio-group';

interface RadioGroupProps {
  name: string;
  label: string;
  disabled?: boolean;
  items: Array<{ label: string; value: string }>;
  orientation?: 'horizontal' | 'vertical';
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  items,
  disabled = false,
  orientation = 'vertical',
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RG
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
              className={
                orientation === 'horizontal'
                  ? 'flex w-full justify-evenly space-x-3'
                  : 'flex flex-col space-y-1'
              }
            >
              {items.map((item, i) => (
                <FormItem
                  key={`${item}-${i}`}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={item.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
            </RG>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioGroup;
