'use client';

import Link from 'next/link';
import { signOut, useSession, signIn } from 'next-auth/react';

import { Button } from '@/components';

const SideBar: React.FC = () => {
  const { status } = useSession();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/',
    },
    {
      name: 'Trackers',
      path: '/trackers/workout',
    },
    {
      name: 'Settings',
      path: '/settings',
    },
  ];

  const handleClick = () => {
    if (status === 'authenticated') {
      signOut();
    }

    if (status === 'unauthenticated') {
      signIn();
    }
  };

  return (
    <div
      className={`absolute mt-[69px] flex h-[calc(100vh-69px)] w-screen flex-col border-r border-gray-600 bg-gray-900 px-5 py-2.5 sm:relative md:w-64 lg:w-72 2xl:w-96`}
    >
      <ul className="grow">
        {menuItems.map(({ name, path }, i) => (
          <li key={i} className="py-2.5">
            <Link className="text-xl text-white" href={path}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <Button isLoading={status === 'loading'} onClick={() => handleClick()} fullWidth>
          {status === 'authenticated' ? 'Sign Out' : 'Sign In'}
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
