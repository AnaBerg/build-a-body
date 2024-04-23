import { sql } from 'drizzle-orm';
import {
  index,
  pgTableCreator,
  uuid,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const createTable = pgTableCreator((name) => `build_a_body_${name}`);

export const splits = createTable('splits', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  splitDays: varchar('split_days', { length: 256 }).array().notNull(),
  exercises: varchar('exerercises', { length: 256 }).array().notNull(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt')
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
  updatedAt: timestamp('updatedAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
