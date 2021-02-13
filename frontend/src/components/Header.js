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
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='#656565' className='ui avatar image'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
      </svg>
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
            <svg height='68' viewBox='0 0 68 68' fill='none' xmlns='http://www.w3.org/2000/svg' width='4em'>
              <path
                d='M10.6065 43.487C10.3136 43.7799 10.3136 44.2548 10.6065 44.5477L14.3188 48.26C14.6117 48.5529 15.0866 48.5529 15.3795 48.26L29.1681 34.4714C29.461 34.1785 29.461 33.7036 29.1681 33.4107L19.6221 23.8648C19.3292 23.5719 18.8544 23.5719 18.5615 23.8648L14.8492 27.5771C14.5563 27.87 14.5563 28.3449 14.8492 28.6378L19.6221 33.4107C19.915 33.7036 19.915 34.1785 19.6221 34.4714L10.6065 43.487Z'
                fill='#656565'
              />
              <path
                d='M43.4873 57.2757C43.7802 57.5686 44.2551 57.5686 44.548 57.2757L48.2603 53.5634C48.5532 53.2705 48.5532 52.7956 48.2603 52.5027L34.4717 38.7142C34.1788 38.4213 33.704 38.4213 33.4111 38.7142L23.8651 48.2601C23.5722 48.553 23.5722 49.0279 23.8651 49.3208L27.5774 53.0331C27.8703 53.326 28.3452 53.326 28.6381 53.0331L33.4111 48.2601C33.704 47.9672 34.1788 47.9672 34.4717 48.2601L43.4873 57.2757Z'
                fill='#717171'
              />
              <path
                d='M57.2758 24.3951C57.5687 24.1022 57.5687 23.6273 57.2758 23.3344L53.5635 19.6221C53.2706 19.3292 52.7958 19.3292 52.5029 19.6221L38.7143 33.4107C38.4214 33.7036 38.4214 34.1785 38.7143 34.4714L48.2602 44.0173C48.5531 44.3102 49.028 44.3102 49.3209 44.0173L53.0332 40.305C53.3261 40.0121 53.3261 39.5372 53.0332 39.2443L48.2602 34.4714C47.9673 34.1785 47.9673 33.7036 48.2602 33.4107L57.2758 24.3951Z'
                fill='#7e7e7e'
              />
              <path
                d='M24.3959 10.6066C24.103 10.3137 23.6282 10.3137 23.3353 10.6066L19.6229 14.3189C19.3301 14.6118 19.3301 15.0867 19.6229 15.3796L33.4115 29.1682C33.7044 29.4611 34.1793 29.4611 34.4722 29.1682L44.0181 19.6222C44.311 19.3294 44.311 18.8545 44.0181 18.5616L40.3058 14.8493C40.0129 14.5564 39.5381 14.5564 39.2452 14.8493L34.4722 19.6222C34.1793 19.9151 33.7044 19.9151 33.4115 19.6222L24.3959 10.6066Z'
                fill='#a4a4a4'
              />
            </svg>
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
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='#656565' width='2.19em'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
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
