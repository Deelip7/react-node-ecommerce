import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Divider, Icon, Message } from 'semantic-ui-react';
import { getUserOrderList } from '../actions/orderActions';
import { getUserDetails } from '../actions/userActions';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import ProfileEdit from '../components/ProfileEdit';
import UserOrders from '../components/UserOrders';
import { ORDER_LIST_RESET } from '../constants/orderConstants';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, user, error: userError } = userDetails;

  const orderList = useSelector((state) => state.orderList);
  const { loading: orderLoading, orders, error: orderError } = orderList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name) {
        dispatch({ type: USER_UPDATE_RESET });
        dispatch(getUserDetails('profile'));
      } else if (orderList) {
        dispatch({ type: ORDER_LIST_RESET });
        dispatch(getUserOrderList());
      }
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <>
      <Meta title='Profile' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : userInfo ? (
        <div className='profile-Container'>
          {userLoading && <Loader />}
          {userError && <Message error list={[userError]} />}
          {orderError && <Message error list={[orderError]} />}
          <div className='user'>
            <div className='profile'>
              <h1 className='profile__name'>{userInfo.name}</h1>
              <div className='profile__email'>{userInfo.email}</div>
              <div className='profile__edit'>
                <Modal
                  defaultOpen={false}
                  closeIcon
                  trigger={
                    <Button animated basic color='black'>
                      <Button.Content hidden>Edit</Button.Content>
                      <Button.Content visible>
                        <Icon name='edit outline' />
                      </Button.Content>
                    </Button>
                  }
                  content={<ProfileEdit />}
                  actions={[{ key: 'save', content: 'Save', positive: true }]}
                />
              </div>
            </div>
            <div className='order-Container'>
              <div>
                <h1>Orders</h1>
                <p>{orders ? (orders.length > 1 ? `${orders.length} orders` : `${orders.length} order`) : null}</p>
                <Divider />
                {orders && orders.map((order) => <UserOrders order={order} key={order._id} loading={orderLoading} />)}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProfileScreen;
