'use client';

import { signIn } from 'next-auth/react';
import { Button } from '..';

const Login: React.FC = () => {
  return (
    <div className="flex h-screen w-screen p-96">
      <Button fullWidth onClick={() => signIn()}>
        Login
      </Button>
    </div>
  );
};

export default Login;
