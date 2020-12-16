import express from 'express';
import { getProducts, getProductById, updateProductById, deleteProductById } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProductById).put(protect, admin, updateProductById).delete(protect, admin, deleteProductById);

export default router;
