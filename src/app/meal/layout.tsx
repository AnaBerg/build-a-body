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
    <main className="flex">
      <SideBar title="Meal" routes={routes} />
      {children}
    </main>
  );
};

export default MealLayout;
