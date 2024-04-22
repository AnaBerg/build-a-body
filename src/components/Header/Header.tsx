import Link from 'next/link';

import { NavBar, ThemeButton } from './components';
import { UserButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '../ui/button';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex flex-1 gap-8">
          <Link className="text-xl font-semibold text-primary" href="/">
            Build-A-Body
          </Link>
          <NavBar />
        </div>
        <div className="flex items-center justify-end gap-4 space-x-2">
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
