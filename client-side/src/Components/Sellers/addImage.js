import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductImage } from '../../Slices/Sellers/Image/AddImageSlice';
import Navbarr from '../Navbar-and-Footer/Navbarr';

const ProductImageForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.productImage.loading);
  const error = useSelector((state) => state.productImage.error);
  const success = useSelector((state) => state.productImage.success);

  const [productUniqueId, setProductUniqueId] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addProductImage({ productUniqueId, image }));
  };

  return (
    <div>
      <Navbarr />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={productUniqueId}
          onChange={(e) => setProductUniqueId(e.target.value)}
          placeholder="Product Unique ID"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />
        <button type="submit" disabled={loading}>
          Add Image
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error occurred while adding product image.</div>}
      {success && <div>Product image added successfully!</div>}
    </div>
  );
};

export default ProductImageForm;
