import { LineChart, Paper } from '@/components';
import { findMuscleGroupWorkChart } from '@/lib/services/chartsService';

const DashboardPage: React.FC = async () => {
  const data = await findMuscleGroupWorkChart();
  const arr = Object.entries(data);

  return (
    <main className="flex h-full w-full flex-col gap-5">
      {arr.map(([key, { datasets, labels }]) => {
        return (
          <Paper key={key} className="p-5">
            <p className="font-bold">{key}</p>
            <LineChart datasets={datasets} labels={labels} />
          </Paper>
        );
      })}
    </main>
  );
};

export default DashboardPage;
