import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';

const OrderItems = ({ items }) => {
  return (
    <>
      <div className='order-item'>
        <div className='order-item__image'>
          <Link to={`/product/${items.product}`}>
            <img src={items.image} alt='' />
          </Link>
        </div>
        <div className='order-item__info'>
          <div>{items.name}</div>
          <div>
            {items.qty} x ${items.price}
          </div>
        </div>
      </div>
      <Divider style={{ margin: '.5rem 0', borderTop: '1px solid rgba(91, 14, 22, 0.1)' }} />
    </>
  );
};

export default OrderItems;
