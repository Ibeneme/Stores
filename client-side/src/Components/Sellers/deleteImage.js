import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductImage } from '../../Slices/Sellers/Image/deleteImageSlice';

const DeleteProductImageForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.productImage.loading);
  const error = useSelector((state) => state.productImage.error);
  const success = useSelector((state) => state.productImage.success);

  const [uniqueId, setUniqueId] = useState('');
  const [productUniqueId, setProductUniqueId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(deleteProductImage({ uniqueId, productUniqueId }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          placeholder="Unique ID"
        />
        <input
          type="text"
          value={productUniqueId}
          onChange={(e) => setProductUniqueId(e.target.value)}
          placeholder="Product Unique ID"
        />
        <button type="submit" disabled={loading}>
          Delete Image
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {success && <div>Product image deleted successfully!</div>}
    </div>
  );
};

export default DeleteProductImageForm;
