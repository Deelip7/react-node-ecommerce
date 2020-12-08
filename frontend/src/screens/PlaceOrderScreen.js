import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Divider, Icon } from 'semantic-ui-react';
import { addToCart } from '../actions/cartActions';
import CartEmpty from '../components/CartEmpty';
import OrderItems from '../components/OrderItems';

const PlaceOrderScreen = () => {
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { address, city, postalCode, country } = shippingAddress;

  const subTotal = cartItems
    .map((e) => e.price * e.qty)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  const checkoutHandler = (e) => {
    console.log(e);
  };

  return (
    <div>
      <div className='order-container'>
        {cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <>
            <div className='order-details'>
              <header>
                {/* <Breadcrumb>
                <Breadcrumb.Section as={Link} to='/'>
                  Home
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section>Place Order</Breadcrumb.Section>
              </Breadcrumb> */}
                <h1>Place Order</h1>
              </header>
              <h2>Shipping address</h2>
              <div>{`${address}, ${city} ${postalCode}, ${country}`}</div>
              <Divider />
              <h2>Payment Method</h2>
              <div>
                <Icon className='paypal card' size='large' />
                {`PayPal`}
              </div>
              <Divider />

              <h2>Order Items</h2>
              {cartItems.map((e) => (
                <OrderItems key={e.product} items={e} />
              ))}
            </div>
            <div className='order-summary'>
              <div>{`Items: $1239`}</div>
              <div>{`Shipping: $12`}</div>
              <div>{`Tax: $22`}</div>
              <div>
                <h4>
                  SubTotal: <span style={{ fontWeight: 'normal', float: 'right' }}>${subTotal}</span>
                </h4>
                <Button color='black' type='button' onClick={checkoutHandler}>
                  Proceed to checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
