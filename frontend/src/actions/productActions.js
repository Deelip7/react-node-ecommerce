import axios from 'axios';
import * as actions from '../constants/productConstants';

const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: actions.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: actions.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

const Productreview = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.PRODUCT_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${id}/reviews`, review, config);

    dispatch({
      type: actions.PRODUCT_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_REVIEW_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export { listProducts, listProductDetails, Productreview };
