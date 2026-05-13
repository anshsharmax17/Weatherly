import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/weatherly',
  jwtSecret: process.env.JWT_SECRET || 'replace-this-development-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY || '',
  openWeatherBaseUrl: process.env.OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS || 600)
};
