import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ratings from '../components/Ratings';
import { listProductDetails, Productreview } from '../actions/productActions';
import { Button, Comment, Divider, Form, Header, Select, Rating, Label } from 'semantic-ui-react';

import Page404 from '../components/Page404';
import Loader from '../components/Loader';

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch(0);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(' ');

  const productDetails = useSelector((state) => state.productDetails);

  const productReview = useSelector((state) => state.productReview);
  const { success: successProductReview, loading: loadingProductReview, error: errorProductReview } = productReview;
  // alert(errorProductReview);

  const { loading, product, error } = productDetails;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment(' ');
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const qtyOptions = product ? [...Array(product.numInStock).keys()].map((p) => ({ text: `${p + 1}`, value: `${p + 1}` })) : [];

  const getQty = (e, { value }) => {
    setQty(Number(value));
  };
  const ratingHandler = (e, { rating }) => {
    setRating(rating);
  };

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const reviewHandler = (e) => {
    e.preventDefault();
    if (!rating) {
      alert('Please enter a rating');
    } else {
      dispatch(
        Productreview(match.params.id, {
          rating,
          comment,
        })
      );
    }
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
              <Ratings rating={product.rating} />
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
            <h2>Customer Reviews</h2>
            <Comment.Group className='product__review'>
              {product.review.length > 0 ? (
                product.review.map((r) => (
                  <Comment key={r._id}>
                    <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                    <Comment.Content>
                      <Comment.Metadata>
                        <Ratings rating={r.rating} />
                      </Comment.Metadata>
                      <Comment.Author>{r.name}</Comment.Author>
                      <Comment.Metadata>
                        <div>{r.updatedAt.split('T')[0]}</div>
                      </Comment.Metadata>
                      <Comment.Text>
                        <p>{r.comment}</p>
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                ))
              ) : (
                <span className='review__span'>Be the first to review this product.</span>
              )}

              <h2>Review this product</h2>
              <span className='review__span'>Share your thoughts with other customers</span>
              <Form reply>
                <Form.TextArea onChange={(e) => setComment(e.target.value)} />
                <div className='review-rating'>
                  <Rating maxRating={5} defaultRating={successProductReview ? 0 : 0} onRate={ratingHandler} size='huge' required clearable />
                </div>
                <Button content='Write a review' basic type='button' onClick={(e) => reviewHandler(e)} />
              </Form>
            </Comment.Group>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductScreen;
