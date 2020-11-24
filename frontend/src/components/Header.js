import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => {
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

        <div className='nav__cart'>
          <Link to='/cart'>
            <img src='/images/icons/cart.svg' alt='' />
          </Link>
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
      </div>
    </header>
  );
};

export default Header;
