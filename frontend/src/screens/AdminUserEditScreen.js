import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react';
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
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    console.log(e);
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
              <Checkbox label='Admin status' onChange={() => setIsAdmin(isAdmin ? false : true)} checked={isAdmin} />
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
