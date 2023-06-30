import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStock } from '../../../Slices/Sellers/edit/stockSlice';

const StockForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.stock.loading);
  const error = useSelector((state) => state.stock.error);
  const success = useSelector((state) => state.stock.success);

  const [uniqueId, setUniqueId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateStock({ uniqueId, quantity: parseInt(quantity), remaining: parseInt(remaining) }));
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
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <input
          type="number"
          value={remaining}
          onChange={(e) => setRemaining(parseInt(e.target.value))}
        />
        <button type="submit" disabled={loading}>
          Update Stock
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error occurred while updating stock.</div>}
      {success && <div>Stock updated successfully!</div>}
    </div>
  );
};

export default StockForm;
