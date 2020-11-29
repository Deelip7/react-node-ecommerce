import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const CartScreen = ({ match, location }) => {
  const queryString = location.search.split('=')[1];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addToCart(match.params.id, queryString));
  }, [location, match]);

  return <div></div>;
};

export default CartScreen;
