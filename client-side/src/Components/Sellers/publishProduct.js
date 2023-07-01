import React, { useEffect } from 'react';
import {  useDispatch } from 'react-redux';
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
    dispatch(publishProduct(unique_id));
  }, [dispatch, unique_id]);
  

  return (
    <div>
      <h1 onClick={()=>navigate('/')}>Product Publish Page</h1>
      {/* Your component JSX */}
    </div>
  );
};

export default ProductPublishPage;
