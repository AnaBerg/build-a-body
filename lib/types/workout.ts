import { DatabaseGeneric } from './generic';

export interface Split extends DatabaseGeneric {
  name: string;
  userId: string;
  splitDays: Array<string>;
  exercises: { [splitDay: string]: Array<{ name: string; muscleGroup: string }> };
}

export interface Workout extends DatabaseGeneric {
  splitId: string;
  splitDay: string;
  date: Date;
  userId: string;
}

export interface Exercise extends DatabaseGeneric {
  name: string;
  workoutId: string;
  muscleGroup: string;
  technique?: string;
}

export interface Set extends DatabaseGeneric {
  number: number;
  reps: number;
  weight: number;

  rir?: number;
  exerciseId: string;
}

export interface ExercisesWithSets extends Exercise {
  sets: Array<Set>;
}

export type CreateSplitInput = Omit<Split, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export type CreateWorkoutInput = Omit<Workout, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export type CreateExerciseInput = Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateSetInput = Omit<Set, 'id' | 'createdAt' | 'updatedAt'>;
