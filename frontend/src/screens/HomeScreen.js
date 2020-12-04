import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import { Message } from 'semantic-ui-react';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>
          <Message style={{ margin: '0 auto', width: '50%' }} error header='Something went wrong. Please try again' list={[error]} />
        </div>
      ) : (
        <div>
          <div className='card-container'>
            {products
              .sort((a, b) => b.numInStock - a.numInStock)
              .map((product) => (
                <Product product={product} key={product._id} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
