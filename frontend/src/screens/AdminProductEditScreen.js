import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Label, Message } from 'semantic-ui-react';
import { adminProductUpdate } from '../actions/adminActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { ADMIN_UPDATE_PRODUCT_RESET } from '../constants/adminConstants';
import { listProductDetails } from '../actions/productActions';
import { useDropzone } from 'react-dropzone';

const AdminProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
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
        setDetail(product.detail);
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

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  console.log(acceptedFiles);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

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
            <Form.TextArea size='large' label='Datail' placeholder='Detail' onChange={(e) => setDetail(e.target.value)} value={detail} style={{ height: '150px' }} />

            <Form.Input size='large' icon='dollar sign' iconPosition='left' label='Price' type='text' placeholder='Price' onChange={(e) => setPrice(e.target.value)} value={price} />
            <Form.Input size='large' icon='hashtag' iconPosition='left' label='NumInStock' type='text' placeholder='NumInStock' onChange={(e) => setNumInStock(e.target.value)} value={numInStock} />

            <section>
              <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
              </aside>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>

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
