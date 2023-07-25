import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../Slices/Sellers/addProductSlice";
import { sendProductDraft } from "../../Slices/Sellers/draftProductSlice";
import "./styles/addProduct.css";
import { useNavigate } from "react-router";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { useGetAllProductsQuery } from "../../Slices/Sellers/productSlice";
import { addProductImage } from "../../Slices/Sellers/Image/AddImageSlice";
import { storage } from "../../Firebase/firebaseConfig";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { publishProduct } from "../../Slices/Sellers/publishProductSlice";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const { error: draftError } = useSelector((state) => state.addproduct);
  console.log(draftError);
  const isImageUploadHandledRef = useRef(false);
  const { error: nameError } = useSelector((state) => state.draftProduct);
  console.log(nameError, "draft");

  const { data } = useGetAllProductsQuery();
  console.log(data, "productss");
  const loading = useSelector((state) => state.productImage.loading);
  const error = useSelector((state) => state.productImage.error);
  const success = useSelector((state) => state.productImage.success);
  const [imageList, setImageList] = useState([]);
  const [uniqueID, setUniqueId] = useState("");
  // // const [product_unique_id, setProductUniqueId] = useState("");
  const [imageUpload, setImageUpload] = useState([]);

  const imageListRef = ref(storage, "SellersImages/");

  const [setError, setFormError] = useState("");
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
  const navigate = useNavigate();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);

  const handleDraft = () => {
    dispatch(sendProductDraft(parseProductData(productData)))
      .then(() => {
        if ({ error: nameError }) {
          setFormError(nameError);
          const { rows } = data.data;
          console.log(rows, "row");
          console.log(setError, "datadata");
        } else {
          navigate(
            `/success?message=Product%20successfully%20Added%20to%20Drafts`
          );
        }
      })
      .catch((error) => {});
  };

  const handleAddProduct = async () => {
    try {
      setShowAddModal(true);

      const productDraft = parseProductData(productData);

      const response = await dispatch(sendProductDraft(productDraft));
      console.log("Product Draft Sent Successfully:", response);

      const unique_id = response.payload.data.unique_id;
      setUniqueId(unique_id);

      await handleImageUpload();

      console.log("Add Product logic goes here");
      // You can dispatch other actions or perform other operations related to adding the product
    } catch (error) {
      console.error("Error Sending Product Draft:", error);
    }
  };
  const openAddModal = async () => {
    try {
      setShowAddModal(true);
      const productDraft = parseProductData(productData);
      const response = await dispatch(sendProductDraft(productDraft));
      console.log("Product Draft Sent Successfully:", response);
      const unique_id = response.payload.data.unique_id;
      setUniqueId(unique_id);
      await handleImageUpload(unique_id);
    } catch (error) {
      console.error("Error Sending Product Draft:", error);
    }
  };
  
  const handleImageUpload = async (unique_id) => {
    if (imageUpload.length === 0 || isImageUploadHandledRef.current) return;
  
    try {
      const uploadPromises = imageUpload.map(async (file) => {
        const imageRef = ref(storage, `SellersImages/${uuidv4()}-${file.name}`);
        await uploadBytes(imageRef, file);
        return getDownloadURL(imageRef);
      });
  
      const urls = await Promise.all(uploadPromises);
  
      setImageUpload([]);
      setImageList((prevImageList) => [...prevImageList, ...urls]);
  
      alert("Images uploaded");
  
      const images = urls.map((url) => ({ url }));
      dispatch(addProductImage({ unique_id, images }));

      console.log("Image upload successful");
    } catch (error) {
      console.error("Error Uploading Images:", error);
    }
  };
  

  const handleSubmit = async () => {
    try {
      const response = await dispatch(publishProduct(uniqueID));
      console.log(response);
      if (response.success) {
        // Product was published successfully
        // //  navigate(`/success?message=Product%20successfully%Added`);
      } else {
        // // Product was not published successfully
        // //  navigate(`/errorpage?message=Error%20Adding%20this%20Product`);
      }
    } catch (error) {
      // Handle any error that occurred during dispatching
      console.error("Error Adding Product:", error);
      // navigate(`/errorpage?message=Error%20Adding%20this%20Product`);
    }
    console.log("working delete", uniqueID);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openDraftModal = () => {
    setShowDraftModal(true);
  };

  const closeDraftModal = () => {
    setShowDraftModal(false);
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

  const nameErrors = nameError && nameError.data ? nameError.data : [];

  const categoryError = nameErrors.find(
    (error) => error.param === "category_unique_id"
  );

  const ProductNameError = nameErrors.find((error) => error.param === "name");

  const DescriptionError = nameErrors.find(
    (error) => error.param === "description"
  );
  const QuantityError = nameErrors.find((error) => error.param === "quantity");
  const max_quantityError = nameErrors.find(
    (error) => error.param === "max_quantity"
  );
  const RemainingError = nameErrors.find(
    (error) => error.param === "remaining"
  );
  const PriceError = nameErrors.find((error) => error.param === "price");
  const sales_priceError = nameErrors.find(
    (error) => error.param === "sales_price"
  );

  const [selectedColor, setSelectedColor] = useState("");
  const [colors, setColors] = useState([]);

  const handleChangeColor = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleAddColor = () => {
    if (selectedColor) {
      setColors((prevColors) => [...prevColors, selectedColor]);
      setSelectedColor("");
    }
  };

  const handleRemoveColor = (color) => {
    setColors((prevColors) => prevColors.filter((c) => c !== color));
  };

  const getColorDisplayName = (color) => {
    const colorDisplayNames = {};

    const displayName = colorDisplayNames[color.toLowerCase()];

    if (displayName) {
      return displayName;
    }

    return color.charAt(0).toUpperCase() + color.slice(1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "6em",
        marginBottom: "2em",
      }}
      className="addprodut-f4"
    >
      <div
        className="addproduct-first-div"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "4em",
          backgroundColor: "white",
        }}
      >
        <h1 className="addproduct-first-h1">Sell a Product</h1>

        <div style={{ marginTop: "0em" }}>
          {/* <input
          type="text"
          // value={product_unique_id}
          onChange={(e) => setProductUniqueId(e.target.value)}
          placeholder="Product Unique ID"
        /> */}

          {/* Custom styled image upload */}
          <label>
            <input
              type="file"
              onChange={(event) => {
                const files = Array.from(event.target.files);
                setImageUpload((prevUploads) => [...prevUploads, ...files]);
              }}
              accept="image/*"
              multiple
            />

            <span>Upload Photo</span>
            {imageUpload.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Selected Image ${index + 1}`}
                style={{ width: "100px", height: "100px", margin: "5px" }}
              />
            ))}
          </label>

          <button type="submit">Add Images</button>
        </div>

        <div>
          <select
            className="input-forms"
            style={{ height: "50px" }}
            name="category_unique_id"
            value={productData.category_unique_id}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="9vmSKMKFQshEVLHr7ylz">Thrifts and Okrika</option>
          </select>
          <p
            style={{
              marginTop: "-1.59em",
            }}
            className="error"
          >
            {categoryError?.msg}
          </p>
        </div>
        <div>
          <input
            className="input-forms"
            style={{
              height: "50px",
            }}
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter Product Name"
          />
          <p
            style={{
              marginTop: "-1.59em",
            }}
            className="error"
          >
            {ProductNameError?.msg}
          </p>
        </div>
        <div>
          <textarea
            className="input-forms"
            style={{ height: " 6em", marginBottom: "1.69em", padding: "0.4em" }}
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter Product Description"
          ></textarea>
          <p
            style={{
              marginTop: "-1.59em",
            }}
            className="error"
          >
            {DescriptionError?.msg}
          </p>
        </div>
        <div>
          <div>
            <div
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              <input
                className="input-forms"
                style={{
                  height: "50px",
                }}
                type="text"
                name="color"
                value={selectedColor}
                onChange={handleChangeColor}
                placeholder="Enter Product Color"
              />
              <button
                onClick={handleAddColor}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 4,
                  padding: "0 8px",
                  height: "42px",
                  width: "fit-content",
                  backgroundColor: "#064bde",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Add Color
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                marginTop: "-22px",
                marginBottom: "56px",
              }}
              className="input-color"
            >
              {colors.map((color, index) => (
                <div key={index}>
                  <div
                    style={{
                      position: "relative",
                      backgroundColor: color,
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      marginTop: "10px",
                      border:
                        color.toLowerCase() === "white"
                          ? "1px solid black"
                          : "none", // Add border style for white color
                    }}
                  >
                    <MdOutlineRemoveCircle
                      onClick={() => handleRemoveColor(color)}
                      style={{
                        position: "absolute",
                        top: "-5",
                        right: "-5",
                        backgroundColor: "#064bde",
                        border: "#064bde solid 2px",
                        borderRadius: "100px",
                        fontSize: "24px",
                        color: "white",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      marginTop: "43px",
                      fontSize: "12px",
                      textAlign: "center",
                      width: "36px",
                    }}
                  >
                    {getColorDisplayName(color)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <input
            className="input-forms"
            style={{
              height: "50px",
            }}
            type="text"
            name="size"
            value={productData.specifications.size}
            onChange={handleChange}
            placeholder="Enter Product Size"
          />
        </div>
        <div>
          <input
            className="input-forms"
            style={{
              height: "50px",
            }}
            type="text"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            placeholder="Enter Product Quantity"
          />
          <p
            style={{
              marginTop: "-1.59em",
            }}
            className="error"
          >
            {QuantityError?.msg}
          </p>
        </div>
        <div>
          <input
            className="input-forms"
            style={{
              height: "50px",
            }}
            type="text"
            name="remaining"
            value={productData.remaining}
            onChange={handleChange}
            placeholder="Enter Product Remaining Quantity"
          />
          <p
            style={{
              marginTop: "-1.59em",
            }}
            className="error"
          >
            {RemainingError?.msg}
          </p>
        </div>
        <div>
          <input
            className="input-forms"
            style={{
              height: "50px",
            }}
            type="text"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Enter Product Price"
          />
          <p
            style={{
              marginTop: "-1.59em",
            }}
            className="error"
          >
            {PriceError?.msg}
          </p>
        </div>
        <div>
          <input
            className="input-forms"
            style={{
              height: "50px",
            }}
            type="text"
            name="max_quantity"
            value={productData.max_quantity}
            onChange={handleChange}
            placeholder="Enter Product Max Quantity"
          />{" "}
          <p
            style={{
              marginTop: "-1.59em",
            }}
            className="error"
          >
            {max_quantityError?.msg}
          </p>
        </div>
        <div>
          <input
            className="input-forms"
            style={{
              height: "50px",
            }}
            type="text"
            name="sales_price"
            value={productData.sales_price}
            onChange={handleChange}
            placeholder="Enter Product Sales Price"
          />
          <p
            style={{
              marginTop: "-1.59em",
            }}
            className="error"
          >
            {sales_priceError?.msg}
          </p>
        </div>
        <div>
          <select
            className="input-forms"
            name="state"
            value={productData.state}
            onChange={handleChange}
          >
            <option value="">Select a state</option>
            <option value="Abuja">FCT - Abuja</option>
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
        </div>

        <button
          style={{
            height: "50px",
          }}
          className="btn-add-a-product input-forms"
          onClick={openAddModal}
        >
          Add Product
        </button>
        <button
          style={{
            height: "50px",
          }}
          className="btn-draft-a-product input-forms"
          onClick={openDraftModal}
        >
          Draft
        </button>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div
          style={{
            zIndex: "999",
          }}
          className="modal"
        >
          <div className="modal-content">
            <h2>Add this Product</h2>
            <p>Are you sure you want to add this product?</p>
            <p
              style={{
                color: "red",
              }}
            >
              {setError}
            </p>
            <div className="modal-buttons">
              <button
                style={{
                  backgroundColor: "#d9d9d945",
                  color: "#000",
                }}
                onClick={closeAddModal}
              >
                No, Save as Drafts
              </button>

              <button
                style={{
                  backgroundColor: "#064bde",
                  color: "white",
                }}
                onClick={handleSubmit}
              >
                Add{" "}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Draft Modal */}
      {showDraftModal && (
        <div
          style={{
            zIndex: "999",
          }}
          className="modal"
        >
          <div className="modal-content">
            <h2>Draft this Product?</h2>
            <p>Are you sure you want to draft this product.</p>

            <div className="modal-buttons">
              <button
                style={{
                  backgroundColor: "#d9d9d945",
                  color: "#000",
                }}
                onClick={closeDraftModal}
              >
                Cancel
              </button>
              <button
                style={{
                  backgroundColor: "#064bde",
                  color: "white",
                }}
                onClick={handleDraft}
              >
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
