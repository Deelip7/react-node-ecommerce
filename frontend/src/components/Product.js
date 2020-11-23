import React from 'react';
import { Button } from 'semantic-ui-react';

const Product = ({ product }) => {
  return (
    <div className='card'>
      <div className='card__image'>
        <img src={product.image} alt='' />
        {/* <img src='https://source.unsplash.com/400x400/?keyboard' alt='' /> */}
      </div>
      <span className='card__addtocart'>Add to Cart</span>
      <div className='card__title'>{product.name}</div>
      <div className='card__price'>${product.price}</div>
    </div>
  );
};

export default Product;
