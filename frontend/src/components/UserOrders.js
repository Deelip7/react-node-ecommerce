import React from 'react';
import { Image, Label, Icon, Divider, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserOrders = ({ order, loading }) => {
  return (
    <>
      {loading && <Loader />}
      <div className='order'>
        <div className='order__details'>
          <h2>{`Order #: ${order._id}`}</h2>
          <Link to={`/orders/${order._id}`}>
            View Order <Icon className='arrow right' color='green' />
          </Link>
        </div>
        <div className='order__shipping'>
          {order.paidAt ? (
            <span>
              <Label circular color='green' empty key='green' />
              {`Order placed on ${order.paidAt.split('T')[0]}`}
            </span>
          ) : (
            <span>
              <Label circular color='orange' empty key='orange' />
              Payment not received
            </span>
          )}

          {order.isDelivered ? (
            <span>
              <Label circular color='green' empty key='green' />
              {`Delivered on ${order.deliveredAt.split('T')[0]}`}
            </span>
          ) : !order.paidAt ? (
            <span>
              <Label circular color='grey' empty key='grey' />
              Pending shipment
            </span>
          ) : (
            <span>
              <Label circular color='grey' empty key='grey' />
              Preparing for shipment
            </span>
          )}
        </div>
        <div className='order__image'>
          <Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
        </div>
      </div>
      <Divider />
    </>
  );
};

export default UserOrders;
