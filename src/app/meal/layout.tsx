import SideBar from '@/components/SideBar';

import { LayoutDashboard, Apple, NotebookPen } from 'lucide-react';

const MealLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const routes = [
    {
      path: '/meal/dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard />,
    },
    {
      path: '/meal/register',
      name: 'Register',
      icon: <NotebookPen />,
    },
    {
      path: '/meal/macros',
      name: 'Macros',
      icon: <Apple />,
    },
  ];

  return (
    <main className="flex flex-col gap-4 p-4 md:flex-row md:gap-0 md:p-0">
      <SideBar title="Meal" routes={routes} />
      {children}
    </main>
  );
};

export default MealLayout;
