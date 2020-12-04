import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form, Message } from 'semantic-ui-react';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';

const LoginScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(
    (e) => {
      if (userInfo) {
        history.push(redirect);
      }
    },
    [userInfo, history, redirect]
  );

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Container>
        {loading && <Loader />}
        {error && <Message style={{ margin: '0 auto', width: '350px' }} error list={[error]} />}
        <Form style={{ margin: '5rem auto 4rem', maxWidth: '350px' }} onSubmit={(e) => loginHandler(e)}>
          <Form.Input size='large' icon='user' iconPosition='left' label='Email Address' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} required />
          <Form.Input size='large' icon='lock' iconPosition='left' label='Password' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
          <Button color='black' type='submit' style={{ width: '100%' }}>
            Submit
          </Button>
        </Form>
        <Divider horizontal>
          <p style={{ fontWeight: '100', fontSize: '18px', textAlign: 'center' }}>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>REGISTER </Link>
          </p>
        </Divider>
      </Container>
    </>
  );
};

export default LoginScreen;
