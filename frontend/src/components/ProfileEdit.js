import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Form, Message } from 'semantic-ui-react';
import { userLogin } from '../actions/userActions';
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
  const { loading, user, error } = userDetails;

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('password does not match');
    } else {
    }
  };

  return (
    <>
      <FormContainer>
        {error && <Message error list={[error]} />}
        {message && <Message error list={[message]} />}
        <h1>Edit your account details</h1>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Input size='large' icon='user' iconPosition='left' label='Name' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
          <Form.Input size='large' icon='at' iconPosition='left' label='Email Address' type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} value={email} />
          <Form.Input size='large' icon='lock' iconPosition='left' label='Password' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          <Form.Input size='large' icon='lock' iconPosition='left' label='Confirm Password' type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button color='black' type='submit' style={{ width: '100%' }}>
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProfileEdit;
