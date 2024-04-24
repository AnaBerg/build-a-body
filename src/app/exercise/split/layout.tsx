'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CirclePlus, Pencil, Star } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const SplitLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const routes = [
    { name: 'My splits', path: '/exercise/split/my', icon: <Star /> },
    { name: 'Add split', path: '/exercise/split/add', icon: <CirclePlus /> },
    { name: 'Edit split', path: '/exercise/split/edit', icon: <Pencil /> },
  ];

  const isCurrentRoute = (route: string) => {
    if (pathname === '/') {
      return false;
    }

    if (pathname.includes(route.split('/')[1])) {
      return true;
    }

    return false;
  };

  return (
    <div className="flex w-[calc(100vw-250px)]">
      <div className="flex w-[33%] p-10">
        <Card className="h-fit w-full">
          <CardHeader>
            <CardTitle>Split Configuration</CardTitle>
            <CardDescription>
              Set the splits the way <span className="font-semibold">YOU</span>{' '}
              want!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5 text-lg">
              {routes.map(({ icon, name, path }, i) => (
                <Link
                  key={`${i}-${name}`}
                  data-testid={`link-${name}`}
                  href={path}
                  className={cn(
                    'flex gap-5 text-foreground transition-colors hover:text-foreground/80 hover:underline',
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
          </CardContent>
        </Card>
      </div>
      {children}
    </div>
  );
};

export default SplitLayout;
