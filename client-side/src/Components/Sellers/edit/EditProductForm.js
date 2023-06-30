import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../../Slices/Sellers/edit/editCategory';
import { updateProductName } from '../../../Slices/Sellers/edit/editName';

const EditForm = () => {
  const dispatch = useDispatch();

  const [uniqueId, setUniqueId] = useState('');
  const [categoryUniqueId, setCategoryUniqueId] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateCategory({ uniqueId, categoryUniqueId }));
    dispatch(updateProductName({ uniqueId, name }));

    // Reset the form fields
    setUniqueId('');
    setCategoryUniqueId('');
    setName('');
  };

  const categoryLoading = useSelector((state) => state.editCategory.loading);
  const categoryError = useSelector((state) => state.editCategory.error);
  const productLoading = useSelector((state) => state.editProduct.loading);
  const productError = useSelector((state) => state.editProduct.error);
  const productSuccess = useSelector((state) => state.editProduct.success);

  return (
    <div>
      <h3>Update Category or Product Name</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          placeholder="Enter Unique ID"
        />
        <input
          type="text"
          value={categoryUniqueId}
          onChange={(e) => setCategoryUniqueId(e.target.value)}
          placeholder="Enter Category Unique ID (optional)"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter New Name (optional)"
        />
        <button type="submit" disabled={categoryLoading || productLoading}>
          Update
        </button>
      </form>

      {(categoryLoading || productLoading) && <div>Loading...</div>}
      {categoryError && <div>Error occurred while updating category.</div>}
      {productError && <div>Error: {productError}</div>}
      {productSuccess && <div>Product name updated successfully!</div>}
    </div>
  );
};

export default EditForm;
