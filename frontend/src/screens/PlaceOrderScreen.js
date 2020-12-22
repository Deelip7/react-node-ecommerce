import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Icon, Message, Table } from 'semantic-ui-react';
import { createOrder } from '../actions/orderActions';
import CartEmpty from '../components/CartEmpty';
import OrderItems from '../components/OrderItems';
import OrderSteps from '../components/OrderSteps';
import { CART_RESET } from '../constants/cartConstants';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { cartItems, shippingAddress, paymentMethod } = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const priceFormat = (price) => {
    return (Math.round(price * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = priceFormat(cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0));
  cart.shippingCost = priceFormat(cart.itemsPrice > 130 ? 0 : 15);
  cart.tax = priceFormat((cart.itemsPrice / 100) * 2);
  cart.orderTotal = (Number(cart.itemsPrice) + Number(cart.tax) + Number(cart.shippingCost)).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const checkoutHandler = (e) => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingCost: cart.shippingCost,
        taxPrice: cart.tax,
        orderTotal: cart.orderTotal,
      })
    );
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!paymentMethod) {
      history.push('/payment');
    }

    if (success) {
      history.push(`/orders/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch({ type: CART_RESET });
      localStorage.removeItem('cartItems');
    }
  }, [success, history, dispatch, order, userInfo, paymentMethod]);

  return (
    <>
      <OrderSteps step={'confirm'} />

      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className='order-container'>
          <div className='order-details'>
            <h2>Shipping address</h2>
            <div>{`${shippingAddress.address}, ${shippingAddress.city} ${shippingAddress.postalCode}, ${shippingAddress.country}`}</div>
            <Divider style={{ borderTop: '1px solid rgba(91, 14, 22, 0.1)' }} />
            <h2>Payment Method</h2>
            <div>
              <Icon className='paypal card' size='large' />
              {paymentMethod}
            </div>
            <Divider style={{ borderTop: '1px solid rgba(91, 14, 22, 0.1)' }} />

            <h2>Order Items</h2>
            {cartItems.map((e) => (
              <OrderItems key={e.product} items={e} />
            ))}
          </div>
          <div className='order-summary'>
            <h2>Order Summary</h2>

            <div className='order-summary__amount'>
              <Table basic='very' unstackable>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Items:</Table.Cell>
                    <Table.Cell textAlign='right'>${cart.itemsPrice}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Shipping & handling:</Table.Cell>
                    <Table.Cell textAlign='right'> ${cart.shippingCost}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Tax:</Table.Cell>
                    <Table.Cell textAlign='right'> ${cart.tax}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Total:</Table.Cell>
                    <Table.Cell textAlign='right'>${cart.orderTotal}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>

            <Button className='order-summary__button' color='black' type='button' onClick={checkoutHandler}>
              Place order
            </Button>
            <Divider horizontal>
              <p>OR</p>
            </Divider>
            {error && <Message error list={[error]} />}

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
