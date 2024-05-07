'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import AddForm from './Form';
import ExerciseModal from './Modal';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  amount: z.string().min(1, { message: 'Select one' }),
  day1: z.string(),
  day2: z.string(),
  day3: z.string(),
  day4: z.string(),
  day5: z.string(),
  day6: z.string(),
  day7: z.string(),
});

const addDefaultValues = {
  amount: '1',
  day1: '',
  day2: '',
  day3: '',
  day4: '',
  day5: '',
  day6: '',
  day7: '',
  name: '',
};

interface SplitFormContainerProps {
  accordions: Array<{
    title: string;
    value: string;
    exercises: Array<{ name: string; label: string }>;
  }>;
  editDefaultValues?: typeof addDefaultValues;
  editExercises?: { [key: string]: Array<string> };
}

const SplitFormContainer: React.FC<SplitFormContainerProps> = ({
  accordions,
  editDefaultValues,
  editExercises,
}) => {
  const [exercises, setExercises] = useState<any>({});
  const [modal, setModal] = useState<{ day?: string; open: boolean }>({
    open: false,
  });
  const defaultValues = editDefaultValues ?? addDefaultValues;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <div className="flex md:w-[66%]">
      <Form {...form}>
        <AddForm
          exercises={exercises}
          setModal={setModal}
          form={form}
          formSchema={formSchema}
        />
      </Form>
      {modal.open && (
        <ExerciseModal
          open={modal.open}
          day={modal.day}
          accordions={accordions}
          setExercises={setExercises}
          onOpenChange={(open) => setModal({ open })}
          prevExercises={
            editExercises ? editExercises[modal.day!] : exercises[modal.day!]
          }
        />
      )}
    </div>
  );
};

export default SplitFormContainer;
