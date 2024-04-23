'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface SideBarProps {
  routes: Array<{ path: string; name: string; icon: JSX.Element }>;
  title: string;
}

const SideBar: React.FC<SideBarProps> = ({ routes, title }) => {
  const pathname = usePathname();

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
    <div className="sticky top-[60px] z-50 flex h-[calc(100vh-60px)] w-[250px] flex-col gap-4 border-r border-border p-5 py-5">
      <h4 className=" pb-2 text-xl font-semibold">{title}</h4>
      {routes.map(({ icon, name, path }, i) => (
        <Link
          key={`${i}-${name}`}
          data-testid={`link-${name}`}
          href={path}
          className={cn(
            'flex gap-2 text-foreground transition-colors hover:text-foreground/80 hover:underline',
            isCurrentRoute(path) ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {icon}
          {name}
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
