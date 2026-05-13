export const iconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

export const formatTime = (timestamp) =>
  timestamp ? new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date(timestamp * 1000)) : '--';

export const weatherBackground = (condition = '') => {
  const normalized = condition.toLowerCase();
  if (normalized.includes('rain') || normalized.includes('drizzle')) return 'from-slate-900 via-sky-900 to-indigo-950';
  if (normalized.includes('cloud')) return 'from-slate-700 via-slate-500 to-sky-700';
  if (normalized.includes('snow')) return 'from-sky-100 via-white to-indigo-200';
  if (normalized.includes('thunder')) return 'from-zinc-950 via-indigo-950 to-slate-900';
  return 'from-sky-300 via-cyan-200 to-indigo-300 dark:from-slate-950 dark:via-sky-950 dark:to-indigo-950';
};
