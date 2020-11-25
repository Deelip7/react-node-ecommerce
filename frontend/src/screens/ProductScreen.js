import React, { useState, useEffect } from 'react';
import Rating from '../components/Rating';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);

      setProduct(data);
    };

    fetchProduct();
  }, [match]);

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
          <div className='product__image'>
            <img src={product.image} alt={product.name} />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductScreen;
