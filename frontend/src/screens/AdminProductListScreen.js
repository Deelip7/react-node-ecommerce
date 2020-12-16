import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Message, Popup, Table } from 'semantic-ui-react';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';

const AdminProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      {loading && <Loader />}
      {error && <Message error list={error} />}
      {products && (
        <Table compact celled style={{ maxWidth: '80%', margin: '5rem auto 0' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Num In Stock</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products &&
              products.map((product) => (
                <Table.Row key={product._id}>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>{product.price}</Table.Cell>
                  <Table.Cell>{product.numInStock}</Table.Cell>
                  <Table.Cell>{product.rating}</Table.Cell>
                  <Table.Cell collapsing>
                    {/* <Button animated basic to={`/admin/user/${user._id}`} as={Link}> */}
                    <Button animated basic as={Link}>
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
                      content={<Button color='green' content='Confirm Deletion' />}
                      on='click'
                      position='top right'
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default AdminProductListScreen;
