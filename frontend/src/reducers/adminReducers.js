import * as actions from '../constants/adminConstants';

export const adminListUsersReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case actions.ADMIN_LIST_USERS_REQUEST:
      return {
        loading: true,
      };
    case actions.ADMIN_LIST_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case actions.ADMIN_LIST_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actions.ADMIN_LIST_USERS_RESET:
      return {};
    default:
      return state;
  }
};

export const adminUpdateUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actions.ADMIN_UPDATE_USER_REQUEST:
      return {
        loading: true,
      };
    case actions.ADMIN_UPDATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actions.ADMIN_UPDATE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actions.ADMIN_UPDATE_USER_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const adminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADMIN_DELETE_USER_REQUEST:
      return {
        loading: true,
      };
    case actions.ADMIN_DELETE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actions.ADMIN_DELETE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const adminDeleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADMIN_DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case actions.ADMIN_DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actions.ADMIN_DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const adminCreateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADMIN_CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case actions.ADMIN_CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case actions.ADMIN_CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actions.ADMIN_CREATE_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

export const adminUpdateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actions.ADMIN_UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case actions.ADMIN_UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actions.ADMIN_UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actions.ADMIN_UPDATE_PRODUCT_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const adminListOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case actions.ADMIN_LIST_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case actions.ADMIN_LIST_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case actions.ADMIN_LIST_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actions.ADMIN_LIST_ORDERS_RESET:
      return {};
    default:
      return state;
  }
};

export const adminDeliveredOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADMIN_UPDATE_ORDER_TO_DELIVERED_REQUEST:
      return {
        loading: true,
      };
    case actions.ADMIN_UPDATE_ORDER_TO_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actions.ADMIN_UPDATE_ORDER_TO_DELIVERED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actions.ADMIN_UPDATE_ORDER_TO_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};
