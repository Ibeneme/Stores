import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePrices } from '../../../Slices/Sellers/edit/priceSlice';

const EditPricesForm = () => {
  const dispatch = useDispatch();

  const [uniqueId, setUniqueId] = useState('');
  const [price, setPrice] = useState('0');
  const [salesPrice, setSalesPrice] = useState('0');

  const loading = useSelector((state) => state.editPrices.loading);
  const error = useSelector((state) => state.editPrices.error);
  const success = useSelector((state) => state.editPrices.success);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the updatePrices action with parsed float values
    dispatch(updatePrices({ uniqueId, price: parseFloat(price), salesPrice: parseFloat(salesPrice) }));
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
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
        />
        <input
          type="number"
          value={salesPrice}
          onChange={(e) => setSalesPrice(e.target.value)}
          placeholder="Enter Sales Price"
        />
        <button type="submit" disabled={loading}>
          Update Prices
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {success && <div>Prices updated successfully!</div>}
    </div>
  );
};

export default EditPricesForm;
