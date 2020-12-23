import React from 'react';
import { Container, Grid, Icon } from 'semantic-ui-react';

const Footer = () => {
  const style = {
    padding: '10rem 0 5rem',
    fontSize: '1.1rem',
  };

  return (
    <>
      <Container style={style}>
        <Grid>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <h4>HELP & INFORMATION</h4>
            <p>Your Order</p>
            <p>Home</p>
            <p>FAQs</p>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <h4>COMPANY</h4>
            <p>About Us</p>
            <p>Careers</p>
            <p>Blog</p>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <h4>SUPPORT</h4>
            <p>Email Support</p>
            <p>Help center</p>
            <p>Features</p>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <h4>FOLLOW US</h4>
            <Icon name='twitter' size='large' color='black' inverted />
            <Icon name='github' size='large' color='black' inverted />
            <Icon name='instagram' size='large' color='black' inverted />
            <Icon name='facebook' size='large' color='black' inverted />
          </Grid.Column>
        </Grid>
      </Container>
      <footer>
        <div className='footer__copyright'>
          &copy; 2020 <strong>Rn Store</strong>. All rights reserved.
        </div>
        <div className='footer__links'>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
