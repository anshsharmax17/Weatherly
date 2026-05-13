import axios from 'axios';
import NodeCache from 'node-cache';
import { env } from '../config/env.js';

const cache = new NodeCache({ stdTTL: env.cacheTtlSeconds, checkperiod: 120 });

const normalizeCurrent = (payload) => ({
  city: payload.name,
  country: payload.sys?.country,
  coordinates: payload.coord,
  temperature: Math.round(payload.main.temp),
  feelsLike: Math.round(payload.main.feels_like),
  humidity: payload.main.humidity,
  windSpeed: payload.wind.speed,
  condition: payload.weather?.[0]?.main,
  description: payload.weather?.[0]?.description,
  icon: payload.weather?.[0]?.icon,
  sunrise: payload.sys?.sunrise,
  sunset: payload.sys?.sunset,
  fetchedAt: new Date().toISOString()
});

const normalizeForecast = (payload) => {
  const daily = payload.list.filter((_, index) => index % 8 === 0).slice(0, 5);
  return {
    city: payload.city.name,
    country: payload.city.country,
    forecast: daily.map((item) => ({
      date: item.dt_txt,
      temperature: Math.round(item.main.temp),
      min: Math.round(item.main.temp_min),
      max: Math.round(item.main.temp_max),
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      condition: item.weather?.[0]?.main,
      description: item.weather?.[0]?.description,
      icon: item.weather?.[0]?.icon
    }))
  };
};

const requestWeather = async (endpoint, params) => {
  if (!env.openWeatherApiKey) {
    const error = new Error('OPENWEATHER_API_KEY is not configured');
    error.statusCode = 503;
    throw error;
  }

  const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const { data } = await axios.get(`${env.openWeatherBaseUrl}/${endpoint}`, {
    params: { ...params, appid: env.openWeatherApiKey, units: 'metric' },
    timeout: 8000
  });

  const normalized = endpoint === 'weather' ? normalizeCurrent(data) : normalizeForecast(data);
  cache.set(cacheKey, normalized);
  return normalized;
};

export const getCurrentWeather = (query) => requestWeather('weather', query);
export const getForecastWeather = (query) => requestWeather('forecast', query);
