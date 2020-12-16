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
    <>
      <img src='/images/icons/user.svg' alt='' className='ui avatar image' />
    </>
  );

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className='nav-header'>
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
                <Label color='orange' circular floating className='cart-lable'>
                  {cartItemsNum}
                </Label>
              ) : (
                false
              )}
            </Menu.Item>
          </Menu>
        </div>
        <div className='nav__dropdown'>
          <Menu>
            <Dropdown trigger={trigger} direction='left' icon='' onChange={logoutHandler}>
              {userInfo && userInfo.isAdmin ? (
                <Dropdown.Menu>
                  <Dropdown.Header>
                    Signed in as <strong>{userInfo.name.split(' ')[1] || userInfo.name}</strong>
                  </Dropdown.Header>
                  <Dropdown.Item as={Link} to='/profile'>
                    Your Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to='/profile'>
                    Your Stars
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Admin Settings</Dropdown.Header>
                  <Dropdown.Item as={Link} to='/admin/userlist'>
                    User List
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to='/admin/productlist'>
                    Product List
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logoutHandler}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              ) : userInfo ? (
                <Dropdown.Menu>
                  <Dropdown.Header>
                    Signed in as <strong>{userInfo.name.split(' ')[1] || userInfo.name}</strong>
                  </Dropdown.Header>
                  <Dropdown.Item as={Link} to='/profile'>
                    Your Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to='/profile'>
                    Your Stars
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logoutHandler}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              ) : (
                <Dropdown.Menu>
                  <Dropdown.Header>Welcome to Rn Store</Dropdown.Header>
                  <Dropdown.Item as={Link} to='/login'>
                    Sign In
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to='/register'>
                    Register
                  </Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
