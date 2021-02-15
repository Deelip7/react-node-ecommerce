import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Form } from 'semantic-ui-react';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterScreen = ({ history, location }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (error) {
      notify(error);
    }
  }, [userInfo, history, redirect, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      notify('Password does not match');
    }
  };

  const notify = (msg) => {
    toast.error(`❕ ${msg}`, {
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
      <Meta title={'Register'} />
      <ToastContainer />
      <FormContainer>
        <h1>Create your account</h1>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Input size='large' icon='user' iconPosition='left' label='Name' placeholder='Name' onChange={(e) => setName(e.target.value)} required />
          <Form.Input size='large' icon='at' iconPosition='left' label='Email Address' type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} required />
          <Form.Input size='large' icon='lock' iconPosition='left' label='Password' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
          <Form.Input
            size='large'
            icon='lock'
            iconPosition='left'
            label='Confirm Password'
            type='password'
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button color='black' type='submit' style={{ width: '100%' }} loading={loading}>
            Submit
          </Button>
        </Form>
        <Divider horizontal>
          <p>Already have an account?</p>
        </Divider>
        <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
          <Button basic>SIGN IN</Button>
        </Link>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
