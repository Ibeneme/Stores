import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartData,
  increaseCartItemQuantity,
} from "../../../Slices/Cart/CartSlice";

const CartComponent = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.carts.data);
  const isLoading = useSelector((state) => state.carts.loading);
  const error = useSelector((state) => state.carts.error);


  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  const handleAddToCart = (itemData) => {
    dispatch(increaseCartItemQuantity(itemData));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(cartData?.data?.rows);
  return (
    <div>
      <h1>My Cart</h1>

      <ul>
        {cartData?.data?.rows.map((item) => (
          <div>
            <li key={item.id}>{item.product_data.name}</li>
            <li>{item.quantity}</li>
            <button onClick={() => handleAddToCart(item.unique_id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CartComponent;
