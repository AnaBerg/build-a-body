'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const routes = [
    { path: '/exercise/dashboard', name: 'Exercise' },
    { path: '/meal/dashboard', name: 'Meal' },
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
    <nav className="flex items-center gap-4 text-sm lg:gap-6">
      {routes.map(({ name, path }, i) => (
        <Link
          data-testid={`link-${name}`}
          key={i + name}
          href={path}
          className={cn(
            ' transition-colors hover:text-foreground/80',
            isCurrentRoute(path) ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
