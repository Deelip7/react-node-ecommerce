import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateTokens.js';

// @desc Auth user and get Token
// @route GET /api/users/login
// @acess Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //user authentication
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // User authorization
    });
  } else {
    res.status(401); //401 - Unauthorized
    throw new Error('Unauthorized : Access is denied due to invalid credentials');
  }
});

// @desc GET user Profile
// @route GET /api/users/profile
// @acess Private
const getUserprofile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

export { authUser, getUserprofile };
