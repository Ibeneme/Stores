import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProductImage } from '../../../Slices/Sellers/Image/EditImageSlice';

const ProductImageFormEdit = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.productImage.loading);
  const error = useSelector((state) => state.productImage.error);
  const success = useSelector((state) => state.productImage.success);

  const [uniqueId, setUniqueId] = useState('');
  const [productUniqueId, setProductUniqueId] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editProductImage({ uniqueId, productUniqueId, image }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          placeholder="Image Unique ID"
        />
        <input
          type="text"
          value={productUniqueId}
          onChange={(e) => setProductUniqueId(e.target.value)}
          placeholder="Product Unique ID"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
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

export default ProductImageFormEdit;
