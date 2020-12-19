import express from 'express';
import { getProducts, getProductById, updateProductById, deleteProductById, createProduct, createProductReview } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, updateProductById).delete(protect, admin, deleteProductById);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
