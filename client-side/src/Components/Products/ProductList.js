import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsFetch } from '../../Slices/Products/productSlice';
import Footer from '../Navbar-and-Footer/Footer';
import Loader from '../Loader/Loader';

const ProductDetailsPage = ({ user_unique_id, unique_id }) => {
  const dispatch = useDispatch();
  const { items: details, status, error } = useSelector((state) => state.productsDetails);
console.log(details)
  useEffect(() => {
    dispatch(productsFetch({ user_unique_id, unique_id }));
  }, [dispatch, user_unique_id, unique_id]);

  if (status === 'pending') {
    return <div><Loader /></div>;
  }

  if (status === 'rejected') {
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
