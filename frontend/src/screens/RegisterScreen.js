import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form, Message } from 'semantic-ui-react';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';

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
  console.log(redirect);
  console.log(location);

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
      setMessage('password does not match');
    }
  };

  return (
    <Container>
      {loading && <Loader />}
      {message && <Message style={{ margin: '0 auto', width: '350px' }} error list={[message]} />}
      {error && <Message style={{ margin: '0 auto', width: '350px' }} error list={[error]} />}
      <Form style={{ margin: '5rem auto 4rem', maxWidth: '350px' }} onSubmit={(e) => submitHandler(e)}>
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
        <Button color='black' type='submit' style={{ width: '100%' }}>
          Submit
        </Button>
      </Form>
      <Divider horizontal>
        <p style={{ fontWeight: '100', fontSize: '18px', textAlign: 'center' }}>
          Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Sign in </Link>
        </p>
      </Divider>
    </Container>
  );
};

export default RegisterScreen;
