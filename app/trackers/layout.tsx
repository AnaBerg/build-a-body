'use client';

import { useSearchParams } from 'next/navigation';

import Tabs from './_components/Tabs';
import TrackerForm from './_components/TrackerForm';

interface TrackersLayoutProps extends React.PropsWithChildren {}

const TrackersLayout: React.FC<TrackersLayoutProps> = ({ children }) => {
  const searchParams = useSearchParams();

  const hasId = searchParams.has('id');

  return (
    <main className="w-full">
      <Tabs />
      <div className="flex flex-col gap-10 pt-10 2xl:flex-row">
        <TrackerForm />
        {hasId ? children : null}
      </div>
    </main>
  );
};

export default TrackersLayout;
