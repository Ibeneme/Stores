import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAllProductDetails } from "../../../Slices/Sellers/edit/editAllSlice";

const EditAllForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.editAll.loading);
  const error = useSelector((state) => state.editAll.error);
  const success = useSelector((state) => state.editAll.success);

  const [uniqueId, setUniqueId] = useState("");
  const [name, setName] = useState("");
  const [categoryUniqueId, setCategoryUniqueId] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [salesPrice, setSalesPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remaining, setRemaining] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      unique_id: uniqueId,
      name,
      category_unique_id: categoryUniqueId,
      description: description,
      location: location,
      price: price,
      sales_price: salesPrice,
      specifications: {
        color: color,
        size: size,
      },

      quantity: quantity,
      remaining: remaining,
    };

    dispatch(updateAllProductDetails(productData));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "3em",
        backgroundColor: "white",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "4em",
          backgroundColor: "white",
        }}
        className="addproduct-first-div"
        onSubmit={handleSubmit}
      >
          <h1 className="addproduct-first-h1">Edit a Product</h1>
        <input
          type="text"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          placeholder="Unique ID"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={categoryUniqueId}
          onChange={(e) => setCategoryUniqueId(e.target.value)}
          placeholder="Category Unique ID"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        ></textarea>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          placeholder="Price"
        />
        <input
          type="number"
          value={salesPrice}
          onChange={(e) => setSalesPrice(parseInt(e.target.value))}
          placeholder="Sales Price"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Color"
        />
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          placeholder="Size"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          placeholder="Quantity"
        />
        <input
          type="number"
          value={remaining}
          onChange={(e) => setRemaining(parseInt(e.target.value))}
          placeholder="Remaining"
        />

        <button className="btn-add-a-product" type="submit" disabled={loading}>
          Update All
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {success && <div>Product details updated successfully!</div>}
    </div>
  );
};

export default EditAllForm;
