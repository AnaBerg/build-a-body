import { LineChart } from '@/components';
import { findMuscleGroupWorkChart } from '@/lib/services/chartsService';

const DashboardPage: React.FC = async () => {
  const data = await findMuscleGroupWorkChart();
  const arr = Object.entries(data);

  return (
    <main>
      {arr.map(([key, { datasets, labels }]) => {
        return (
          <div key={key} className="py-5">
            <p className="font-bold">{key}</p>
            <LineChart datasets={datasets} labels={labels} />
          </div>
        );
      })}
      <p>{JSON.stringify(data)}</p>
    </main>
  );
};

export default DashboardPage;
