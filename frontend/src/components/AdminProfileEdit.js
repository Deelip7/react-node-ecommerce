import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react';
import { getUserbyId, updateUserDetails } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { USER_BYID_RESET } from '../constants/userContants';

const AdminProfileEdit = ({ userId }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [message, setMessage] = useState('');

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const userDetailsById = useSelector((state) => state.userDetailsById);
  const { loading: userByIdLoading, userById, error: userByIdError } = userDetailsById;

  useEffect(() => {
    dispatch(getUserbyId(userId));
    if (userByIdLoading) {
      setName(userById.name);
      setEmail(userById.email);
      setIsAdmin(userById.isAdmin);
      console.log(userByIdLoading);
    }
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message error content={error} />}
      {userByIdLoading ? (
        <Loader />
      ) : (
        <FormContainer>
          {message && <Message error content={message} />}
          {success && <Message success content={'Your profile was successfully updated'} />}
          <h1>Edit your account details</h1>
          <Form onSubmit={(e) => submitHandler(e)} loading={userByIdLoading}>
            <Form.Input size='large' icon='user' iconPosition='left' label='Name' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
            <Form.Input size='large' icon='at' iconPosition='left' label='Email Address' type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} value={email} />
            <Form.Checkbox label='Admin status' onChange={(e) => setName(e.target.value)} />
            <Button color='black' type='submit' style={{ width: '100%' }}>
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default AdminProfileEdit;
