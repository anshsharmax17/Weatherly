import { CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const WeatherChart = ({ forecast }) => {
  if (!forecast?.length) return null;
  const data = {
    labels: forecast.map((day) => new Date(day.date).toLocaleDateString('en', { weekday: 'short' })),
    datasets: [{ label: 'Temperature °C', data: forecast.map((day) => day.temperature), borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.18)', fill: true, tension: 0.42 }]
  };

  return (
    <section className="glass rounded-[2rem] p-6">
      <h3 className="mb-4 text-2xl font-extrabold text-slate-950 dark:text-white">5-day temperature trend</h3>
      <Line data={data} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(148,163,184,.18)' } }, x: { grid: { display: false } } } }} />
    </section>
  );
};

export default WeatherChart;
