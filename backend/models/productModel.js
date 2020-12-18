import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    review: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReview: {
      type: Number,
      required: true,
      default: 0,
    },
    numInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
