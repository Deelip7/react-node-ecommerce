import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Icon, Message, Popup, Table } from 'semantic-ui-react';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { adminProductCreate, adminProductDelete } from '../actions/adminActions';
import { PRODUCT_LIST_RESET } from '../constants/productConstants';
import { ADMIN_CREATE_PRODUCT_RESET } from '../constants/adminConstants';
import Paginate from '../components/Paginate';

const AdminProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, totalPages, selectedPage } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminDeleteProduct = useSelector((state) => state.adminDeleteProduct);
  const { success: successDelete } = adminDeleteProduct;

  const adminCreateProduct = useSelector((state) => state.adminCreateProduct);
  const { product: createdProduct, success: successCreate } = adminCreateProduct;

  useEffect(() => {
    dispatch({ type: ADMIN_CREATE_PRODUCT_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch({ type: PRODUCT_LIST_RESET });
      dispatch(listProducts('', pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

  const deleteProductHandler = (e, { value }) => {
    dispatch(adminProductDelete(value));
  };

  const createProductHandler = () => {
    dispatch(adminProductCreate());
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Message error list={error} />}
      {products && (
        <Container>
          <Button color='black' style={{ margin: '5rem 0 1rem', float: 'right' }} onClick={createProductHandler}>
            Create Product
          </Button>
          <Table compact celled>
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
          <Paginate totalPages={totalPages} selectedPage={selectedPage} />
        </Container>
      )}
    </div>
  );
};

export default AdminProductListScreen;
