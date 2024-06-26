import 'server-only';

import { db } from '@/server/db';
import { auth } from '@clerk/nextjs/server';

export const getUserSplits = async () => {
  const user = auth();

  if (!user.userId) {
    throw new Error('Unauthorized');
  }

  const splitsRaw = await db.query.splits.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });

  if (!splitsRaw) {
    return [];
  }

  const splitDaysPromise = await Promise.allSettled(
    splitsRaw.map(({ id }) => {
      const sd = db.query.splitDays.findMany({
        where: (model, { eq }) => eq(model.splitId, id),
      });

      if (!sd) {
        return [];
      }

      return sd;
    })
  );

  const splitDaysRaw = splitDaysPromise.map((p) => {
    if (p.status === 'fulfilled') {
      return p.value;
    }

    return null;
  })[0];

  if (!splitDaysRaw) {
    return splitsRaw.map(({ active, id, name }) => ({
      active,
      id,
      name,
      splitDays: [],
    }));
  }

  const splits = splitsRaw.map(({ active, id, name }) => {
    const splitDays = splitDaysRaw
      .filter((sd) => sd.splitId === id)
      .map(({ name }) => name);

    return {
      active,
      id,
      name,
      splitDays,
    };
  });

  return splits;
};

export const getExercisesForAccordion = async () => {
  const exercisesRaw = await db.query.exercises.findMany();

  if (!exercisesRaw) {
    return [];
  }

  const exercises = exercisesRaw.reduce(
    (
      acc: Array<{
        title: string;
        value: string;
        exercises: Array<{ name: string; label: string }>;
      }>,
      { name, muscleGroup }
    ) => {
      const found = acc.find((a) => a.value === muscleGroup);

      if (found) {
        found.exercises.push({
          name: name.toLowerCase().replaceAll(' ', '_'),
          label: name,
        });
      } else {
        acc.push({
          title: muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1),
          value: muscleGroup,
          exercises: [
            { name: name.toLowerCase().replaceAll(' ', '_'), label: name },
          ],
        });
      }

      return acc;
    },
    []
  );

  return exercises;
};
