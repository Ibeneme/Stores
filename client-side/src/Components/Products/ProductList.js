import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from './productSlice';
import Footer from '../Navbar-and-Footer/Footer'
import Loader from '../Loader/Loader';

const ProductDetailsPage = ({ id }) => {
  const dispatch = useDispatch();
  const { details, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
          <div>
      <h1>{details.name}</h1>
      <p>{details.description}</p>
      <p>{details.price}</p>
     
    </div>
    <Footer />
    </div>
  
  );
};

export default ProductDetailsPage;
