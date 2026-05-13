import { User } from '../models/User.js';
import { signToken } from '../services/tokenService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  favoriteCities: user.favoriteCities,
  searchHistory: user.searchHistory
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email is already registered');
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, email, password });
  const token = signToken(user._id);
  successResponse(res, { user: sanitizeUser(user), token }, 'Registration successful', 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = signToken(user._id);
  successResponse(res, { user: sanitizeUser(user), token }, 'Login successful');
});

export const me = asyncHandler(async (req, res) => {
  successResponse(res, { user: sanitizeUser(req.user) }, 'Profile loaded');
});
