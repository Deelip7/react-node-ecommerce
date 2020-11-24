import React from 'react';
import products from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
  return (
    <div>
      <div className='card-container'>
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
