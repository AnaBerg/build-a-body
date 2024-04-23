import SideBar from '@/components/SideBar';

import { LayoutDashboard, CalendarDays, NotebookPen } from 'lucide-react';

const ExerciseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const routes = [
    {
      path: '/exercise/dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard />,
    },
    {
      path: '/exercise/register',
      name: 'Register',
      icon: <NotebookPen />,
    },
    {
      path: '/exercise/split',
      name: 'Split',
      icon: <CalendarDays />,
    },
  ];

  return (
    <main className="flex">
      <SideBar title="Exercise" routes={routes} />
      {children}
    </main>
  );
};

export default ExerciseLayout;
