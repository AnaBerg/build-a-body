'use server';

import dateFormater from '@/helper/dateFormater';
import {
  createExercise,
  createSet,
  createSplit,
  createWorkout,
  getExercisesByWorkoutId,
  getSetsByExerciseId,
  getUserSplits,
  getUserWorkouts,
  getWorkoutById,
  updateExercise,
  updateSet,
  updateWorkout,
} from '../controllers/workoutController';
import getUserId from '../helpers/getUserId';
import {
  CreateExerciseInput,
  CreateSetInput,
  CreateSplitInput,
  CreateWorkoutInput,
  Exercise,
  ExercisesWithSets,
  Set,
  Split,
  Workout,
} from '../types/workout';

export const createUserSplit = async (split: CreateSplitInput): Promise<string> => {
  try {
    const userId = await getUserId();

    return await createSplit(split, userId);
  } catch (error) {
    throw error;
  }
};

export const findUserSplits = async (): Promise<Array<Split>> => {
  try {
    const userId = await getUserId();

    return await getUserSplits(userId);
  } catch (error) {
    throw error;
  }
};

export const createUserWorkout = async (workout: CreateWorkoutInput): Promise<string> => {
  try {
    const userId = await getUserId();

    const userWorkouts = await getUserWorkouts(userId);

    const handleSplit = async (workoutId: string) => {
      const userSplits = await getUserSplits(userId);
      const split = userSplits.find(({ id }: Split) => id === workout.splitId);

      split.exercises[workout.splitDay].map(
        async ({ muscleGroup, exercise }: { exercise: string; muscleGroup: string }) => {
          await createUserExercise(
            { name: exercise, workoutId, muscleGroup },
            Array.from(
              { length: 3 },
              (_, i) =>
                ({ reps: 0, weight: 0, number: i + 1 }) as Omit<CreateSetInput, 'exerciseId'>,
            ),
          );
        },
      );
    };

    if (userWorkouts.length > 0) {
      const mathingDate = userWorkouts.find(
        ({ date }: Workout) =>
          dateFormater(new Date(date)) === dateFormater(new Date(workout.date)),
      );

      if (mathingDate) {
        const exercises = await getExercisesByWorkoutId(mathingDate.id);

        if (exercises.length === 0) {
          handleSplit(mathingDate.id);
        }

        return mathingDate.id;
      }
    }

    const id = await createWorkout(workout, userId);

    handleSplit(id);

    return id;
  } catch (error) {
    throw error;
  }
};

export const findUserWorkouts = async (): Promise<Array<Workout>> => {
  try {
    const userId = await getUserId();

    return await getUserWorkouts(userId);
  } catch (error) {
    throw error;
  }
};

export const findWorkoutById = async (id: string): Promise<Workout> => {
  try {
    return await getWorkoutById(id);
  } catch (error) {
    throw error;
  }
};

export const createUserExercise = async (
  exercise: CreateExerciseInput,
  sets: Array<Omit<CreateSetInput, 'exerciseId'>>,
): Promise<Array<PromiseSettledResult<string>>> => {
  try {
    const exerciseId = await createExercise(exercise);

    if (!exerciseId) {
      throw new Error('Error creating exercise');
    }

    const setsWithWorkoutId = sets.map((set) => ({ ...set, exerciseId }));

    const setIds = setsWithWorkoutId.map(async (set) => await createSet(set));

    return await Promise.allSettled(setIds);
  } catch (error) {
    throw error;
  }
};

export const findUserExercisesByWorkoutId = async (
  workoutId: string,
): Promise<Array<ExercisesWithSets>> => {
  try {
    const exercises = await getExercisesByWorkoutId(workoutId);

    if (!exercises) {
      throw new Error('Error getting exercises');
    }

    const promisesSets = exercises.map(async ({ id }: Exercise) => await getSetsByExerciseId(id));

    const sets = await Promise.allSettled(promisesSets);

    const exercisesWithSets = exercises.map((exercise) => {
      const exerciseSets = sets.find(
        (set) => set.status === 'fulfilled' && set.value[0].exerciseId === exercise.id,
      );

      return { ...exercise, sets: exerciseSets?.status === 'fulfilled' ? exerciseSets.value : [] };
    });

    exercisesWithSets.forEach((exercise) => {
      exercise.sets.sort((a, b) => a.number - b.number);
    });

    return exercisesWithSets;
  } catch (error) {
    throw error;
  }
};

export const updateUserWorkout = async (workout: Partial<Workout>): Promise<string> => {
  try {
    return await updateWorkout(workout);
  } catch (error) {
    throw error;
  }
};

export const updateUserSet = async (set: Partial<Set>): Promise<string> => {
  try {
    if (!set.id) {
      return await createSet(set as CreateSetInput);
    }

    return await updateSet(set);
  } catch (error) {
    throw error;
  }
};
