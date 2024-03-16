'use client';

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

type Dataset = {
  label: string;
  data: Array<number>;
  borderColor: string;
};

interface LineChartProps {
  labels: Array<string>;
  datasets: Array<Dataset>;
}

const LineChart: React.FC<LineChartProps> = ({ datasets, labels }) => {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
  );

  const data = {
    labels,
    datasets,
  };

  const options = {
    elements: {
      line: {
        tension: 0,
        borderRadius: 2,
        fill: 'start',
      },
      point: { radius: 0, hitRadius: 10, hoverRadius: 5 },
    },
  };

  return <Line data={data} options={options} className="h-full w-full" />;
};

export default LineChart;
