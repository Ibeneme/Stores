import React, { useState } from "react";

function App() {
  // State to manage the list of items in the shopping cart
  const [items, setItems] = useState([]);

  // Predefined items that simulate data fetched from an endpoint
  const [itemsFromEndpoint] = useState([
    { name: "Item 1" },
    { name: "Item 2" },
    { name: "Item 3" },
    // You can add more items here if needed
  ]);


  const addItemToCart = (item) => {
    console.log(item, 'ITEM')
    setItems([...items, item]);
  };

 const addToCartFromEndpoint = () => {
    itemsFromEndpoint.forEach((item) => {
      addItemToCart(item);
    });
  };

  return (
    <div style={{
      marginTop: 120
    }}>
      <h1>My Online Store</h1>
      {/* Button to add predefined items to the cart */}
      <button onClick={addToCartFromEndpoint}>Add Items to Cart</button>
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          <ul>
            {items?.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default App;
