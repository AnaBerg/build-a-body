'use server';

import dateFormater from '@/helper/dateFormater';
import {
  getSetsByExerciseId,
  getUserExercises,
  getUserWorkouts,
} from '../controllers/workoutController';
import getUserId from '../helpers/getUserId';
import { Workout } from '../types/workout';

export const findMuscleGroupWorkChart = async () => {
  const userId = await getUserId();

  const exercises = await getUserExercises(userId);
  const workouts = await getUserWorkouts(userId);

  const d = await Promise.all(
    exercises.map(async ({ id, muscleGroup, name, workoutId }) => {
      const sets = await getSetsByExerciseId(id);
      const workout = workouts.find((workout) => workout.id === workoutId) as Workout;
      let work = 0;

      sets.forEach(({ number, reps, weight }) => {
        work += number * reps * weight;
      });

      return {
        muscleGroup,
        date: dateFormater(workout.date),
        name,
        work,
      };
    }),
  );

  let data = {} as {
    [muscleGroup: string]: {
      labels: string[];
      datasets: Array<{ label: string; data: Array<number>; borderColor: string }>;
    };
  };

  d.sort((a, b) => (a.date > b.date ? 1 : -1));

  d.forEach(({ date, muscleGroup, name, work }) => {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    if (!data[muscleGroup]) {
      data[muscleGroup] = {
        labels: [date],
        datasets: [{ label: name, data: [work], borderColor: color }],
      };
    }

    if (!data[muscleGroup].labels.includes(date)) {
      data[muscleGroup].labels.push(date);
    }

    const label = data[muscleGroup].datasets.find((d) => d.label === name);

    if (label) {
      label.data.push(work);
      return;
    }

    data[muscleGroup].datasets.push({ label: name, data: [work], borderColor: color });
  });

  return data;
};
