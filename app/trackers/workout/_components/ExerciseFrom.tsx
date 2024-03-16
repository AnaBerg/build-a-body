'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Form, TextField, Button, Select } from '@/components';
import { Set } from '@/lib/types/workout';
import { useMutation } from '@tanstack/react-query';
import { updateUserSet } from '@/lib/services/workoutService';

interface ExerciseFormProps {
  sets: Array<any>;
  name: string;
  exerciseId: string;
  technique?: string;
}

const handleDefaultValues = (sets: Array<any>, name: string, technique?: string) => {
  let df = { [`${name}-technique`]: technique };

  sets.map(({ reps, weight }, i) => {
    df = {
      [`${name}-reps-${i + 1}`]: reps,
      [`${name}-weight-${i + 1}`]: weight,
      ...df,
    };
  });

  return df;
};

const handleSets = (
  weight: string,
  reps: string,
  number: number,
  exerciseId: string,
  id: string,
): Partial<Set> | null => {
  if (weight === undefined || reps === undefined) {
    return null;
  }

  return {
    weight: Number(weight),
    reps: Number(reps),
    number,
    exerciseId,
    id,
  };
};

const ExerciseForm: React.FC<ExerciseFormProps> = ({ sets, name, exerciseId, technique }) => {
  const nm = name.replace(/\s/g, '-');
  const weightName = (i: number) => `${nm}-weight-${i + 1}`;
  const repsName = (i: number) => `${nm}-reps-${i + 1}`;
  const defaultValues = handleDefaultValues(sets, nm, technique);
  const methods = useForm<typeof defaultValues>({ defaultValues });
  const { mutate, isPending } = useMutation({
    mutationKey: ['updateSet'],
    mutationFn: (set: Partial<Set>) => updateUserSet(set),
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    const l = Object.keys(data).length / 2;
    const arr = Array.from({ length: l }, (_, i) => i);
    const setId = (i: number) => sets.find(({ number }) => number === i)?.id;

    const s = arr.map((_, i) =>
      handleSets(data[weightName(i)], data[repsName(i)], i + 1, exerciseId, setId(i + 1)),
    ) as Array<Partial<Set> | null>;

    s.map((set) => {
      if (set) {
        mutate(set);
      }
    });
  };

  return (
    <Form className="p-5" onSubmit={onSubmit} methods={methods}>
      {sets.map((_, i) => (
        <div key={i}>
          <p className="mb-2 font-bold">Set {i + 1}</p>
          <div className="flex flex-col gap-2 pb-5 md:flex-row">
            <TextField id={weightName(i)} label="Reps" />
            <TextField id={repsName(i)} label="Weight" />
          </div>
        </div>
      ))}
      <div className="pt-5">
        <TextField id={`${nm}-technique`} label="Technique" />
      </div>
      <div className="flex flex-row-reverse pt-10">
        <Button isLoading={isPending} type="submit">
          Submit
        </Button>
        <Button variant="text" onClick={() => methods.reset()}>
          reset
        </Button>
      </div>
    </Form>
  );
};

export default ExerciseForm;
