import express from 'express';
import { createOrder, getOrderbyId, updateOrderToPaid, getUserOrders } from '../controllers/orderControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderbyId);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
