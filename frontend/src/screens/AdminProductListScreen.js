import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Message, Popup, Table } from 'semantic-ui-react';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { adminProductDelete } from '../actions/adminActions';
import { PRODUCT_LIST_RESET } from '../constants/productConstants';

const AdminProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminDeleteProduct = useSelector((state) => state.adminDeleteProduct);
  const { success } = adminDeleteProduct;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      dispatch({ type: PRODUCT_LIST_RESET });
      history.push('/login');
    }
  }, [dispatch, history, userInfo, success]);

  const deleteProductHandler = (e, { value }) => {
    dispatch(adminProductDelete(value));
  };

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
              <Table.HeaderCell># In Stock</Table.HeaderCell>
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
                    <Button animated basic to={`/admin/product/${product._id}`} as={Link}>
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
                            <Icon.Group>
                              <Icon name='shopping basket' />
                              <Icon corner='bottom right' name='x' />
                            </Icon.Group>
                          </Button.Content>
                        </Button>
                      }
                      content={<Button color='green' content='Confirm Deletion' onClick={deleteProductHandler} value={product._id} />}
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
