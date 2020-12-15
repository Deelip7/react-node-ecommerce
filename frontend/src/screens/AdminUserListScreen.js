import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Loader, Message, Modal, Table } from 'semantic-ui-react';
import { deleteUserbyId, getUserList } from '../actions/userActions';
import AdminProfileEdit from '../components/AdminProfileEdit';
import { USER_LIST_RESET } from '../constants/userContants';

const AdminUserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      dispatch({ type: USER_LIST_RESET });
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const deleteUserHandler = (e, { value }) => {
    dispatch(deleteUserbyId(value));
    dispatch(getUserList());
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
                      <Modal
                        defaultOpen={false}
                        closeIcon
                        trigger={
                          <Button animated basic>
                            <Button.Content hidden>Edit</Button.Content>
                            <Button.Content visible>
                              <Icon name='edit outline' />
                            </Button.Content>
                          </Button>
                        }
                        content={<AdminProfileEdit userId={user._id} />}
                        actions={[{ key: 'save', content: 'Save', positive: true }]}
                      />
                      {/* <Button icon='user delete' onClick={deleteUserHandler} value={user._id}></Button> */}
                      <Button animated basic color='red' onClick={deleteUserHandler} value={user._id}>
                        <Button.Content hidden>Delete</Button.Content>
                        <Button.Content visible>
                          <Icon name='user delete' />
                        </Button.Content>
                      </Button>
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
