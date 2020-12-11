import * as actions from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: {} }, action) => {
  switch (action.type) {
    case actions.CART_ADD_REQUEST:
      const item = action.payload;
      const existItem = state.cartItems.find((e) => e.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.product === existItem.product ? item : x)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case actions.CART_REMOVE_REQUEST:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case actions.SHIPPING_ADDRESS_SAVE_REQUEST:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case actions.PAYMENT_METHOD_SAVE_REQUEST:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case actions.CART_RESET:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
