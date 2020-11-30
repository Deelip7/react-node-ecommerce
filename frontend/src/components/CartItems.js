import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Select, Button, Popup } from 'semantic-ui-react';
import { Divider } from 'semantic-ui-react';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartItems = ({ items }) => {
  const dispatch = useDispatch();
  const getQty = (e, { value }) => {
    dispatch(addToCart(items.product, Number(value)));
  };

  const removeFromCartHandler = (e) => {
    dispatch(removeFromCart(e));
  };

  return (
    <>
      <div className='cart'>
        <div className='cart-image'>
          <Link to={`/product/${items.product}`}>
            <img src={items.image} alt='' />
          </Link>
        </div>
        <div className='cart-items'>
          <div className='cart-items__name'>{items.name}</div>
          <div className='cart-items__price'>
            {items.qty} x ${items.price}
          </div>

          <Form className='cart-items__form'>
            <Form.Field onChange={getQty} control={Select} options={[...Array(items.numInStock).keys()].map((p) => ({ text: `${p + 1}`, value: `${p + 1}` }))} defaultValue={String(items.qty)} />
            <Popup
              content='Remove From Cart'
              style={{ boxShadow: 'none', borderRadius: '0' }}
              trigger={<Button icon='remove' size='small' basic type='button' disabled={items.numInStock === 0} className='cart-items__remove' onClick={() => removeFromCartHandler(items.product)} />}
            />
          </Form>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default CartItems;
