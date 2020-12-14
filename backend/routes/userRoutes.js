import express from 'express';
import { authUser, getUserprofile, registerUser, updateUserprofile, getUsers, deleteUser, updateUserbyAdmin } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserprofile).put(protect, updateUserprofile).delete(protect, admin, deleteUser);
router.route('/:id').delete(protect, admin, deleteUser).put(protect, admin, updateUserbyAdmin);

export default router;
