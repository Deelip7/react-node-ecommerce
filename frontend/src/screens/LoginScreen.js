import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form } from 'semantic-ui-react';

const LoginScreen = () => {
  const style = {
    margin: '5rem auto 4rem',
    maxWidth: '350px',
  };
  return (
    <>
      <Container>
        <Form style={style}>
          <Form.Input size='large' icon='user' iconPosition='left' label='Email Address' placeholder='Email Address' style={{ textWeight: 'normal' }} />
          <Form.Input size='large' icon='lock' iconPosition='left' label='Password' type='password' placeholder='Password' />
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
