import React from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Label, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const cartItemsNum = String(cartItems.reduce((a, { qty }) => a + qty, 0));

  return (
    <header>
      <div className='nav'>
        <div className='nav__logo'>
          <Link to='/'>
            <img src='/images/icons/logo.svg' alt='' />
          </Link>
        </div>

        <div className='nav__search'>
          <button type='submit'>
            <img src='/images/icons/search.svg' alt='' />
          </button>
          <input type='text' placeholder='Search'></input>
        </div>

        <div className='nav__dropdown'>
          <Dropdown pointing='top right' icon={<img src='/images/icons/user.svg' alt='' className='ui avatar image' />}>
            <Dropdown.Menu style={{ boxShadow: 'none', padding: '15px', borderRadius: '0' }}>
              <Link to='/profile'>
                <Dropdown.Item icon={<img src='/images/icons/profile.svg' alt='' className='ui avatar image' />} text='Profile' style={{ backgroundColor: '#ffffff' }} />
              </Link>
              <Link to='/login'>
                <Dropdown.Item icon={<img src='/images/icons/logout.svg' alt='' className='ui avatar image' />} text='Login' style={{ backgroundColor: '#ffffff' }} />
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className='nav__cart'>
          <Menu compact>
            <Menu.Item>
              <Link to='/cart'>
                <img src='/images/icons/cart.svg' alt='' />
              </Link>
              {cartItemsNum !== '0' ? (
                <Label color='orange' circular floating>
                  {cartItemsNum}
                </Label>
              ) : (
                false
              )}
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
