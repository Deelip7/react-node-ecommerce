import axios from 'axios';
import * as actions from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: actions.CART_ADD_REQUEST,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      numInStock: data.numInStock,
      qty: Number(qty),
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actions.CART_REMOVE_REQUEST,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (address) => (dispatch, getState) => {
  dispatch({
    type: actions.SHIPPING_ADDRESS_SAVE_REQUEST,
    payload: address,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.shippingAddress));
};

export const savePaymentMethod = (paymentMethod) => (dispatch, getState) => {
  dispatch({
    type: actions.PAYMENT_METHOD_SAVE_REQUEST,
    payload: paymentMethod,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.shippingAddress));
};
