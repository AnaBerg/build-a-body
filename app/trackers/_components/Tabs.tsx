'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Tabs as MtTabs, Tab, TabsHeader } from '@material-tailwind/react';

const Tabs: React.FC = () => {
  const pathname = usePathname();
  const isCurrentRoute = (route: string) => pathname.includes(route);

  const tabItems = [
    {
      name: 'Workout',
      route: '/trackers/workout',
    },
    {
      name: 'Diet',
      route: '/trackers/diet',
    },
  ];

  return (
    <MtTabs value="Workout">
      <TabsHeader className="rounded-sm bg-gray-600" placeholder="">
        {tabItems.map(({ name, route }, i) => (
          <Link className="w-full" key={i} href={route}>
            <Tab
              className={`${isCurrentRoute(route) ? '' : 'text-white'} transition-colors duration-500 ease-in-out`}
              placeholder=""
              value={name}
            >
              {name}
            </Tab>
          </Link>
        ))}
      </TabsHeader>
    </MtTabs>
  );
};

export default Tabs;
