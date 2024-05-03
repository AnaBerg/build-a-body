import { db } from '@/server/db';
import { auth } from '@clerk/nextjs/server';
import { splitDays, splits } from './db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createUserSplit = async (data: {
  name: string;
  splitDays: Array<{ name: string; exercises: Array<string> }>;
}) => {
  const user = auth();

  if (!user.userId) {
    throw new Error('Unauthorized');
  }

  const activeSplits = await db.query.splits.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.userId, user.userId), eq(model.active, true)),
  });

  if (activeSplits) {
    await db
      .update(splits)
      .set({ active: false })
      .where(eq(splits.id, activeSplits.id));
  }

  const splitInserted = await db
    .insert(splits)
    .values({ name: data.name, userId: user.userId, active: true })
    .returning();

  if (!splitInserted) {
    throw new Error('Failed to create split');
  }

  const splitDaysInserted = data.splitDays.map(async ({ exercises, name }) => {
    return await db
      .insert(splitDays)
      .values({
        exercises,
        name,
        splitId: splitInserted[0].id,
        userId: user.userId,
      })
      .returning();
  });

  if (!splitDaysInserted) {
    throw new Error('Failed to create split days');
  }

  revalidatePath('/exercise/split/my');
  redirect('/exercise/split/my');
};
