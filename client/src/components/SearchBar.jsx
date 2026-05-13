import { LocateFixed, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const SearchBar = ({ onSearch, onGeoSearch, isLoading }) => {
  const [city, setCity] = useState('');
  const debouncedCity = useDebounce(city, 700);

  useEffect(() => {
    if (debouncedCity.trim().length > 2) onSearch(debouncedCity.trim());
  }, [debouncedCity]);

  const submit = (event) => {
    event.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  return (
    <form onSubmit={submit} className="glass flex flex-col gap-3 rounded-3xl p-3 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input className="input pl-12" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Search city e.g. London, Tokyo, New York" />
      </div>
      <button className="btn-primary" disabled={isLoading}>Search</button>
      <button type="button" onClick={onGeoSearch} className="rounded-2xl border border-white/40 px-5 py-3 font-semibold text-slate-800 transition hover:bg-white/70 dark:text-white dark:hover:bg-white/10">
        <LocateFixed className="inline" size={18} /> Near me
      </button>
    </form>
  );
};

export default SearchBar;
