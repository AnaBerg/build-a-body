import { v4 } from 'uuid';

import {
  CreateExerciseInput,
  CreateSetInput,
  CreateSplitInput,
  CreateWorkoutInput,
  Exercise,
  Set,
  Split,
  Workout,
} from '../types/workout';
import supabase from '../supabase';
import supabaseError from '../helpers/supabaseError';

export const createSplit = async (split: CreateSplitInput, userId: string) => {
  const sb = await supabase();

  const newSplit = { ...split, id: v4(), userId };

  const { error } = await sb.from('splits').insert(newSplit);

  if (error) {
    supabaseError('Error creating a new split', error);
  }

  return newSplit.id;
};

export const getUserSplits = async (userId: string) => {
  const sb = await supabase();

  const { data, error } = await sb.from('splits').select().eq('userId', userId);

  if (error) {
    supabaseError('Error getting user splits', error);
  }

  if (!data) {
    return [];
  }

  return data;
};

export const getSplitById = async (id: string) => {
  const sb = await supabase();

  const { data, error } = await sb.from('splits').select().eq('id', id);

  if (error) {
    supabaseError('Error getting split by id', error);
  }

  if (!data) {
    throw new Error('Split not found');
  }

  return data[0];
};

export const updateSplit = async (split: Partial<Split>) => {
  const sb = await supabase();

  const updatedSplit = { ...split, updatedAt: new Date() };

  const { error } = await sb.from('splits').update(updatedSplit).eq('id', split.id);

  if (error) {
    supabaseError('Error updating split', error);
  }

  return split.id;
};

export const deleteSplitById = async (id: string) => {
  const sb = await supabase();

  const { error } = await sb.from('splits').delete().eq('id', id);

  if (error) {
    supabaseError('Error deleting split', error);
  }

  return true;
};

export const createWorkout = async (workout: CreateWorkoutInput, userId: string) => {
  const sb = await supabase();

  const newWorkout = { ...workout, id: v4(), userId };

  const { error } = await sb.from('workouts').insert(newWorkout);

  if (error) {
    supabaseError('Error creating a new workout', error);
  }

  return newWorkout.id;
};

export const getUserWorkouts = async (userId: string): Promise<Array<Workout>> => {
  const sb = await supabase();

  const { data, error } = await sb.from('workouts').select().eq('userId', userId);

  if (error) {
    supabaseError('Error getting user workouts', error);
  }

  if (!data) {
    return [];
  }

  return data;
};

export const getWorkoutById = async (id: string): Promise<Workout> => {
  const sb = await supabase();

  const { data, error } = await sb.from('workouts').select().eq('id', id);

  if (error) {
    supabaseError('Error getting workout by id', error);
  }

  if (!data) {
    throw new Error('Workout not found');
  }

  return data[0];
};

export const updateWorkout = async (workout: Partial<Workout>) => {
  const sb = await supabase();

  if (!workout.id) {
    throw new Error('Workout not found');
  }

  const updatedOWorkout = { ...workout, updatedAt: new Date() };

  const { error } = await sb.from('workouts').update(updatedOWorkout).eq('id', workout.id);

  if (error) {
    supabaseError('Error updating workout', error);
  }

  return workout.id;
};

export const deleteWorkoutById = async (id: string) => {
  const sb = await supabase();

  const { error } = await sb.from('workouts').delete().eq('id', id);

  if (error) {
    supabaseError('Error deleting workout', error);
  }

  return true;
};

export const createExercise = async (exercise: CreateExerciseInput) => {
  const sb = await supabase();

  const newExercise = { ...exercise, id: v4() };

  const { error } = await sb.from('exercises').insert(newExercise);

  if (error) {
    supabaseError('Error creating a new exercise', error);
  }

  return newExercise.id;
};

export const getExercisesByWorkoutId = async (workoutId: string): Promise<Array<Exercise>> => {
  const sb = await supabase();

  const { data, error } = await sb.from('exercises').select().eq('workoutId', workoutId);

  if (error) {
    supabaseError('Error getting exercises by workout id', error);
  }

  if (!data) {
    return [];
  }

  return data;
};

export const getExerciseById = async (id: string) => {
  const sb = await supabase();

  const { data, error } = await sb.from('exercises').select().eq('id', id);

  if (error) {
    supabaseError('Error getting exercise by id', error);
  }

  if (!data) {
    throw new Error('Exercise not found');
  }

  return data[0];
};

export const getUserExercises = async (userId: string): Promise<Array<Exercise>> => {
  const workouts = await getUserWorkouts(userId);

  const promiseExercises = await Promise.allSettled(
    workouts.map(async ({ id }) => {
      return await getExercisesByWorkoutId(id);
    }),
  );

  const exercises = promiseExercises.flatMap((promise) => {
    if (promise.status === 'fulfilled') {
      return promise.value;
    }
  });

  return exercises as Array<Exercise>;
};

export const updateExercise = async (exercise: Partial<Exercise>) => {
  const sb = await supabase();

  if (!exercise.id) {
    throw new Error('Exercise not found');
  }

  const updatedExercise = { ...exercise, updatedAt: new Date() };

  const { error } = await sb.from('exercises').update(updatedExercise).eq('id', exercise.id);

  if (error) {
    supabaseError('Error updating exercise', error);
  }

  return exercise.id;
};

export const deleteExerciseById = async (id: string) => {
  const sb = await supabase();

  const { error } = await sb.from('exercises').delete().eq('id', id);

  if (error) {
    supabaseError('Error deleting exercise', error);
  }

  return true;
};

export const createSet = async (set: CreateSetInput) => {
  const sb = await supabase();

  const newSet = { ...set, id: v4() };

  const { error } = await sb.from('sets').insert(newSet);

  if (error) {
    supabaseError('Error creating a new set', error);
  }

  return newSet.id;
};

export const getSetsByExerciseId = async (exerciseId: string): Promise<Array<Set>> => {
  const sb = await supabase();

  const { data, error } = await sb.from('sets').select().eq('exerciseId', exerciseId);

  if (error) {
    supabaseError('Error getting sets by exercise id', error);
  }

  if (!data) {
    return [];
  }

  return data;
};

export const getSetById = async (id: string) => {
  const sb = await supabase();

  const { data, error } = await sb.from('sets').select().eq('id', id);

  if (error) {
    supabaseError('Error getting set by id', error);
  }

  if (!data) {
    throw new Error('Set not found');
  }

  return data[0];
};

export const updateSet = async (set: Partial<Exercise>) => {
  const sb = await supabase();

  if (!set.id) {
    throw new Error('Set not found');
  }

  const updatedSet = { ...set, updatedAt: new Date() };

  const { error } = await sb.from('sets').update(updatedSet).eq('id', set.id);

  if (error) {
    supabaseError('Error updating set', error);
  }

  return set.id;
};

export const deleteSetById = async (id: string) => {
  const sb = await supabase();

  const { error } = await sb.from('sets').delete().eq('id', id);

  if (error) {
    supabaseError('Error deleting set', error);
  }

  return true;
};
