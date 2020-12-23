import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Form, Input, Label, Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading } = productList;

  const cartItemsNum = String(cartItems.reduce((a, { qty }) => a + qty, 0));

  const trigger = (
    <>
      <img src='/images/icons/user.svg' alt='' className='ui avatar image' />
    </>
  );

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (e.target.classList.contains('nav__search')) {
      e.target[0].value = '';
    }

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
    setKeyword('');
  };

  return (
    <div className='nav-header'>
      <div className='nav'>
        <div className='nav__logo'>
          <Link to='/'>
            <img src='/images/icons/logo.svg' alt='' />
          </Link>
        </div>

        <Form className='nav__search' onSubmit={submitHandler}>
          <Form.Field>
            <Input id='nav__input' icon={<Button icon='search' basic type='submit' loading={loading} />} placeholder='Search...' onChange={(e) => setKeyword(e.target.value)} />
          </Form.Field>
        </Form>

        <div className='nav__cart'>
          <Menu compact>
            <Menu.Item>
              <Link to='/cart'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='#656565' width='2.19rem'>
                  <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                </svg>
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
                  <Dropdown.Item as={Link} to='/admin/orderlist'>
                    Order List
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

export default withRouter(Header);
