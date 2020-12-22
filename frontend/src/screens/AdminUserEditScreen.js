import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Form, Icon, Label, Message, Popup } from 'semantic-ui-react';
import { getUserDetails } from '../actions/userActions';
import { adminUserUpdate } from '../actions/adminActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { ADMIN_UPDATE_USER_RESET } from '../constants/adminConstants';

const AdminUserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const adminUpdateUser = useSelector((state) => state.adminUpdateUser);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = adminUpdateUser;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_UPDATE_USER_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user) {
        history.push('/login');
      } else if (user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminUserUpdate({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit your account details</h1>
          <Form onSubmit={(e) => submitHandler(e)} loading={loading}>
            <Form.Input size='large' icon='user' iconPosition='left' label='Name' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
            <Form.Input size='large' icon='at' iconPosition='left' label='Email Address' type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} value={email} />
            <Form.Field>
              <label>
                Admin Status:
                {user.isAdmin ? (
                  <span style={{ marginLeft: '5px', fontWeight: '100', color: 'green' }}> Admin</span>
                ) : (
                  <span style={{ marginLeft: '5px', fontWeight: '100', color: 'orange' }}> Not An Admin</span>
                )}
              </label>

              <Popup
                hideOnScroll
                trigger={
                  <Label
                    as='a'
                    content={isAdmin ? 'Remove Admin Rights' : 'Make user an admin'}
                    icon={isAdmin ? 'remove user' : 'add user'}
                    bordered
                    size='large'
                    style={{ width: '100%', margin: '5px 0 10px' }}
                  />
                }
                content={<Checkbox slider label={isAdmin ? 'Remove' : 'Add'} onChange={() => setIsAdmin(isAdmin ? false : true)} checked={isAdmin} />}
                on='click'
                position='top right'
              />
            </Form.Field>

            <Button color='black' type='submit' style={{ width: '100%' }}>
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default AdminUserEditScreen;
