import { Router } from 'express';
import { query } from 'express-validator';
import { currentWeather, forecastWeather } from '../controllers/weatherController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const locationValidation = [
  query('city').optional().trim().isLength({ min: 2 }).withMessage('City must be at least 2 characters'),
  query('lat').optional().isFloat({ min: -90, max: 90 }).withMessage('Latitude must be valid'),
  query('lon').optional().isFloat({ min: -180, max: 180 }).withMessage('Longitude must be valid'),
  query().custom((_, { req }) => {
    if (req.query.city || (req.query.lat && req.query.lon)) return true;
    throw new Error('Provide a city or latitude/longitude');
  })
];

router.get('/current', protect, locationValidation, validate, currentWeather);
router.get('/forecast', protect, locationValidation, validate, forecastWeather);

export default router;
