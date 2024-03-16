import { getSession } from 'next-auth/react';
import authOptions from '../auth';
import { getServerSession } from 'next-auth';

const getUserId = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error('User is not authenticated');
  }

  return session.user.id;
};

export default getUserId;
