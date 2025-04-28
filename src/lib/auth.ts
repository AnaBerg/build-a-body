import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async authorized({ auth, request }) {
      if (!auth) {
        if (request.nextUrl.pathname.startsWith('/api/auth')) {
          return true;
        }
        return false;
      }
      return true;
    },
  },
});
