import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc Fetch all products
// @route GET /api/products
// @acess Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc Fetch a product
// @route GET /api/products/:id
// @acess Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
    // 404 - not found
  }
  res.json(products);
});

export { getProducts, getProductById };
