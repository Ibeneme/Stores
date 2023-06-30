import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { publishProduct } from '../../Slices/Sellers/publishProductSlice';
import { useLocation, useNavigate } from "react-router";

const ProductPublishPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const unique_id = queryParams.get("unique_id");

  
  const navigate = useNavigate();
  console.log(unique_id)

  useEffect(() => {
    // Dispatch the action when the component mounts
    dispatch(publishProduct( unique_id ));
  }, [dispatch]);

  return (
    <div>
      <h1>Product Publish Page</h1>
      {/* Your component JSX */}
    </div>
  );
};

export default ProductPublishPage;
