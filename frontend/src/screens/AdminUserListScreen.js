import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Message, Popup, Table } from 'semantic-ui-react';
import { adminUserDelete, adminUsersList } from '../actions/adminActions';
import { ADMIN_UPDATE_USER_RESET } from '../constants/adminConstants';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const AdminUserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const adminListUsers = useSelector((state) => state.adminListUsers);
  const { loading, users, error } = adminListUsers;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminDeleteUser = useSelector((state) => state.adminDeleteUser);
  const { success } = adminDeleteUser;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(adminUsersList());
    } else {
      dispatch({ type: ADMIN_UPDATE_USER_RESET });
      history.push('/login');
    }
  }, [dispatch, history, userInfo, success]);

  const deleteUserHandler = (e, { value }) => {
    dispatch(adminUserDelete(value));
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Message error list={error} />}
      {users && (
        <Table compact celled style={{ maxWidth: '80%', margin: '5rem auto 0' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Registration Date</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>Admin User</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.length !== 0
              ? users.map((user) => (
                  <Table.Row key={user._id}>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.createdAt.split('T')[0]}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.isAdmin ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell collapsing>
                      <Button animated basic to={`/admin/user/${user._id}`} as={Link}>
                        <Button.Content hidden>Edit</Button.Content>
                        <Button.Content visible>
                          <Icon name='edit outline' />
                        </Button.Content>
                      </Button>
                      <Popup
                        hideOnScroll
                        trigger={
                          <Button animated basic color='red'>
                            <Button.Content hidden>Delete</Button.Content>
                            <Button.Content visible>
                              <Icon name='user delete' />
                            </Button.Content>
                          </Button>
                        }
                        content={<Button color='green' content='Confirm Deletion' onClick={deleteUserHandler} value={user._id} />}
                        on='click'
                        position='top right'
                      />
                    </Table.Cell>
                  </Table.Row>
                ))
              : null}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default AdminUserListScreen;
