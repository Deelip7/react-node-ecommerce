import React from 'react';

const Header = () => {
  return (
    <header>
      <div className='nav'>
        <div className='nav__logo'>
          <img src='/images/logo.svg' alt='' />
        </div>
        <div className='nav__search'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='#a9a9a9'>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
          <input type='text' placeholder='Search'></input>
        </div>
        <div className='nav__cart'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='#656565'>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
          </svg>
        </div>
        <div className='nav__dropdown'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='#656565'>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
