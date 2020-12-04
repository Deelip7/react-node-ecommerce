import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form, Message } from 'semantic-ui-react';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';

const RegisterScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const userLogin = useSelector((state) => state.userLogin);

  const redirect = '/';

  const { loading, userInfo, error } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <Container>
      {loading && <Loader />}
      {error && <Message style={{ margin: '0 auto', width: '350px' }} error list={[error]} />}
      <Form style={{ margin: '5rem auto 4rem', maxWidth: '350px' }} onSubmit={(e) => submitHandler(e)}>
        <Form.Input size='large' icon='user' iconPosition='left' label='Name' placeholder='Name' onChange={(e) => setName(e.target.value)} required />
        <Form.Input size='large' icon='user' iconPosition='left' label='Email Address' type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} required />
        <Form.Input size='large' icon='lock' iconPosition='left' label='Password' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
        <Button color='black' type='submit' style={{ width: '100%' }}>
          Submit
        </Button>
      </Form>
      <Divider horizontal>
        <p style={{ fontWeight: '100', fontSize: '18px', textAlign: 'center' }}>
          Already have an account? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Sign in </Link>
        </p>
      </Divider>
    </Container>
  );
};

export default RegisterScreen;
