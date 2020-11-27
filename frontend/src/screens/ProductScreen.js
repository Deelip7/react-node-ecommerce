import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { Button } from 'semantic-ui-react';
import { listProductDetails } from '../actions/productActions';
import { Dimmer, Loader, Message } from 'semantic-ui-react';

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {loading ? (
        <Dimmer active>
          <Loader size='large' />
        </Dimmer>
      ) : error ? (
        <div>
          <Message style={{ margin: '0 auto', width: '50%' }} error header='Something went wrong. Please try again' list={[error]} />
        </div>
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
              <Button color='black' disabled={product.numInStock > 0 ? false : true}>
                ADD TO CART
              </Button>
            </div>
            <div className='product__image'>
              <img src={product.image} alt={product.name} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductScreen;
