import axios from 'axios';
import * as actions from '../constants/adminConstants';
import { USER_DETAILS_SUCCESS, USER_DETAILS_RESET } from '../constants/userConstants';
import { PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_RESET } from '../constants/productConstants';

export const adminUsersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ADMIN_LIST_USERS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/`, config);

    dispatch({
      type: actions.ADMIN_LIST_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.ADMIN_LIST_USERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const adminUserUpdate = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actions.ADMIN_UPDATE_USER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: actions.ADMIN_UPDATE_USER_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_DETAILS_RESET,
    });
  } catch (error) {
    dispatch({
      type: actions.ADMIN_UPDATE_USER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const adminUserDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ADMIN_DELETE_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: actions.ADMIN_DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.ADMIN_DELETE_USER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const adminProductUpdate = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actions.ADMIN_UPDATE_PRODUCT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/products/${product._id}`, product, config);

    dispatch({
      type: actions.ADMIN_UPDATE_PRODUCT_SUCCESS,
    });

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });

    dispatch({
      type: PRODUCT_DETAILS_RESET,
    });
  } catch (error) {
    dispatch({
      type: actions.ADMIN_UPDATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const adminProductDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ADMIN_DELETE_PRODUCT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: actions.ADMIN_DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.ADMIN_DELETE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const adminProductCreate = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ADMIN_CREATE_PRODUCT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/`, {}, config);

    dispatch({
      type: actions.ADMIN_CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.ADMIN_CREATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const adminOrdersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ADMIN_LIST_ORDERS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/`, config);

    dispatch({
      type: actions.ADMIN_LIST_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.ADMIN_LIST_ORDERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateOrderToDelivered = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actions.ADMIN_UPDATE_ORDER_TO_DELIVERED_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/orders/${orderId}/delivered`, {}, config);

    dispatch({
      type: actions.ADMIN_UPDATE_ORDER_TO_DELIVERED_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actions.ADMIN_UPDATE_ORDER_TO_DELIVERED_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
