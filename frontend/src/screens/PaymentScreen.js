import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Radio } from 'semantic-ui-react';
import FormContainer from '../components/FormContainer';
import OrderSteps from '../components/OrderSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <OrderSteps step={'billing'} />
      <FormContainer>
        <h1>Selected Payment Method</h1>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Field control={Radio} label='PayPal or Credit Card' checked={paymentMethod === 'PayPal'} value='PayPal' onClick={() => setPaymentMethod('PayPal')} />
          <Form.Field control={Radio} label='Apple Pay ' checked={paymentMethod === 'applePay'} value='applePay' onClick={() => setPaymentMethod('applePay')} disabled />
          <Form.Field control={Radio} label='Amazon Pay ' checked={paymentMethod === 'amazonPay'} value='amazonPay' onClick={() => setPaymentMethod('amazonPay')} disabled />
          <Button color='black' type='submit' style={{ width: '100%', marginTop: '2rem' }}>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
