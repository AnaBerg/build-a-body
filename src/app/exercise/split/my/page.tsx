import Link from 'next/link';
import Table from './table';

import { getUserSplits } from '@/server/queries';

const MyPage: React.FC = async () => {
  const splits = await getUserSplits();
  return (
    <div className="flex md:w-[66%]">
      <Table splits={splits} />
    </div>
  );
};

export default MyPage;
