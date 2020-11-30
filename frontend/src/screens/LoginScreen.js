import React from 'react';
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
        <Divider horizontal>New Customer?</Divider>
      </Container>
      <Container textAlign='center'>
        <div style={style}>
          <Button type='submit' style={{ width: '100%' }}>
            Register
          </Button>
        </div>
      </Container>
    </>
  );
};

export default LoginScreen;
