import React from 'react';
import products from '../products';
import Rating from '../components/Rating';
import { Button } from 'semantic-ui-react';

console.log(products);

const ProductScreen = ({ match }) => {
  const product = products.find((e) => e._id === match.params.id);

  return (
    <>
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
          <div class='product__image'>
            <img src={product.image} alt='' />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductScreen;
