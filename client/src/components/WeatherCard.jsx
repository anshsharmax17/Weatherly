import { Droplets, Heart, Sunrise, Sunset, ThermometerSun, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatTime, iconUrl } from '../utils/weather';

const Stat = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl bg-white/55 p-4 dark:bg-white/10">
    <Icon className="mb-3 text-sky-500" />
    <p className="text-sm text-slate-500 dark:text-slate-300">{label}</p>
    <p className="text-lg font-bold text-slate-900 dark:text-white">{value}</p>
  </div>
);

const WeatherCard = ({ weather, onFavorite }) => {
  if (!weather) return null;
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass overflow-hidden rounded-[2rem] p-6">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300">Current weather</p>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-950 dark:text-white md:text-6xl">{weather.city}, {weather.country}</h2>
          <p className="mt-3 capitalize text-slate-600 dark:text-slate-300">{weather.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <img className="h-28 w-28 drop-shadow-2xl" src={iconUrl(weather.icon)} alt={weather.condition} />
          <div>
            <p className="text-7xl font-black text-slate-950 dark:text-white">{weather.temperature}°</p>
            <p className="font-semibold text-slate-600 dark:text-slate-300">Feels like {weather.feelsLike}°C</p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat icon={Droplets} label="Humidity" value={`${weather.humidity}%`} />
        <Stat icon={Wind} label="Wind speed" value={`${weather.windSpeed} m/s`} />
        <Stat icon={ThermometerSun} label="Feels like" value={`${weather.feelsLike}°C`} />
        <Stat icon={Sunrise} label="Sunrise" value={formatTime(weather.sunrise)} />
        <Stat icon={Sunset} label="Sunset" value={formatTime(weather.sunset)} />
      </div>
      <button onClick={() => onFavorite(weather)} className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950">
        <Heart className="mr-2 inline" size={18} /> Save favorite
      </button>
    </motion.section>
  );
};

export default WeatherCard;
