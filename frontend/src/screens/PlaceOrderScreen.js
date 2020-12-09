import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Divider, Icon, List, Table } from 'semantic-ui-react';
import { addToCart } from '../actions/cartActions';
import CartEmpty from '../components/CartEmpty';
import OrderItems from '../components/OrderItems';
import OrderSteps from '../components/OrderSteps';

const PlaceOrderScreen = () => {
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { address, city, postalCode, country } = shippingAddress;

  const subTotal = cartItems
    .map((e) => e.price * e.qty)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  const shippingCost = subTotal > 130 ? 0 : 15;
  const tax = ((subTotal / 100) * 2).toFixed(2);
  const orderTotal = (+subTotal + +tax + +shippingCost).toFixed(2);

  const checkoutHandler = (e) => {
    console.log(e);
  };

  return (
    <>
      <OrderSteps step={'confirm'} />

      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className='order-container'>
          <div className='order-details'>
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
            <h2>Order Summary</h2>

            <div className='order-summary__amount'>
              <Table basic='very' unstackable>
                <Table.Row>
                  <Table.Cell>Items:</Table.Cell>
                  <Table.Cell textAlign='right'>${subTotal}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Shipping & handling:</Table.Cell>
                  <Table.Cell textAlign='right'> ${shippingCost}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Tax:</Table.Cell>
                  <Table.Cell textAlign='right'> ${tax}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Order total:</Table.Cell>
                  <Table.Cell textAlign='right'>${orderTotal}</Table.Cell>
                </Table.Row>
              </Table>
            </div>

            <Button className='order-summary__button' color='black' type='button' onClick={checkoutHandler}>
              Place order
            </Button>
            <Divider horizontal>
              <p>OR</p>
            </Divider>

            <Link to='/'>
              <Button className='order-summary__button' basic type='button'>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrderScreen;
