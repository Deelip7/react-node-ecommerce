import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { Button } from 'semantic-ui-react';
import { listProductDetails } from '../actions/productActions';
// import { Dimmer, Loader, Message } from 'semantic-ui-react';
import { Dimmer, Loader, Message, Form, Select } from 'semantic-ui-react';

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch(0);

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const qtyOptions = [...Array(product.numInStock).keys()].map((p) => ({ text: `${p + 1}`, value: `${p + 1}` }));

  const getQty = (e, { value }) => {
    setQty(Number(value));
  };

  const cartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

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

              <Form className='product__form'>
                <Form.Field control={Select} onChange={getQty} options={qtyOptions} defaultValue='1' disabled={product.numInStock === 0} />
                <Button color='black' type='button' disabled={product.numInStock === 0} onClick={(e) => cartHandler()}>
                  ADD TO CART
                </Button>
              </Form>
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
