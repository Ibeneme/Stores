// LocationForm.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../../../Slices/Sellers/edit/LocationSlice';

const LocationForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.location.loading);
  const error = useSelector((state) => state.location.error);
  const success = useSelector((state) => state.location.success);

  const [uniqueId, setUniqueId] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateLocation({ uniqueId, location }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          placeholder="Enter Unique ID"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
        />
        <button type="submit" disabled={loading}>
          Update Location
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error occurred while updating location.</div>}
      {success && <div>Product location updated successfully!</div>}
    </div>
  );
};

export default LocationForm;
