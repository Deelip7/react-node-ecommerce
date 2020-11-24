import React from 'react';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className='card'>
      <div className='card__image'>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt='' />
        </Link>
        {/* <img src='https://source.unsplash.com/400x400/?keyboard' alt='' /> */}
        <span className='card__addtocart'>Add to Cart</span>
      </div>
      <Link to={`/product/${product._id}`}>
        <div className='card__title'>{product.name}</div>
      </Link>
      <div className='card__rating'>
        <Rating rating={product.rating} />
      </div>

      <div className='card__price'>${product.price}</div>
    </div>
  );
};

export default Product;
