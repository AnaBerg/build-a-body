'use server';

import dateFormater from '@/helper/dateFormater';
import {
  getSetsByExerciseId,
  getUserExercises,
  getWorkoutById,
} from '../controllers/workoutController';
import getUserId from '../helpers/getUserId';

export const findMuscleGroupWorkChart = async () => {
  const userId = await getUserId();

  const exercises = await getUserExercises(userId);

  const setInfo = Promise.allSettled(
    exercises.map(async (exercise) => {
      const sets = await getSetsByExerciseId(exercise.id);
      const workout = await getWorkoutById(exercise.workoutId);

      const totalReps = sets.reduce((acc, set) => acc + set.reps, 0);
      const totalWeight = sets.reduce((acc, set) => acc + set.weight, 0);

      return {
        muscleGroup: exercise.muscleGroup,
        work: totalReps * totalWeight * sets.length + 1,
        date: workout.date,
      };
    }),
  ).then((results) => {
    return results.map(
      (result) =>
        (
          result as PromiseFulfilledResult<{
            muscleGroup: string;
            work: number;
            date: Date;
          }>
        ).value,
    );
  });

  let dataset = [] as Array<{ label: string; data: Array<number> }>;
  let l = [] as Array<Date>;

  (await setInfo).forEach(({ muscleGroup, work, date }) => {
    const indexD = dataset.findIndex((data) => data.label === muscleGroup);
    const indexL = l.findIndex((label) => label === date);

    if (indexD === -1) {
      dataset.push({ data: [work], label: muscleGroup });
    } else {
      dataset[indexD].data.push(work);
    }

    if (indexL === -1) {
      l.push(date);
    }
  });

  const sort = l.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const labels = sort.map((date) => dateFormater(new Date(date)));

  return { dataset, labels };
};
