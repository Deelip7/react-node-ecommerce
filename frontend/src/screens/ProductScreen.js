import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ratings from '../components/Ratings';
import { listProductDetails, Productreview } from '../actions/productActions';
import { Button, Comment, Form, Select, Rating, Message, Icon } from 'semantic-ui-react';
import Page404 from '../components/Page404';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { PRODUCT_DETAILS_RESET } from '../constants/productConstants';

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch(0);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(' ');

  const productDetails = useSelector((state) => state.productDetails);

  const productReview = useSelector((state) => state.productReview);
  const { success: successProductReview, loading: loadingProductReview, error: errorProductReview } = productReview;

  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch({ type: PRODUCT_DETAILS_RESET });
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
      alert('Please enter an overall rating');
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
      ) : product ? (
        <div className='product-container'>
          <Meta title={product.name} />
          <div className='product'>
            <div className='product__info'>
              <div>
                <Ratings rating={product.rating} />
              </div>
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
              <div className='product__social'>
                <Icon name='mail outline' size='large' color='black' inverted />
                <Icon name='twitter' size='large' color='black' inverted />
                <Icon name='pinterest' size='large' color='black' inverted />
                <Icon name='facebook' size='large' color='black' inverted />
              </div>
            </div>
            <div className='product__image'>
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          <div className='review'>
            {loadingProductReview && <Loader />}
            <h3>Customer Reviews</h3>
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

              <h3>Review this product</h3>
              {errorProductReview && <Message>Sorry. You have already reviewed this product</Message>}
              <span className='review__span'>Share your thoughts with other customers</span>
              <Form reply>
                <Form.TextArea onChange={(e) => setComment(e.target.value)} />
                <div className='review-rating'>
                  <p>Overall Rating</p> <Rating maxRating={5} onRate={ratingHandler} size='huge' required clearable />
                </div>
                <Button content='Write a review' basic type='button' onClick={(e) => reviewHandler(e)} />
              </Form>
            </Comment.Group>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ProductScreen;
