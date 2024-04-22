'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const routes = [
    { path: '/exercise', name: 'Exercise' },
    { path: '/meal', name: 'Meal' },
  ];

  const isCurrentRoute = (route: string) => {
    if (pathname === '/') {
      return false;
    }

    if (pathname.includes(route)) {
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
          className={
            isCurrentRoute(path)
              ? 'text-foreground transition-colors hover:text-foreground/80'
              : 'text-foreground/60 transition-colors hover:text-foreground/80'
          }
        >
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
