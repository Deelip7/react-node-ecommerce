import React from 'react';

const Ratings = ({ rating }) => {
  return (
    <>
      <span>
        <i style={{ color: '#f68872' }} className={rating >= 1 ? 'fas fa-star' : rating >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
      <span>
        <i style={{ color: '#f68872' }} className={rating >= 2 ? 'fas fa-star' : rating >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
      <span>
        <i style={{ color: '#f68872' }} className={rating >= 3 ? 'fas fa-star' : rating >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
      <span>
        <i style={{ color: '#f68872' }} className={rating >= 4 ? 'fas fa-star' : rating >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
      <span>
        <i style={{ color: '#f68872', fill: 'red' }} className={rating >= 5 ? 'fas fa-star' : rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
    </>
  );
};

export default Ratings;
