import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoriesLocationsFetch } from '../../Slices/Products/CategoriesLocationSlices';
import Footer from '../Navbar-and-Footer/Footer';
import Loader from '../Loader/Loader';
import { addToCart } from "../../Slices/cartSlice";

const CategoriesLocations = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category_unique_id = queryParams.get("category_unique_id");
  const location_unique_id = queryParams.get("location_unique_id");
  const navigate = useNavigate();


  console.log(category_unique_id);
  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
    navigate('/cart')
  };

  const dispatch = useDispatch();
  const { items: details, status, error } = useSelector((state) => state.CategoriesLocations);
console.log(details)
  useEffect(() => {
    console.log(location_unique_id, category_unique_id);
    dispatch(CategoriesLocationsFetch({ category_unique_id, location_unique_id }));
  }, [dispatch,category_unique_id, location_unique_id ]);

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {details && details.data && ( // Add conditional check
        <div>
          <p>{details.data.category_data.name}</p>
          <p onClick={() => handleAddToCart(details)}>{details.data.location}</p>
       </div>
      )}
      <Footer />
    </div>
  );
};

export default CategoriesLocations;
