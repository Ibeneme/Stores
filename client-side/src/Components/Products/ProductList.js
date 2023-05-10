import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from './productSlice';

const ProductDetailsPage = ({ id }) => {
  const dispatch = useDispatch();
  const { details, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{details.name}</h1>
      <p>{details.description}</p>
      <p>{details.price}</p>
     
    </div>
  );
};

export default ProductDetailsPage;
