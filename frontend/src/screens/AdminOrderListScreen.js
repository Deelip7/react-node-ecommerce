import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Message, Popup, Table } from 'semantic-ui-react';
import { adminOrdersList } from '../actions/adminActions';
import { ADMIN_UPDATE_USER_RESET } from '../constants/adminConstants';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { updateOrderToDelivered } from '../actions/orderActions';

const AdminOrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const adminListOrders = useSelector((state) => state.adminListOrders);
  const { loading, orders, error } = adminListOrders;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(adminOrdersList());
    } else {
      dispatch({ type: ADMIN_UPDATE_USER_RESET });
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const updateOrderHandler = (e, { value }) => {
    dispatch(updateOrderToDelivered(value));
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Message error list={error} />}
      {orders && (
        <Table compact celled style={{ maxWidth: '80%', margin: '5rem auto 0' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order #</Table.HeaderCell>
              <Table.HeaderCell>Order Date</Table.HeaderCell>
              <Table.HeaderCell>Order Total</Table.HeaderCell>
              <Table.HeaderCell>Paid</Table.HeaderCell>
              <Table.HeaderCell>Delivered</Table.HeaderCell>
              <Table.HeaderCell>Ship Order</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders.length !== 0
              ? orders.map((order) => (
                  <Table.Row key={order._id}>
                    <Table.Cell>{order._id}</Table.Cell>
                    <Table.Cell>{order.createdAt.split('T')[0]}</Table.Cell>
                    <Table.Cell>${order.orderTotal}</Table.Cell>
                    <Table.Cell>{order.isPaid ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{order.isDelivered ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>
                      <Button animated basic to={`/orders/${order._id}`} as={Link}>
                        <Button.Content hidden>Details</Button.Content>
                        <Button.Content visible>
                          <Icon name='info' />
                        </Button.Content>
                      </Button>
                      <Popup
                        hideOnScroll
                        trigger={
                          <Button animated basic color='red'>
                            <Button.Content hidden>Ship</Button.Content>
                            <Button.Content visible>
                              <Icon name='shipping fast' />
                            </Button.Content>
                          </Button>
                        }
                        content={<Button color='green' content='Confirm Deletion' onClick={updateOrderHandler} value={order._id} />}
                        on='click'
                        position='top right'
                      />
                    </Table.Cell>
                  </Table.Row>
                ))
              : null}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default AdminOrderListScreen;
