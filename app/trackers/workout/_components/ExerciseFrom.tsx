'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Form, TextField, Button, Select } from '@/components';
import { CreateSetInput, Set } from '@/lib/types/workout';
import { useMutation } from '@tanstack/react-query';
import { updateUserSet } from '@/lib/services/workoutService';
import { useState } from 'react';

interface ExerciseFormProps {
  sets: Array<Set>;
  name: string;
  exerciseId: string;
  technique?: string;
}

const handleDefaultValues = (sets: Array<Set>) => {
  let defaultValues = {};

  sets.forEach((set) => {
    defaultValues = {
      ...defaultValues,
      [`reps-${set.number}`]: set.reps,
      [`weights-${set.number}`]: set.weight,
    };
  });

  return defaultValues;
};

const handleSets = (sets: Array<Partial<Set>>, data: any): Array<Partial<Set>> => {
  const updatedSets = sets.map((set) => {
    const { number } = set;
    return { ...set, reps: data[`reps-${number}`], weight: data[`weights-${number}`] };
  });

  return updatedSets;
};

const ExerciseForm: React.FC<ExerciseFormProps> = ({ sets, exerciseId }) => {
  const methods = useForm({ defaultValues: handleDefaultValues(sets) });
  const [s, setS] = useState<Array<Partial<Set>>>(sets);
  const { mutate, isPending } = useMutation({
    mutationKey: ['updateSet'],
    mutationFn: (set: Partial<Set>) => updateUserSet(set),
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    const updatedSets = handleSets(s, data);

    updatedSets.forEach((set) => {
      mutate(set);
    });
  };

  const handleRemove = (arr: Array<Partial<Set>>, index: number) => {
    const newArr = arr.filter((_, i) => i !== index);
    return newArr;
  };

  const handleAdd = (number: number): CreateSetInput => {
    return { number, exerciseId, reps: 0, weight: 0 };
  };

  return (
    <Form className="p-5" onSubmit={onSubmit} methods={methods}>
      {s.map(({ number }, i) => (
        <div key={i}>
          <p className="mb-2 font-bold">Set {number}</p>
          <div className="flex flex-col items-center gap-2 pb-5 md:flex-row">
            <TextField id={`reps-${number}`} label="Reps" />
            <TextField id={`weights-${number}`} label="Weight" />
            <Button onClick={() => setS((p) => handleRemove(p, i))} variant="text">
              remove set
            </Button>
          </div>
        </div>
      ))}
      <Button onClick={() => setS((p) => [...p, handleAdd(p.length + 1)])}>add set</Button>
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
