import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDescription } from '../../../Slices/Sellers/edit/EditDescription';

const EditDescriptionForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.editDescription.loading);
  const error = useSelector((state) => state.editDescription.error);
  const success = useSelector((state) => state.editDescription.success);

  const [uniqueId, setUniqueId] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateDescription({ uniqueId, description }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Update Description
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error occurred while updating description.</div>}
      {success && <div>Product description updated successfully!</div>}
    </div>
  );
};

export default EditDescriptionForm;
