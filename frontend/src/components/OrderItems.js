import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Select, Button, Popup } from 'semantic-ui-react';
import { Divider } from 'semantic-ui-react';
import { addToCart, removeFromCart } from '../actions/cartActions';

const OrderItems = ({ items }) => {
  const dispatch = useDispatch();
  const getQty = (e, { value }) => {
    dispatch(addToCart(items.product, Number(value)));
  };

  const removeFromCartHandler = (e) => {
    dispatch(removeFromCart(e));
  };

  return (
    <>
      <div className='order-item'>
        <div className='order-item__image'>
          <Link to={`/product/${items.product}`}>
            <img src={items.image} alt='' />
          </Link>
        </div>
        <div className='order-item__info'>
          <div>{items.name}</div>
          <div>
            {items.qty} x ${items.price}
          </div>
        </div>
      </div>
      <Divider style={{ margin: '.5rem 0', width: '90%' }} />
    </>
  );
};

export default OrderItems;
