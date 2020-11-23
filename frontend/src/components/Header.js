import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const Header = () => {
  return (
    <header>
      <div className='nav'>
        <div className='nav__logo'>
          <img src='/images/logo.svg' alt='' />
        </div>
        <div className='nav__search'>
          <button type='submit'>
            <img src='/images/search.svg' alt='' />
          </button>
          <input type='text' placeholder='Search'></input>
        </div>

        <div className='nav__cart'>
          <img src='/images/cart.svg' alt='' />
        </div>
        <div className='nav__dropdown'>
          <Dropdown pointing='top right' icon={<img src='/images/user.svg' alt='' class='ui avatar image' />}>
            <Dropdown.Menu style={{ boxShadow: 'none', padding: '10px 5px' }}>
              <Dropdown.Item icon='user outline' text='Profile' style={{ backgroundColor: '#ffffff' }} />
              <Dropdown.Item icon='sign-out alternate' text='Sign Out' style={{ backgroundColor: '#ffffff' }} />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
