'use server';

import { createUserSplit } from '@/server/mutations';

export const onSubmit = async (data: any, exercises: any) => {
  'use server';

  const splitDays = Object.keys(data)
    .map((key) => {
      const value = data[key as keyof typeof data];
      if (value && key.includes('day')) {
        return {
          name: value,
          exercises: exercises[key as keyof typeof exercises],
        };
      }
    })
    .filter((day) => day !== undefined) as {
    name: string;
    exercises: string[];
  }[];

  await createUserSplit({ name: data.name, splitDays });
};
