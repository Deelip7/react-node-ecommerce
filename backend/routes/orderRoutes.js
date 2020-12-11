import express from 'express';
import { createOrder, getOrderbyId } from '../controllers/orderControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/:id').get(protect, getOrderbyId);

export default router;
