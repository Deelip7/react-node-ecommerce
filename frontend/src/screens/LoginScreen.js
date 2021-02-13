import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Form } from 'semantic-ui-react';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    if (error) {
      notify();
    }
  }, [userInfo, history, redirect, error]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const notify = () => {
    toast.error(`❕ ${error}`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <Meta title={'Login'} />
      <ToastContainer />
      <FormContainer>
        <h1>Log in to your account</h1>
        <Form onSubmit={(e) => loginHandler(e)}>
          <Form.Input size='large' icon='user' iconPosition='left' label='Email Address' type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} required />
          <Form.Input size='large' icon='lock' iconPosition='left' label='Password' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
          <Button color='black' type='submit' loading={loading}>
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
