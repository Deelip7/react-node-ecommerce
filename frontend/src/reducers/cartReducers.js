import * as actions from '../constants/cartConstants';

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actions.CART_ADD_REQUEST:
      const item = action.payload;
      const existItem = state.cartItems.find((e) => e.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((e) => (e.product === existItem.product ? item : e)),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case actions.CART_REMOVE_REQUEST:
      return { loading: false, cartItems: action.payload };
    default:
      return state;
  }
};

export { cartReducer };
