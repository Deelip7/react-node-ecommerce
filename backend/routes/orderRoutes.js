import express from 'express';
import { createOrder, getOrderbyId, updateOrderToPaid, getUserOrders, getAllOrders, updateOrderToDelivered } from '../controllers/orderControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderbyId);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/delivered').put(protect, admin, updateOrderToDelivered);

export default router;
