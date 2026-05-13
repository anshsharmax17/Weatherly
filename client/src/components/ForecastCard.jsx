import { iconUrl } from '../utils/weather';

const ForecastCard = ({ day }) => (
  <div className="glass rounded-3xl p-5 text-center transition hover:-translate-y-1 hover:shadow-glow">
    <p className="font-bold text-slate-800 dark:text-white">{new Date(day.date).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
    <img className="mx-auto h-20 w-20" src={iconUrl(day.icon)} alt={day.condition} />
    <p className="text-3xl font-black text-slate-950 dark:text-white">{day.temperature}°</p>
    <p className="capitalize text-sm text-slate-500 dark:text-slate-300">{day.description}</p>
    <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">💧 {day.humidity}% · 💨 {day.windSpeed} m/s</p>
  </div>
);

export default ForecastCard;
