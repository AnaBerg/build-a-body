import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import authOptions from './auth';

const supabase = async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  const session = await getServerSession(authOptions);

  return createClient(url, secret, {
    global: {
      headers: {
        Authorization: `Bearer ${session?.supabaseAccessToken}`,
      },
    },
  });
};

export default supabase;
