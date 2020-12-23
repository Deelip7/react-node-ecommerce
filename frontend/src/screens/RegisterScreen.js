import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Form, Message } from 'semantic-ui-react';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const RegisterScreen = ({ history, location }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      setMessage('Password does not match');
    }
  };

  return (
    <>
      <Meta title={'Register'} />

      {error && <Message error list={[error]} />}
      <FormContainer>
        {message && <Message error list={[message]} />}
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
