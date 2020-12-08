import express from 'express';
import { authUser, getUserprofile, registerUser, updateUserprofile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserprofile).put(protect, updateUserprofile);

export default router;
