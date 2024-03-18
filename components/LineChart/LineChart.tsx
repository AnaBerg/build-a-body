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

  return (
    <Line
      data={data}
      options={{
        plugins: {
          legend: {
            labels: { color: 'white' },
          },
        },
        elements: {
          point: { radius: 2.5, hitRadius: 10, hoverRadius: 5 },
          line: {
            tension: 0,
            fill: 'start',
            backgroundColor: 'transparent',
          },
        },
        scales: {
          x: {
            grid: { color: '#FFFFFF22' },
            ticks: { color: 'white' },
          },
          y: {
            grid: { display: false },
            ticks: { color: 'white' },
          },
        },
      }}
      className="h-full w-full"
    />
  );
};

export default LineChart;
