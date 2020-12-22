import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { productListReducer, productDetailsReducer, productReviewReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer } from './reducers/userReducers';
import {
  adminListUsersReducer,
  adminUpdateUserReducer,
  adminDeleteUserReducer,
  adminDeleteProductReducer,
  adminUpdateProductReducer,
  adminCreateProductReducer,
  adminListOrdersReducer,
  adminDeliveredOrderReducer,
} from './reducers/adminReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,

  adminListUsers: adminListUsersReducer,
  adminUpdateUser: adminUpdateUserReducer,
  adminDeleteUser: adminDeleteUserReducer,

  adminUpdateProduct: adminUpdateProductReducer,
  adminDeleteProduct: adminDeleteProductReducer,
  adminCreateProduct: adminCreateProductReducer,

  adminListOrders: adminListOrdersReducer,
  adminDeliveredOrder: adminDeliveredOrderReducer,

  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReview: productReviewReducer,
  cart: cartReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
