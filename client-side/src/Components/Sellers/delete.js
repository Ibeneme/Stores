import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../Slices/Sellers/deleteProductSlice';
import { useLocation, useNavigate } from 'react-router';

const ProductDeletePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const unique_id = queryParams.get("unique_id");
  const deleteStatus = useSelector(deleteProduct);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(deleteProduct(unique_id));
  }, [dispatch, unique_id]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      // Product successfully deleted
      // Redirect to a success page or any other logic you need
      navigate('/success');
    } else if (deleteStatus === 'failed') {
      // Product deletion failed
      // Redirect to an error page or handle the error as needed
      navigate('/error');
    }
  }, [deleteStatus, navigate]);

  return (
    <div>
      <h1>Product Delete Page</h1>
      {/* Your component JSX */}
    </div>
  );
};

export default ProductDeletePage;
