'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';

interface SideBarProps {
  routes: Array<{ path: string; name: string; icon: JSX.Element }>;
  title: string;
}

const SideBar: React.FC<SideBarProps> = ({ routes, title }) => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const isCurrentRoute = (route: string) => {
    if (pathname === '/') {
      return false;
    }

    if (pathname.includes(route.split('/')[2])) {
      return true;
    }

    return false;
  };

  return (
    <>
      <div className="sticky top-[60px] z-50 hidden h-[calc(100vh-60px)] w-[250px] flex-col gap-4 border-r border-border p-5 py-5 md:flex">
        <h4 className=" pb-2 text-xl font-semibold">{title}</h4>
        {routes.map(({ icon, name, path }, i) => (
          <Link
            key={`${i}-${name}`}
            data-testid={`link-${name}`}
            href={path}
            className={cn(
              'flex gap-2 transition-colors hover:text-foreground/80 hover:underline',
              isCurrentRoute(path) ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            {icon}
            {name}
          </Link>
        ))}
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="md:hidden" asChild>
          <Button variant="outline">Open Sidebar</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 py-5">
            {routes.map(({ icon, name, path }, i) => (
              <Link
                key={`${i}-${name}`}
                data-testid={`link-${name}`}
                href={path}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex gap-2 transition-colors hover:text-foreground/80 hover:underline',
                  isCurrentRoute(path)
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {icon}
                {name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SideBar;
