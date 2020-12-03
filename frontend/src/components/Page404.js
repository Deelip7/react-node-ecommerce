import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';

const Page404 = () => {
  const style = {
    width: '50vw',
    maxWidth: '250px',
    margin: '90px auto 0',
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
              d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
            />
          </svg>
        </div>
        <h1>Page not found</h1>
        <p>We're sorry, we couldn't find the page you requested.</p>
        <Link to='/'>
          <Button basic color='black' type='button' style={{ marginTop: '50px' }} size='massive'>
            Back to home
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Page404;
