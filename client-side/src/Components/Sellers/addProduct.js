import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../Slices/Sellers/addProductSlice";
import { sendProductDraft } from "../../Slices/Sellers/draftProductSlice";
import "./styles/addProduct.css";
import Footer from "../Navbar-and-Footer/Footer";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    category_unique_id: "",
    name: "",
    description: "",
    specifications: {
      color: "",
      size: "",
    },
    quantity: "",
    remaining: "",
    price: "",
    sales_price: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(parseProductData(productData)));
  };

  const handleDraft = (e) => {
    e.preventDefault();
    dispatch(sendProductDraft(parseProductData(productData)));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "color" || name === "size") {
      setProductData((prevData) => ({
        ...prevData,
        specifications: {
          ...prevData.specifications,
          [name]: value,
        },
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const parseProductData = (productData) => {
    return {
      ...productData,
      quantity: parseInt(productData.quantity),
      remaining: parseInt(productData.remaining),
      price: parseInt(productData.price),
      sales_price: parseInt(productData.sales_price),
      specifications: {
        ...productData.specifications,
        size: parseInt(productData.specifications.size),
      },
    };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop:'6em',
        backgroundColor:'white'
      }}
    >
      <div
        className="addproduct-first-div"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "4em",
          backgroundColor:'white'
          
        }}
      >
        <h1 className="addproduct-first-h1">Sell a Product</h1>
        <input
          type="text"
          name="category_unique_id"
          value={productData.category_unique_id}
          onChange={handleChange}
          placeholder="Enter Category ID"
        />
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Enter Product Name"
        />
        <textarea
          style={{
            height: " 6em",
            marginBottom: "1em",
            padding: "0.4em",
          }}
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Enter Product Description"
        ></textarea>
        <input
          type="text"
          name="color"
          value={productData.specifications.color}
          onChange={handleChange}
          placeholder="Enter Product Color"
        />
        <input
          type="text"
          name="size"
          value={productData.specifications.size}
          onChange={handleChange}
          placeholder="Enter Product Size"
        />
        <input
          type="text"
          name="quantity"
          value={productData.quantity}
          onChange={handleChange}
          placeholder="Enter Product Quantity"
        />
        <input
          type="text"
          name="remaining"
          value={productData.remaining}
          onChange={handleChange}
          placeholder="Enter Product Remaining Quantity"
        />

        <input
          type="text"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Enter Product Price"
        />
        <input
          type="text"
          name="max_quantity"
          value={productData.max_quantity}
          onChange={handleChange}
          placeholder="Enter Product Max Quantity"
        />
        <input
          type="text"
          name="sales_price"
          value={productData.sales_price}
          onChange={handleChange}
          placeholder="Enter Product Sales Price"
        />
        <select
          style={{
            height: " 3em",
            marginBottom: "1em",
            padding: "0.4em",
          }}
          name="state"
          value={productData.state}
          onChange={handleChange}
        >
          <option value="">Select a state</option>
          <option value="Abia">Abia</option>
          <option value="Adamawa">Adamawa</option>
          <option value="Akwa Ibom">Akwa Ibom</option>
          <option value="Anambra">Anambra</option>
          <option value="Bauchi">Bauchi</option>
          <option value="Bayelsa">Bayelsa</option>
          <option value="Benue">Benue</option>
          <option value="Borno">Borno</option>
          <option value="Cross River">Cross River</option>
          <option value="Delta">Delta</option>
          <option value="Ebonyi">Ebonyi</option>
          <option value="Edo">Edo</option>
          <option value="Ekiti">Ekiti</option>
          <option value="Enugu">Enugu</option>
          <option value="Gombe">Gombe</option>
          <option value="Imo">Imo</option>
          <option value="Jigawa">Jigawa</option>
          <option value="Kaduna">Kaduna</option>
          <option value="Kano">Kano</option>
          <option value="Katsina">Katsina</option>
          <option value="Kebbi">Kebbi</option>
          <option value="Kogi">Kogi</option>
          <option value="Kwara">Kwara</option>
          <option value="Lagos">Lagos</option>
          <option value="Nasarawa">Nasarawa</option>
          <option value="Niger">Niger</option>
          <option value="Ogun">Ogun</option>
          <option value="Ondo">Ondo</option>
          <option value="Osun">Osun</option>
          <option value="Oyo">Oyo</option>
          <option value="Plateau">Plateau</option>
          <option value="Rivers">Rivers</option>
          <option value="Sokoto">Sokoto</option>
          <option value="Taraba">Taraba</option>
          <option value="Yobe">Yobe</option>
          <option value="Zamfara">Zamfara</option>
        </select>
        {productData.state === "Abia" && (
          <select
            style={{
              height: " 3em",
              marginBottom: "1em",
              padding: "0.4em",
            }}
            name="location"
            value={productData.location}
            onChange={handleChange}
          >
            <option value="">Select an LGA</option>
            <option value="Aba North">Aba North</option>
            <option value="Aba South">Aba South</option>
            <option value="Arochukwu">Arochukwu</option>
            <option value="Bende">Bende</option>
            <option value="Ikwuano">Ikwuano</option>
            <option value="Isiala Ngwa North">Isiala Ngwa North</option>
            <option value="Isiala Ngwa South">Isiala Ngwa South</option>
            <option value="Isuikwuato">Isuikwuato</option>
            <option value="Obi Ngwa">Obi Ngwa</option>
            <option value="Ohafia">Ohafia</option>
            <option value="Osisioma Ngwa">Osisioma Ngwa</option>
            <option value="Ugwunagbo">Ugwunagbo</option>
            <option value="Ukwa East">Ukwa East</option>
            <option value="Ukwa West">Ukwa West</option>
            <option value="Umuahia North">Umuahia North</option>
            <option value="Umuahia South">Umuahia South</option>
            <option value="Umu Nneochi">Umu Nneochi</option>
          </select>
        )}
        {productData.state === "Adamawa" && (
          <select
            style={{
              height: " 3em",
              marginBottom: "1em",
              padding: "0.4em",
            }}
            name="location"
            value={productData.location}
            onChange={handleChange}
          >
            <option value="">Select an LGA</option>
            <option value="Demsa">Demsa</option>
            <option value="Fufore">Fufore</option>
            <option value="Ganye">Ganye</option>
            <option value="Girei">Girei</option>
            <option value="Gombi">Gombi</option>
            <option value="Guyuk">Guyuk</option>
            <option value="Hong">Hong</option>
            <option value="Jada">Jada</option>
            <option value="Lamurde">Lamurde</option>
            <option value="Madagali">Madagali</option>
            <option value="Maiha">Maiha</option>
            <option value="Mayo-Belwa">Mayo-Belwa</option>
            <option value="Michika">Michika</option>
            <option value="Mubi North">Mubi North</option>
            <option value="Mubi South">Mubi South</option>
            <option value="Numan">Numan</option>
            <option value="Shelleng">Shelleng</option>
            <option value="Song">Song</option>
            <option value="Toungo">Toungo</option>
            <option value="Yola North">Yola North</option>
            <option value="Yola South">Yola South</option>
          </select>
        )}
        {/* <input
          type="text"
          name="location"
          value={productData.location}
          onChange={handleChange}
          placeholder="Enter Product Location"
        /> */}
        <button className="btn-add-a-product" onClick={handleSubmit}>
          Add Product
        </button>
        <button className="btn-draft-a-product" onClick={handleDraft}>
          Draft
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default AddProductForm;
