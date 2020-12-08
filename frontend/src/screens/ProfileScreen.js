import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Modal, Image, Label, Divider, Icon, Header, Message } from 'semantic-ui-react';
import { getUserDetails } from '../actions/userActions';
import Loader from '../components/Loader';
import ProfileEdit from '../components/ProfileEdit';

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, user, error: userError } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      }
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <>
      {userLoading && <Loader />}
      {userError && <Message error list={[error]} />}
      <div className='profile-Container'>
        <div className='user'>
          <div className='profile'>
            <h1 className='profile__name'>{user.name}</h1>
            <div className='profile__email'>{user.email}</div>
            <div className='profile__edit'>
              <Modal
                closeIcon
                trigger={
                  <Button animated basic>
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
          <div className='order'>
            <div>
              <h1>Orders</h1>
              <p>2 Items</p>
            </div>
            <Divider horizontal>
              <Header as='h4' floated='right'>
                <Label as='a' tag>
                  $10.00
                </Label>
              </Header>
            </Divider>
            <div className='order__details'>
              <h2>Order# 123123213213</h2>
              <Link to='/'>
                View Order <Icon className='arrow right' color='green' />
              </Link>
            </div>
            <div className='order__shipping'>
              <span>
                <Label circular color='green' empty key='green' />
                Order placed on March 26, 2020
              </span>
              <span>
                <Label circular color='grey' empty key='gray' /> Preparing for shipment
              </span>
            </div>
            <div className='order__image'>
              <Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
