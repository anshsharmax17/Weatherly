import { useEffect } from 'react';
import toast from 'react-hot-toast';
import ForecastCard from '../components/ForecastCard';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherChart from '../components/WeatherChart';
import { useWeather } from '../context/WeatherContext';

const Dashboard = () => {
  const { current, forecast, history, loading, error, loadWeather, addFavorite, loadHistory } = useWeather();

  useEffect(() => {
    loadWeather({ city: 'New York' });
    loadHistory().catch(() => null);
  }, []);

  const geoSearch = () => {
    if (!navigator.geolocation) return toast.error('Geolocation is not supported in this browser');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => loadWeather({ lat: coords.latitude, lon: coords.longitude }),
      () => toast.error('Unable to access your location')
    );
  };

  return (
    <main className="mx-auto w-[min(1120px,calc(100%-24px))] space-y-8 py-10">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-500">Weather command center</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white md:text-6xl">Dashboard</h1>
      </section>
      <SearchBar onSearch={(city) => loadWeather({ city })} onGeoSearch={geoSearch} isLoading={loading} />
      {loading && <Loader />}
      {error && <div className="rounded-3xl border border-rose-300 bg-rose-100 p-4 font-semibold text-rose-700">{error}</div>}
      {!loading && <WeatherCard weather={current} onFavorite={(weather) => addFavorite({ name: weather.city, country: weather.country, lat: weather.coordinates?.lat, lon: weather.coordinates?.lon })} />}
      <section className="grid gap-4 md:grid-cols-5">{forecast.map((day) => <ForecastCard day={day} key={day.date} />)}</section>
      <WeatherChart forecast={forecast} />
      <section className="glass rounded-[2rem] p-6">
        <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">Recently searched</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {history.map((item) => <button key={item._id} onClick={() => loadWeather({ city: item.city })} className="rounded-2xl bg-white/70 px-4 py-2 font-semibold text-slate-700 dark:bg-white/10 dark:text-white">{item.city} · {item.temperature}°</button>)}
          {!history.length && <p className="text-slate-500 dark:text-slate-300">Searches will appear here.</p>}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
