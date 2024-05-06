import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TextField from '@/components/TextField';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import { onSubmit } from './onSubmit';

const radioGroupItems = Array.from({ length: 7 }, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}`,
}));

interface AddFormProps {
  exercises: any;
  form: UseFormReturn<
    {
      amount: string;
      name: string;
      day1: string;
      day2: string;
      day3: string;
      day4: string;
      day5: string;
      day6: string;
      day7: string;
    },
    any,
    undefined
  >;
  formSchema: any;
  setModal: React.Dispatch<
    React.SetStateAction<{ day?: string; open: boolean }>
  >;
}

const AddForm: React.FC<AddFormProps> = ({ exercises, form, setModal }) => {
  const watchAmount = Number(form.watch('amount'));

  const days = Array.from({ length: watchAmount }, (_, i) => ({
    label: `Day ${i + 1}`,
    name: `day${i + 1}`,
  }));

  return (
    <form
      className="w-full"
      onSubmit={form.handleSubmit((data) => onSubmit(data, exercises))}
    >
      <Card className="h-fit w-full">
        <CardHeader>
          <CardTitle>New split</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full flex-col gap-3">
            <TextField name="name" label="Name" />
            <RadioGroup
              orientation="horizontal"
              label="Split Days"
              name="amount"
              items={radioGroupItems}
            />
            {days.map(({ label, name }, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-end gap-4 md:gap-10"
              >
                <div className="flex-1">
                  <TextField name={name} label={label} />
                </div>
                <Button
                  onClick={() => setModal({ open: true, day: name })}
                  type="button"
                  variant="outline"
                  size="sm"
                >
                  Add exercises
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full flex-row-reverse pt-4">
            <Button type="submit">Send</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AddForm;
