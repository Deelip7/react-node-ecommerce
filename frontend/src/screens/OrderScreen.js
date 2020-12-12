import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Icon, Message, Table } from 'semantic-ui-react';
import OrderItems from '../components/OrderItems';
import { getOrderDetails } from '../actions/orderActions';
import Page404 from '../components/Page404';
import Loader from '../components/Loader';

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!order || order._id !== match.params.id) {
      dispatch(getOrderDetails(match.params.id));
    }
  }, [dispatch, match, userInfo, history, order]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Page404 />
  ) : (
    <div className='order-container'>
      <div className='order-details'>
        <h2>
          Thank you. <br />
          Your order has been placed
        </h2>
        <h4>Order Information</h4>
        <div>{`Order #: ${order._id}`}</div>
        <div>{`Order placed on : ${order.createdAt}`}</div>
        <h4>Shipping Information</h4>
        <div>{order.user.name}</div>
        <div>{`${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}</div>
        <div>
          Shipping status:
          {order.isDelivered ? (
            <Message success style={style}>
              Paid
            </Message>
          ) : (
            <Message style={style} error>
              Not Delivered
            </Message>
          )}
        </div>

        <h4>Payment Information</h4>
        <div>
          Payment method: <Icon className='paypal card' size='large' />
          {order.paymentMethod}
        </div>
        <div>
          Payment status:{' '}
          {order.isPaid ? (
            <Message success style={style}>
              Paid
            </Message>
          ) : (
            <Message style={style} error>
              Not Paid
            </Message>
          )}
        </div>

        <Divider style={{ borderTop: '1px solid rgba(91, 14, 22, 0.1)' }} />

        <h2>Order Items</h2>
        {order.orderItems.map((e) => (
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
                <Table.Cell textAlign='right'>${order.itemsPrice}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Shipping & handling:</Table.Cell>
                <Table.Cell textAlign='right'> ${order.shippingCost}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Tax:</Table.Cell>
                <Table.Cell textAlign='right'> ${order.taxPrice}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total:</Table.Cell>
                <Table.Cell textAlign='right'>${order.orderTotal}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

const style = {
  textAlign: 'center',
  padding: '7px',
  marginTop: '5px',
};
export default OrderScreen;

// <>
// {loading && <Loader />}
// {error && <Page404 />}
// {order && (
//   <div className='order-container'>
//     <div className='order-details'>
//       <h2>
//         Thank you. <br />
//         Your order has been placed
//       </h2>
//       <h4>Order Information</h4>
//       <div>{`Order #: ${order._id}`}</div>
//       <div>{`Order placed on : ${order.createdAt}`}</div>

//       <h4>Shipping Information</h4>
//       <div>{userInfo.name}</div>
//       <div>{`${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}</div>
//       <div>
//         Shipping status:
//         {order.isDelivered ? (
//           <Message success style={style}>
//             Paid
//           </Message>
//         ) : (
//           <Message style={style} error>
//             Not Delivered
//           </Message>
//         )}
//       </div>

//       <h4>Payment Information</h4>
//       <div>
//         Payment method: <Icon className='paypal card' size='large' />
//         {order.paymentMethod}
//       </div>
//       <div>
//         Payment status:{' '}
//         {order.isPaid ? (
//           <Message success style={style}>
//             Paid
//           </Message>
//         ) : (
//           <Message style={style} error>
//             Not Paid
//           </Message>
//         )}
//       </div>

//       <Divider style={{ borderTop: '1px solid rgba(91, 14, 22, 0.1)' }} />

//       <h2>Order Items</h2>
//       {order.orderItems.map((e) => (
//         <OrderItems key={e.product} items={e} />
//       ))}
//     </div>
//     <div className='order-summary'>
//       <h2>Order Summary</h2>
//       <div className='order-summary__amount'>
//         <Table basic='very' unstackable>
//           <Table.Body>
//             <Table.Row>
//               <Table.Cell>Items:</Table.Cell>
//               <Table.Cell textAlign='right'>${order.itemsPrice}</Table.Cell>
//             </Table.Row>
//             <Table.Row>
//               <Table.Cell>Shipping & handling:</Table.Cell>
//               <Table.Cell textAlign='right'> ${order.shippingCost}</Table.Cell>
//             </Table.Row>
//             <Table.Row>
//               <Table.Cell>Tax:</Table.Cell>
//               <Table.Cell textAlign='right'> ${order.taxPrice}</Table.Cell>
//             </Table.Row>
//             <Table.Row>
//               <Table.Cell>Total:</Table.Cell>
//               <Table.Cell textAlign='right'>${order.orderTotal}</Table.Cell>
//             </Table.Row>
//           </Table.Body>
//         </Table>
//       </div>
//     </div>
//   </div>
// )}
// </>
