import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import { Button, Comment, Divider, Form, Header, Select } from 'semantic-ui-react';

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
          <Divider />
          <div className='review'>
            <h2>Reviews</h2>
            <Comment.Group className='product__review'>
              <Comment>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                <Comment.Content>
                  <Comment.Metadata>
                    <Rating rating={product.rating} />
                  </Comment.Metadata>
                  <Comment.Author>Joe Henderson</Comment.Author>
                  <Comment.Metadata>
                    <div>1 day ago</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there.</p>
                    <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                  </Comment.Text>
                </Comment.Content>
              </Comment>

              <Comment>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                <Comment.Content>
                  <Comment.Metadata>
                    <Rating rating={product.rating} />
                  </Comment.Metadata>
                  <Comment.Author>Joe Henderson</Comment.Author>
                  <Comment.Metadata>
                    <div>1 day ago</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there.</p>
                    <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                  </Comment.Text>
                </Comment.Content>
              </Comment>

              <Comment>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                <Comment.Content>
                  <Comment.Metadata>
                    <Rating rating={product.rating} />
                  </Comment.Metadata>
                  <Comment.Author>Joe Henderson</Comment.Author>
                  <Comment.Metadata>
                    <div>1 day ago</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there.</p>
                    <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                  </Comment.Text>
                </Comment.Content>
              </Comment>

              <Form reply>
                <Form.TextArea />
                <Button content='Add Comment' basic />
              </Form>
            </Comment.Group>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductScreen;
