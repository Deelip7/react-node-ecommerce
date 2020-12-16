import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Form, Icon, Label, Message, Popup } from 'semantic-ui-react';
import { getUserDetails } from '../actions/userActions';
import { adminProductUpdate } from '../actions/adminActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { ADMIN_UPDATE_PRODUCT_RESET } from '../constants/adminConstants';
import { listProductDetails } from '../actions/productActions';

const AdminProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [numInStock, setNumInStock] = useState('');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading: loadingProduct, error: errorProduct, product } = productDetails;

  const adminUpdateProduct = useSelector((state) => state.adminUpdateProduct);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = adminUpdateProduct;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_UPDATE_PRODUCT_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setNumInStock(product.numInStock);
      }
    }
  }, [dispatch, history, product]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name);
    dispatch(adminProductUpdate({ _id: productId, name, price, numInStock }));
  };

  return (
    <>
      {loadingProduct && <Loader />}
      {errorProduct && <Message variant='danger'>{errorProduct}</Message>}
      {loadingProduct ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit your account details</h1>
          <Form onSubmit={(e) => submitHandler(e)} loading={loadingProduct}>
            <Form.Input size='large' icon='shopping basket' iconPosition='left' label='Name' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
            <Form.Input size='large' icon='dollar sign' iconPosition='left' label='Price' type='text' placeholder='Price' onChange={(e) => setPrice(e.target.value)} value={price} />
            <Form.Input size='large' icon='hashtag' iconPosition='left' label='NumInStock' type='text' placeholder='NumInStock' onChange={(e) => setNumInStock(e.target.value)} value={numInStock} />

            <Button color='black' type='submit' style={{ width: '100%' }}>
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default AdminProductEditScreen;
