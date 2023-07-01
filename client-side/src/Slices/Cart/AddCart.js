import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../Slices/Cart/CartSlice';

const AddToCartComponent = () => {
  const [itemData, setItemData] = useState({
    product_unique_id: '',
    shipping_unique_id: '',
    shipping_fee: 0,
    from_address: '',
    to_address: '',
    quantity: 1,
  });

  const isAdding = useSelector((state) => state.cart.adding);
  const error = useSelector((state) => state.cart.error);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItemData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(itemData));
  };

  return (
    <div>
      <input
        type="text"
        name="product_unique_id"
        value={itemData.product_unique_id}
        onChange={handleInputChange}
      />
      {/* Add more input fields for other itemData properties */}
      <button onClick={handleAddToCart} disabled={isAdding}>
        Add to Cart
      </button>
      {isAdding && <div>Adding to cart...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default AddToCartComponent;
