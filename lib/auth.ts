import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import jwt from 'jsonwebtoken';

import type { Adapter } from 'next-auth/adapters';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }) as Adapter,
  callbacks: {
    session: async ({ session, user }) => {
      const signinSecret = process.env.SUPABASE_JWT_SECRET as string;

      session.user.id = user.id;

      const payload = {
        aud: 'authenticated',
        exp: Math.floor(new Date(session.expires).getTime() / 1000),
        sub: user.id,
        email: user.email,
        role: 'authenticated',
      };

      session.supabaseAccessToken = jwt.sign(payload, signinSecret);

      return session;
    },
  },
};

export default authOptions;
