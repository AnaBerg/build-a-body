import Link from 'next/link';

import { NavBar, ThemeButton } from './components';
import { UserButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '../ui/button';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 h-[60px] w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 w-full items-center gap-8">
        <Link
          className="hidden text-xl font-semibold text-primary md:flex"
          href="/"
        >
          Build-A-Body
        </Link>
        <Link className="text-xl font-semibold text-primary md:hidden" href="/">
          BAB
        </Link>
        <div>
          <NavBar />
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeButton />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignUpButton>
              <Button variant="outline">Sign In</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
