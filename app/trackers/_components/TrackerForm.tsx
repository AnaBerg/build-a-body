'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Button, Form, Paper, Select, DatePicker } from '@/components';

import { createUserWorkout, findUserSplits } from '@/lib/services/workoutService';
import { CreateWorkoutInput } from '@/lib/types/workout';

type InputsWorkout = {
  date: Date;
  split: string;
  splitDay: string;
};

type InputsDiet = {
  date: Date;
  meal: string;
};

const TackerForm = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const methods = useForm<InputsWorkout | InputsDiet>({ defaultValues: {} });
  const splitSelected = methods.watch('split');
  const { data, isError } = useQuery({
    queryKey: ['splits'],
    queryFn: () => findUserSplits(),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ['createWorkout'],
    mutationFn: (data: CreateWorkoutInput) => createUserWorkout(data),
    onSuccess: (id: string) => {
      push(`${pathname}?id=${id}`);
    },
  });

  const splitItems = () => {
    if (data) {
      return data.map((split) => ({ label: split.name, value: split.id }));
    }
    return [];
  };

  const splitIDaytems = () => {
    if (splitSelected && data) {
      const split = data.find((split) => split.id === splitSelected);
      if (split) {
        return split.splitDays.map((splitDay: string) => ({ label: splitDay, value: splitDay }));
      }
    }

    return [];
  };

  const mealItems = [
    { label: 'Breakfeast', value: 'BREAKFEAT' },
    { label: 'Lunch', value: 'LUNCH' },
    { label: 'Snack', value: 'SNACK' },
    { label: 'Dinner', value: 'DINNER' },
  ];

  const onSubmit: SubmitHandler<InputsWorkout | InputsDiet> = (data) => {
    if (data instanceof Object && 'date' in data && 'split' in data && 'splitDay' in data) {
      const { date, split, splitDay } = data;

      mutate({ date, splitDay, splitId: split });
    }
  };

  return (
    <Paper className="h-fit p-5 2xl:w-[750px]">
      <Form className="flex flex-col gap-5" methods={methods} onSubmit={onSubmit}>
        <DatePicker id="date" label="Pick a date" />
        {pathname.includes('diet') ? (
          <Select id="meal" label="Meal" items={mealItems} />
        ) : (
          <>
            <Select disabled={isError} id="split" label="Split" items={splitItems()} />
            {splitIDaytems().length !== 0 ? (
              <Select id="splitDay" label="Split Day" items={splitIDaytems()} />
            ) : null}
          </>
        )}
        <div className="flex flex-row-reverse pt-5">
          <Button isLoading={isPending} type="submit">
            Submit
          </Button>
          <Button variant="text" onClick={() => methods.reset()}>
            reset
          </Button>
        </div>
      </Form>
    </Paper>
  );
};
export default TackerForm;
