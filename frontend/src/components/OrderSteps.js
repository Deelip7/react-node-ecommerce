import React from 'react';
import { Icon, Step } from 'semantic-ui-react';

const OrderSteps = ({ step }) => {
  return (
    <div className='order-steps'>
      <Step.Group size='small'>
        <Step active={step === 'address' ? true : false} disabled={step !== 'address' ? true : false}>
          <Icon name='address book outline' />
          <Step.Content>
            <Step.Title>Shipping</Step.Title>
            <Step.Description>Choose your shipping address</Step.Description>
          </Step.Content>
        </Step>

        <Step active={step === 'billing' ? true : false} disabled={step !== 'billing' ? true : false}>
          <Icon name='payment' />
          <Step.Content>
            <Step.Title>Billing</Step.Title>
            <Step.Description>Enter billing information</Step.Description>
          </Step.Content>
        </Step>

        <Step active={step === 'confirm' ? true : false} disabled={step !== 'confirm' ? true : false}>
          <Icon name='info' />
          <Step.Content>
            <Step.Title>Confirm Order</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    </div>
  );
};

export default OrderSteps;
