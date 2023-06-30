import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProductRating } from '../../Slices/Ratings/EditRatingSlice';

const EditProductRatingForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.editratings.loading);
  const error = useSelector((state) => state.editratings.error);
  const success = useSelector((state) => state.editratings.success);

  const [productUniqueId, setProductUniqueId] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editProductRating({ productUniqueId, rating }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={productUniqueId}
          onChange={(e) => setProductUniqueId(e.target.value)}
          placeholder="Product Unique ID"
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          placeholder="Rating"
        />
        <button type="submit" disabled={loading}>
          Edit Rating
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error occurred while editing product rating.</div>}
      {success && <div>Product rating edited successfully!</div>}
    </div>
  );
};

export default EditProductRatingForm;
