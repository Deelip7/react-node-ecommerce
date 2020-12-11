import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Create orders
// @route POST /api/orders
// @acess Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, paymentMethod, taxPrice, shippingCost, orderTotal, itemsPrice, shippingAddress } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items. Add something to cart. ');
  } else {
    const order = new Order({
      orderItems,
      paymentMethod,
      taxPrice,
      shippingCost,
      orderTotal,
      itemsPrice,
      shippingAddress,
      user: req.user._id,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Get orders by id
// @route GET /api/orders/:id
// @acess Private
const getOrderbyId = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error('Order not found');
  }
});

export { createOrder, getOrderbyId };
