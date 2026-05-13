import { Router } from 'express';
import { body, param } from 'express-validator';
import { addFavorite, clearHistory, getFavorites, getHistory, removeFavorite } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.use(protect);

router
  .route('/favorites')
  .get(getFavorites)
  .post(
    [
      body('name').trim().isLength({ min: 2 }).withMessage('City name is required'),
      body('country').optional().trim(),
      body('lat').optional().isFloat({ min: -90, max: 90 }),
      body('lon').optional().isFloat({ min: -180, max: 180 })
    ],
    validate,
    addFavorite
  );

router.delete('/favorites/:id', [param('id').isMongoId().withMessage('Invalid favorite id')], validate, removeFavorite);
router.route('/history').get(getHistory).delete(clearHistory);

export default router;
