import { createContext, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const WeatherContext = createContext(null);

export const WeatherProvider = ({ children }) => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadWeather = async (params) => {
    setLoading(true);
    setError('');
    try {
      const [currentRes, forecastRes] = await Promise.all([
        api.get('/weather/current', { params }),
        api.get('/weather/forecast', { params })
      ]);
      setCurrent(currentRes.data.data);
      setForecast(forecastRes.data.data.forecast);
      await loadHistory();
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to load weather right now';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    const { data } = await api.get('/user/favorites');
    setFavorites(data.data);
  };

  const addFavorite = async (city) => {
    const { data } = await api.post('/user/favorites', city);
    setFavorites(data.data);
    toast.success('City saved to favorites');
  };

  const removeFavorite = async (id) => {
    const { data } = await api.delete(`/user/favorites/${id}`);
    setFavorites(data.data);
    toast.success('Favorite removed');
  };

  const loadHistory = async () => {
    const { data } = await api.get('/user/history');
    setHistory(data.data);
  };

  const value = useMemo(
    () => ({ current, forecast, favorites, history, loading, error, loadWeather, loadFavorites, addFavorite, removeFavorite, loadHistory }),
    [current, forecast, favorites, history, loading, error]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeather = () => useContext(WeatherContext);
