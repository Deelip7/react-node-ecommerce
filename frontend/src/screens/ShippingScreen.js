import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { saveShippingAddress } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import OrderSteps from '../components/OrderSteps';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    history.push('/payment');
  };

  return (
    <>
      <OrderSteps step={'address'} />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Input size='large' label='Address' type='text' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} required />
          <Form.Input size='large' label='City' type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} required />
          <Form.Input size='large' label='Postal Code' type='text' placeholder='Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
          <Form.Input size='large' label='Country' type='text' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} required />
          <Button color='black' type='submit' style={{ width: '100%' }}>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
