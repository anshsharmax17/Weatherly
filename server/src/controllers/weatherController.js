import { getCurrentWeather, getForecastWeather } from '../services/weatherService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

const buildWeatherQuery = (req) => {
  const { city, lat, lon } = req.query;
  if (city) return { q: city };
  return { lat, lon };
};

export const currentWeather = asyncHandler(async (req, res) => {
  const weather = await getCurrentWeather(buildWeatherQuery(req));

  if (req.user && weather.city) {
    req.user.searchHistory = [
      { city: weather.city, country: weather.country, condition: weather.condition, temperature: weather.temperature },
      ...req.user.searchHistory.filter((item) => item.city.toLowerCase() !== weather.city.toLowerCase())
    ].slice(0, 10);
    await req.user.save();
  }

  successResponse(res, weather, 'Current weather loaded');
});

export const forecastWeather = asyncHandler(async (req, res) => {
  const forecast = await getForecastWeather(buildWeatherQuery(req));
  successResponse(res, forecast, 'Forecast loaded');
});
