import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAllProductDetails } from "../../../Slices/Sellers/edit/editAllSlice";
import { useLocation } from "react-router-dom";

const EditAllForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.editAll.loading);
  const { error: nameError } = useSelector((state) => state.editAll);
  console.log(nameError, "here");
  const locationn = useLocation();
  const queryParams = new URLSearchParams(locationn.search);
  const unique_id = queryParams.get("unique_id");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      unique_id: unique_id,
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

    try {
      const response = await dispatch(updateAllProductDetails(productData));

      // Handle the response
      if (response.payload.success) {
        console.log("Product details updated successfully:", response);
      } else {
        console.log("Error updating product details:", response);
        console.log("Error updating product details:", response.payload.data);
      }
    } catch (error) {
      console.log("An error occurred:", error);
      // Handle error state
    }
  };
  const categoryError = nameError?.find(
    (error) => error.param === "category_unique_id"
  );

  const ProductNameError = nameError?.find((error) => error.param === "name");

  const DescriptionError = nameError?.find(
    (error) => error.param === "description"
  );
  const QuantityError = nameError?.find((error) => error.param === "quantity");
  // const max_quantityError = nameError?.find(
  //   (error) => error.param === "max_quantity"
  // );
  const RemainingError = nameError?.find(
    (error) => error.param === "remaining"
  );
  const PriceError = nameError?.find((error) => error.param === "price");
  const sales_priceError = nameError?.find(
    (error) => error.param === "sales_price"
  );

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
          paddingTop: "6em",
          backgroundColor: "white",
        }}
        onSubmit={handleSubmit}
      >
        <h1 className="addproduct-first-h1">Edit a Product</h1>

        <div className="input-container">
          <div></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="remaining">Product Name</label>
            <input
              className="input-forms"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "-1.1em",
                marginBottom: "1.2em",
              }}
            >
              {ProductNameError?.msg}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="remaining">Category</label>
            <input
              className="input-forms"
              type="text"
              value={categoryUniqueId}
              onChange={(e) => setCategoryUniqueId(e.target.value)}
              placeholder="Category Unique ID"
            />
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "-1.1em",
                marginBottom: "1.2em",
              }}
            >
              {categoryError?.msg}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="remaining">Description</label>
            <textarea
              className="input-forms"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            ></textarea>
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "-1.1em",
                marginBottom: "1.2em",
              }}
            >
              {DescriptionError?.msg}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="remaining">Location</label>
            <input
              className="input-forms"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="remaining">Price</label>
            <input
              className="input-forms"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              placeholder="Price"
            />
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "-1.1em",
                marginBottom: "1.2em",
              }}
            >
              {PriceError?.msg}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="remaining">Sales Price</label>
            <input
              className="input-forms"
              type="number"
              value={salesPrice}
              onChange={(e) => setSalesPrice(parseInt(e.target.value))}
              placeholder="Sales Price"
            />
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "-1.1em",
                marginBottom: "1.2em",
              }}
            >
              {sales_priceError?.msg}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="remaining">Color</label>
            <input
              className="input-forms"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Color"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="remaining">Size</label>
            <input
              className="input-forms"
              type="number"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              placeholder="Size"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="remaining">Quantity</label>
            <input
              className="input-forms"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              placeholder="Quantity"
            />
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "-1.1em",
                marginBottom: "1.2em",
              }}
            >
              {QuantityError?.msg}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="remaining">Remaining</label>
            <input
              className="input-forms"
              type="number"
              value={remaining}
              onChange={(e) => setRemaining(parseInt(e.target.value))}
              placeholder="Remaining"
            />
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "-1.1em",
                marginBottom: "1.2em",
              }}
            >
              {RemainingError?.msg}
            </p>
          </div>
        </div>

        <button
          style={{
            height: "50px",
          }}
          className="btn-add-a-product"
          type="submit"
        >
          {loading ? "Loading.." : " Update All"}
        </button>
      </form>
      <div style={{
        marginBottom:'8em'
      }}>

      </div>
    </div>
  );
};

export default EditAllForm;
