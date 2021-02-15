import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import { Message } from 'semantic-ui-react';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, totalPages, selectedPage } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  if (keyword && !productList.products.length) {
    toast.error(`❕ No results for ${keyword}`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <Meta title='Welcome' />
      {loading ? (
        <Loader />
      ) : error ? (
        <div>
          <Message style={{ margin: '0 auto', width: '50%' }} error header='Something went wrong. Please try again' list={[error]} />
        </div>
      ) : (
        <div className='product-card'>
          {keyword && !productList.products.length && (
            <Message style={{ margin: '5rem auto', width: '50%' }} header={`No results for ${keyword}`} content='Try checking your spelling or use more general terms' />
          )}
          <div className='card-container'>
            {products
              .sort((a, b) => b.price - a.price)
              .filter((r) => r.name !== 'Sample name')
              .map((product) => (
                <Product product={product} key={product._id} />
              ))}
          </div>
          <Paginate totalPages={totalPages} selectedPage={selectedPage} keyword={keyword} />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
