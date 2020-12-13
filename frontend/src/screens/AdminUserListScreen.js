import React from 'react';
import { Button, Table } from 'semantic-ui-react';

const AdminUserListScreen = () => {
  return (
    <div>
      <Table compact celled style={{ maxWidth: '70%', margin: '5rem auto 0' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Admin User</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>No</Table.Cell>
            <Table.Cell collapsing>
              <Button size='large' basic color='standard' icon='edit outline' />
              <Button size='large' basic color='red' icon='user delete' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jamie Harington</Table.Cell>
            <Table.Cell>January 11, 2014</Table.Cell>
            <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
            <Table.Cell>
              <Button size='large' basic color='standard' icon='edit outline' />
              <Button size='large' basic color='red' icon='user delete' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jill Lewis</Table.Cell>
            <Table.Cell>May 11, 2014</Table.Cell>
            <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
            <Table.Cell>
              <Button size='large' basic color='standard' icon='edit outline' />
              <Button size='large' basic color='red' icon='user delete' />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default AdminUserListScreen;
