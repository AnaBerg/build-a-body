'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { SideBar } from './components';

const Header: React.FC = () => {
  const [width, setWidth] = useState<number>(1920);
  const isMobile = width < 640;
  const [open, setOpen] = useState<boolean>(!isMobile);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <>
      <header className="absolute flex w-screen items-center justify-between border-b  border-gray-600 p-5">
        <div className="flex items-center justify-between">
          <button onClick={() => setOpen((p) => !p)} className="mr-5  text-white">
            M
          </button>
          <Link href="/" className="text-xl text-white">
            Build-A-Body
          </Link>
        </div>
      </header>
      {open ? <SideBar /> : null}
    </>
  );
};

export default Header;
