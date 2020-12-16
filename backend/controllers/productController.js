import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { json } from 'express';

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
});

// @desc Update a product
// @route PUT /api/products/:id
// @acess Private
const updateProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.image = req.body.image || product.image;
    product.price = req.body.price || product.price;
    product.numInStock = req.body.numInStock || product.numInStock;
    product.detail = req.body.detail || product.detail;

    const updatedProduct = await product.save();
    res.json({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      image: updatedProduct.image,
      price: updatedProduct.price,
      numInStock: updatedProduct.numInStock,
      detail: updatedProduct.detail,
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Delete a product
// @route Delete /api/products/:id
// @acess Private
const deleteProductById = asyncHandler(async (req, res) => {
  const productDeleted = await Product.findByIdAndDelete(req.params.id);

  if (productDeleted) {
    res.json({
      message: 'Product removed',
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc create a product
// @route Delete /api/products/:id
// @acess Private
const createProduct = asyncHandler(async (req, res) => {
  const product = req.body;
  console.log(product);

  if (product) {
    res.json({
      product,
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, updateProductById, deleteProductById, createProduct };
