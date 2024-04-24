import Link from 'next/link';
import Table from './table';

import { getUserSplits } from '@/server/queries';

const MyPage: React.FC = async () => {
  const splits = await getUserSplits();
  return (
    <div className="flex w-[66%] p-10">
      <Table splits={splits} />
    </div>
  );
};

export default MyPage;
