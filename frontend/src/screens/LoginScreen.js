import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form } from 'semantic-ui-react';
import { login } from '../actions/userActions';

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    history.push('/profile');
  };

  return (
    <>
      <Container>
        <Form style={{ margin: '5rem auto 4rem', maxWidth: '350px' }} onSubmit={(e) => loginHandler(e)}>
          <Form.Input size='large' icon='user' iconPosition='left' label='Email Address' placeholder='Email Address' style={{ textWeight: 'normal' }} onChange={(e) => setEmail(e.target.value)} />
          <Form.Input size='large' icon='lock' iconPosition='left' label='Password' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          <Button color='black' type='submit' style={{ width: '100%' }}>
            Submit
          </Button>
        </Form>
        <Divider horizontal>
          <Link to='/'>
            <p style={{ fontWeight: '100', fontSize: '18px', textAlign: 'center' }}>New Customer? REGISTER</p>
          </Link>
        </Divider>
      </Container>
    </>
  );
};

export default LoginScreen;
