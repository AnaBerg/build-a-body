import { sql } from 'drizzle-orm';
import {
  boolean,
  pgTableCreator,
  uuid,
  timestamp,
  varchar,
  integer,
} from 'drizzle-orm/pg-core';

const createTable = pgTableCreator((name) => `build_a_body_${name}`);

export const splits = createTable('splits', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  active: boolean('active').default(false),
  userId: varchar('user_id', { length: 256 }).notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const exercises = createTable('exercises', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  description: varchar('description', { length: 256 }),
  muscleGroup: varchar('muscle_group', { length: 256 }).notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const splitDays = createTable('split_days', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  exercises: varchar('exercises', { length: 256 }).array(),
  splitId: uuid('split_id')
    .notNull()
    .references(() => splits.id),
  userId: varchar('user_id', { length: 256 }).notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const workouts = createTable('workouts', {
  id: uuid('id').defaultRandom().primaryKey(),
  date: timestamp('date').notNull(),
  splitDayId: uuid('split_day_id')
    .notNull()
    .references(() => splitDays.id),
  userId: varchar('user_id', { length: 256 }).notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const exercisesPerformed = createTable('exercises_performed', {
  id: uuid('id').defaultRandom().primaryKey(),
  reps: integer('weight').notNull(),
  weight: integer('weight').notNull(),
  exerciseId: uuid('exercise_id')
    .notNull()
    .references(() => exercises.id),
  workoutId: uuid('workout_id')
    .notNull()
    .references(() => workouts.id),
  userId: varchar('user_id', { length: 256 }).notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
