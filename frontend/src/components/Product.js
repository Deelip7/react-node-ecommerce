import React from 'react';
import Ratings from '../components/Ratings';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className='card'>
      <div className='card__image'>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        {product.numInStock === 0 ? (
          <Link to={`/product/${product._id}`}>
            <span className='card__addtocart'>Add to Cart</span>
          </Link>
        ) : (
          <Link to={`/cart/${product._id}?qty=${1}`}>
            <span className='card__addtocart'>Add to Cart</span>
          </Link>
        )}
      </div>
      <Link to={`/product/${product._id}`}>
        <div className='card__title'>{product.name}</div>
      </Link>
      <div className='card__rating'>
        <Ratings rating={product.rating} />
      </div>

      <div className='card__price'>${product.price}</div>
    </div>
  );
};

export default Product;
