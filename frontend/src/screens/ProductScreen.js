import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import { Button, Comment, Form, Header, Select } from 'semantic-ui-react';

import Page404 from '../components/Page404';
import Loader from '../components/Loader';

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch(0);

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const qtyOptions = product ? [...Array(product.numInStock).keys()].map((p) => ({ text: `${p + 1}`, value: `${p + 1}` })) : [];

  const getQty = (e, { value }) => {
    setQty(Number(value));
  };

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Page404 />
      ) : (
        <div className='product-container'>
          <div className='product'>
            <div className='product__info'>
              <Rating rating={product.rating} />
              <h1 className='product__name'>{product.name}</h1>
              <div className='product__price'>${product.price}</div>
              <div className='product__detail'>
                <p>{product.detail}</p>
                <div>{product.numInStock > 0 ? <span style={{ color: 'green' }}>In Stock.</span> : <span style={{ color: '#f68872' }}>Out Of Stock.</span>}</div>
              </div>

              <Form className='product__form'>
                <Form.Field control={Select} onChange={getQty} options={qtyOptions} defaultValue='1' disabled={product.numInStock === 0} />
                <Button color='black' type='button' disabled={product.numInStock === 0} onClick={() => addToCartHandler()}>
                  ADD TO CART
                </Button>
              </Form>
            </div>
            <div className='product__image'>
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          <div className='review'>
            <Comment.Group className='review__comment'>
              <Header as='h3' dividing>
                Comments
              </Header>

              <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                  <Comment.Author as='a'>Matt</Comment.Author>
                  <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                  </Comment.Metadata>
                  <Comment.Text>How artistic!</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>

              <Form reply>
                <Form.TextArea />
                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
              </Form>
            </Comment.Group>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductScreen;
