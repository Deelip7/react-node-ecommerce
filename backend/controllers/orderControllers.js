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
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error('Order not found');
  }
});

// @desc Update order to paid
// @route GET /api/orders/:id
// @acess Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(400);
    throw new Error('Order not found');
  }
});

// @desc Get user orders
// @route GET /api/orders/myorders
// @acess Private
const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const order = await Order.find({ user: userId });
  if (order) {
    res.json(order);
  } else {
    res.status(400);
    throw new Error('Order not found');
  }
});

// @desc Get  All Orders
// @route GET /api/orders/
// @acess Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({});
  if (order) {
    res.json(order);
  } else {
    res.status(400);
    throw new Error('Order not found');
  }
});

// @desc  Update order to delivered
// @route GET /api/orders/:is
// @acess Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrderToDelivered = await order.save();

    res.json(updatedOrderToDelivered);
  } else {
    res.status(400);
    throw new Error('Order not found');
  }
});

export { createOrder, getOrderbyId, updateOrderToPaid, getUserOrders, getAllOrders, updateOrderToDelivered };
