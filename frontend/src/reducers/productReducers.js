import * as actions from '../constants/productConstants';

const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actions.PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case actions.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        selectedPage: action.payload.selectedPage,
        totalPages: action.payload.totalPages,
      };
    case actions.PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const productDetailsReducer = (state = { product: { review: [] } }, action) => {
  switch (action.type) {
    case actions.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case actions.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case actions.PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actions.PRODUCT_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.PRODUCT_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case actions.PRODUCT_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actions.PRODUCT_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actions.PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export { productListReducer, productDetailsReducer, productReviewReducer };
