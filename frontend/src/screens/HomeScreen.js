import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    }

    fetchData();
  }, []);

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
