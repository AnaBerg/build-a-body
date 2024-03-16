import { LineChart } from '@/components';
import { findMuscleGroupWorkChart } from '@/lib/services/chartsService';

const DashboardPage: React.FC = async () => {
  const { dataset, labels } = await findMuscleGroupWorkChart();

  const datasetWithColor = dataset.map((data) => {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return {
      ...data,
      borderColor: color,
    };
  });

  return (
    <main>
      <p>Dashboard</p>
      <div className="h-96 w-full rounded-sm bg-gray-200 p-2">
        <LineChart datasets={datasetWithColor} labels={labels} />
      </div>
    </main>
  );
};

export default DashboardPage;
