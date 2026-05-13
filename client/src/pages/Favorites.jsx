import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../context/WeatherContext';

const Favorites = () => {
  const { favorites, loadFavorites, removeFavorite, loadWeather } = useWeather();
  const navigate = useNavigate();

  useEffect(() => { loadFavorites().catch(() => null); }, []);

  const openCity = async (city) => {
    await loadWeather({ city: city.name });
    navigate('/dashboard');
  };

  return (
    <main className="mx-auto w-[min(1120px,calc(100%-24px))] py-10">
      <h1 className="text-5xl font-black text-slate-950 dark:text-white">Favorite cities</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {favorites.map((city) => (
          <article key={city._id} className="glass rounded-3xl p-6">
            <p className="text-2xl font-extrabold text-slate-950 dark:text-white">{city.name}</p>
            <p className="text-slate-500 dark:text-slate-300">{city.country || 'Saved city'}</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => openCity(city)} className="btn-primary flex-1">View weather</button>
              <button onClick={() => removeFavorite(city._id)} className="rounded-2xl bg-rose-500 px-4 text-white"><Trash2 size={18} /></button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Favorites;
