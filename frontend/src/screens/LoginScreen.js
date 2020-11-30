import React from 'react';
import { Button, Container, Form } from 'semantic-ui-react';

const LoginScreen = () => {
  const style = {
    margin: '5rem auto',
    maxWidth: '350px',
  };
  return (
    <Container>
      <Form style={style}>
        <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username' />
        <Form.Input icon='lock' iconPosition='left' label='Password' type='password' />
        <Button color='black' type='submit' style={{ width: '100%' }}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginScreen;
