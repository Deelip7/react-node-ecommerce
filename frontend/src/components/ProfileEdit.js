import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react';
import { updateUserDetails } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const ProfileEdit = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error: errorUser } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password does not match');
    } else {
      dispatch(updateUserDetails({ id: user._id, name, email, password }));
    }
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message error content={error} />}
      <FormContainer>
        {message && <Message error content={message} />}
        {success && <Message success content={'Your profile was successfully updated'} />}
        <h1>Edit your account details</h1>
        {errorUser ? (
          <Message error content={errorUser} />
        ) : (
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Input size='large' icon='user' iconPosition='left' label='Name' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
            <Form.Input size='large' icon='at' iconPosition='left' label='Email Address' type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} value={email} />
            <Form.Input size='large' icon='lock' iconPosition='left' label='Password' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <Form.Input size='large' icon='lock' iconPosition='left' label='Confirm Password' type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
            <Button color='black' type='submit' style={{ width: '100%' }}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProfileEdit;
