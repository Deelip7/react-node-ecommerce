import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button } from 'semantic-ui-react';
import { addToCart } from '../actions/cartActions';
import CartEmpty from '../components/CartEmpty';
import CartItems from '../components/CartItems';
import Meta from '../components/Meta';

const CartScreen = ({ match, location, history }) => {
  const queryString = location.search.split('=')[1];
  const productId = match.params.id;

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const subTotal = cartItems
    .map((e) => e.price * e.qty)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, queryString));
    }
  }, [location, match, dispatch, productId, queryString]);

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <>
      <Meta title='Cart' />
      <div className='cart-container'>
        {cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <>
            <header>
              <Breadcrumb>
                <Breadcrumb.Section as={Link} to='/'>
                  Home
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section>Cart</Breadcrumb.Section>
              </Breadcrumb>
              <h1>Your Cart</h1>
            </header>
            <div>
              {cartItems.map((e) => (
                <CartItems key={e.product} items={e} />
              ))}
            </div>
            <div className='cart-subtotal'>
              <h4>
                SubTotal: <span style={{ fontWeight: 'normal', float: 'right' }}>${subTotal}</span>
              </h4>
              <Button color='black' type='button' onClick={checkoutHandler}>
                Proceed to checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
