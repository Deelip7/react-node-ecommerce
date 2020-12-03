import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';

const CartEmpty = () => {
  const style = {
    width: '50vw',
    maxWidth: '250px',
    margin: '50px auto 0',
  };

  return (
    <div>
      <Container textAlign='center'>
        <div style={style}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='.3'
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
        </div>
        <h1>Your cart is empty</h1>
        <p>You have no items added in your cart.</p>
        <Link to='/'>
          <Button basic color='black' type='button' style={{ marginTop: '50px' }} size='massive'>
            Continue shopping
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default CartEmpty;
