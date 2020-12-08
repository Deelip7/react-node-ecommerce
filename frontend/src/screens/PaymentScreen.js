import React from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Checkbox, Button } from 'semantic-ui-react';
import OrderSteps from '../components/OrderSteps';

const PaymentScreen = ({ history }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    history.push('/placeorder');
  };

  return (
    <>
      <OrderSteps step={'billing'} />
      <FormContainer>
        <h1>Selected Payment Method</h1>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Field>Payment Method</Form.Field>
          <Form.Field>
            <Checkbox defaultChecked radio label='PayPal or Credit Card' name='checkboxRadioGroup' value='paypal' />
          </Form.Field>
          <Button color='black' type='submit' style={{ width: '100%', marginTop: '2rem' }}>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
