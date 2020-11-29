import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Message } from 'semantic-ui-react';
import { addToCart } from '../actions/cartActions';
import CartItems from '../components/CartItems';

const CartScreen = ({ match, location, history }) => {
  const queryString = location.search.split('=')[1];
  const productId = match.params.id;

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const subTotal = cartItems.map((e) => e.price * e.qty).reduce((acc, curr) => acc + curr, 0);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, queryString));
      history.push('/cart');
    }
  }, [location, match]);

  return (
    <div className='cart-container'>
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
      {cartItems.length === 0 ? (
        <Message style={{ margin: '0 auto', width: '50%' }} warning header='Cart Is Empty' list={['Add Item to Cart']}></Message>
      ) : (
        <>
          <div>
            {cartItems.map((e) => (
              <CartItems key={e.product} items={e} />
            ))}
          </div>
          <div className='cart-subtotal'>
            <h4>SubTotal</h4>
            <div>{subTotal}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
