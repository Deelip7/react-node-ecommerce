import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc Fetch all products
// @route GET /api/products
// @acess Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const selectedPage = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const productCount = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (selectedPage - 1));

  res.json({ products, selectedPage, totalPages: Math.ceil(productCount / pageSize) });
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
// @acess Private/Admin
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
// @acess Private/Admin
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

// @desc Create a product
// @route POST /api/products/:id
// @acess Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: 'Sample name',
    image: '/Images/Sample.png',
    detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ducimus quisquam unde nam eos ut dolorem animi accusamus sed consequatur.',
    price: 0,
    numInStock: 0,
    rating: 0,
    numReview: 0,
  });

  if (product) {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  }
});

// @desc Create new review
// @route POST /api/products/:id/reviews
// @acess Private/
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.review.find((review) => review.user.toString() === req.user._id.toString());
    console.log(alreadyReviewed);

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You have already reviewed this product');
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating,
      comment,
    };

    product.review.push(review);
    product.numReview = product.review.length;
    product.rating = product.review.reduce((acc, curr) => acc + curr.rating, 0) / product.numReview;

    await product.save();

    res.status(201).json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, updateProductById, deleteProductById, createProduct, createProductReview };
