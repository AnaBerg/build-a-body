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
      path: '/exercise/split/my',
      name: 'Split',
      icon: <CalendarDays />,
    },
  ];

  return (
    <main className="flex flex-col gap-4 p-4 md:flex-row md:gap-0 md:p-0">
      <SideBar title="Exercise" routes={routes} />
      {children}
    </main>
  );
};

export default ExerciseLayout;
