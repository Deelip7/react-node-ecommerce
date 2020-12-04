import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Label, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = ({ location }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cartItemsNum = String(cartItems.reduce((a, { qty }) => a + qty, 0));

  const trigger = (
    <span>
      <img src='/images/icons/user.svg' alt='' className='ui avatar image' />
    </span>
  );

  const logoutHandler = (e, { value }) => {
    if (value === 'logout') {
      dispatch(logout());
    }
  };

  const options = userInfo
    ? [
        {
          key: 'user',
          text: (
            <span>
              Signed in as <strong>{userInfo.name.split(' ')[1] || userInfo.name}</strong>
            </span>
          ),
          disabled: true,
        },
        { key: 'profile', text: 'Your Profile', to: '/profile', as: Link, selected: false },
        { key: 'stars', text: 'Your Stars', to: '/profile', as: Link },
        { key: 'sign-out', text: 'Sign Out', value: 'logout' },
      ]
    : [
        { key: 'sign-in', text: 'Sign In', to: '/login', as: Link, disabled: false, selected: false },
        { key: 'register', text: 'Register', to: '/register', as: Link, disabled: false },
      ];

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

        <div className='nav__dropdown'>
          <Dropdown trigger={trigger} options={options} direction='left' icon='' onChange={logoutHandler} />
        </div>
      </div>
    </header>
  );
};

export default Header;
