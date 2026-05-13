import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

export const getFavorites = asyncHandler(async (req, res) => {
  successResponse(res, req.user.favoriteCities, 'Favorites loaded');
});

export const addFavorite = asyncHandler(async (req, res) => {
  const { name, country, lat, lon } = req.body;
  const exists = req.user.favoriteCities.some((city) => city.name.toLowerCase() === name.toLowerCase());
  if (!exists) req.user.favoriteCities.push({ name, country, lat, lon });
  await req.user.save();
  successResponse(res, req.user.favoriteCities, 'Favorite saved', 201);
});

export const removeFavorite = asyncHandler(async (req, res) => {
  req.user.favoriteCities = req.user.favoriteCities.filter((city) => city._id.toString() !== req.params.id);
  await req.user.save();
  successResponse(res, req.user.favoriteCities, 'Favorite removed');
});

export const getHistory = asyncHandler(async (req, res) => {
  successResponse(res, req.user.searchHistory, 'Search history loaded');
});

export const clearHistory = asyncHandler(async (req, res) => {
  req.user.searchHistory = [];
  await req.user.save();
  successResponse(res, [], 'Search history cleared');
});
