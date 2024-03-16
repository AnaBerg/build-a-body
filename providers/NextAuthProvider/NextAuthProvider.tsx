'use client';

import { SessionProvider } from 'next-auth/react';

const NextAuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
