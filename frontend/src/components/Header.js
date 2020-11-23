import React from 'react';

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
          <img src='/images/user.svg' alt='' />
        </div>
      </div>
    </header>
  );
};

export default Header;
