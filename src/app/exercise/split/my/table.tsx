'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';

import DataGrid from '@/components/DataGrid';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Check, CirclePlus, Pencil } from 'lucide-react';

type Split = {
  id: string;
  name: string;
  splitDays: Array<string>;
  active: boolean | null;
};

const columns: Array<ColumnDef<Split>> = [
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'splitDays',
    header: 'Split days',
    cell: ({ row: { original } }) => (
      <div className="flex gap-2">
        {original.splitDays.map((day, i) => (
          <p key={`${day}-${i}`}>
            {day}
            {i + 1 !== original.splitDays.length && ','}
          </p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'active',
    header: 'Active',
    cell: ({ row: { original } }) =>
      original.active ? <Check className="text-primary" /> : null,
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row: { original } }) => (
      <Link
        className="text-foreground transition-colors hover:text-foreground/80"
        href={`/exercise/split/edit/${original.id}`}
      >
        <Pencil />
      </Link>
    ),
  },
];

const Table: React.FC<{ splits: Array<Split> }> = ({ splits }) => {
  const router = useRouter();

  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle>My splits</CardTitle>
      </CardHeader>
      <CardContent>
        <DataGrid columns={columns} data={splits} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center">
          <Button
            className="gap-2"
            onClick={() => router.push('/exercise/split/add')}
          >
            <CirclePlus />
            Add new split
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Table;
