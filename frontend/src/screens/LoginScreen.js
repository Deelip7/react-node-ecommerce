import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Form, Message } from 'semantic-ui-react';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {loading && <Loader />}
      <FormContainer>
        {error && <Message error list={[error]} />}
        <h1>Log in to your account</h1>
        <Form onSubmit={(e) => loginHandler(e)}>
          <Form.Input size='large' icon='user' iconPosition='left' label='Email Address' type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} required />
          <Form.Input size='large' icon='lock' iconPosition='left' label='Password' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
          <Button color='black' type='submit'>
            Submit
          </Button>
        </Form>
        <Divider horizontal>
          <p>New Customer?</p>
        </Divider>
        <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
          <Button basic>REGISTER</Button>
        </Link>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
