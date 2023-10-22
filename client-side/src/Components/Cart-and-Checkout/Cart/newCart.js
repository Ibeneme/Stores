import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalPrice,
  addItem,
  removeItem,
  reduceItemQuantity,
} from "../../../Slices/CartStorage.js";

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  // Define the product
  const product = {
    id: 1,
    name: "Sample Product",
    price: 19.99,
  };

  // Handler to add the product to the cart
  const handleAddItem = () => {
    dispatch(addItem(product)); // Pass the product data to addItem
  };

  // Handler to remove the product from the cart
  const handleRemoveItem = () => {
    dispatch(removeItem(product)); // Pass the product data to removeItem
  };

  // Handler to reduce the quantity of the product in the cart
  const handleReduceItemQuantity = () => {
    dispatch(reduceItemQuantity(product)); // Pass the product data to reduceItemQuantity
  };

  // Find the quantity of the product in the cart
  const productInCart = cartItems.find((item) => item.id === product.id);
  const productQuantity = productInCart ? productInCart.quantity : 0;

  return (
    <div
      style={{
        marginTop: 125,
      }}
    >
      <h2>Shopping Cart</h2>
      <div>
        <h2>{product.name}</h2>
        <p>Price: ${product.price.toFixed(2)}</p>
        <button onClick={handleAddItem}>Add to Cart</button>
        <button onClick={handleReduceItemQuantity}>Reduce Quantity</button>
        <button onClick={handleRemoveItem}>Remove from Cart</button>
        <p>Total Price in Cart: ${totalPrice.toFixed(2)}</p>
        <p>Quantity in Cart: {productQuantity}</p>{" "}
        {/* Display product quantity */}
        <p>Number of Items in Cart: {cartItems.length}</p>{" "}
        {/* Display cartItems.length */}
      </div>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
}

export default Cart;
