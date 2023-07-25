import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductImage } from "../../Slices/Sellers/Image/AddImageSlice";
import Navbarr from "../Navbar-and-Footer/Navbarr";
import { storage } from "../../Firebase/firebaseConfig";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const ProductImageForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.productImage.loading);
  const error = useSelector((state) => state.productImage.error);
  const success = useSelector((state) => state.productImage.success);
  const [imageList, setImageList] = useState([]);

  const [productUniqueId, setProductUniqueId] = useState("");
  const [imageUpload, setImageUpload] = useState([]);

  const imageListRef = ref(storage, "SellersImages/");

  const handleImageUpload = async (event) => {
    event.preventDefault();
    if (imageUpload.length === 0) return;

    const uploadPromises = imageUpload.map(async (file) => {
      const imageRef = ref(storage, `SellersImages/${uuidv4()}-${file.name}`);
      await uploadBytes(imageRef, file);
      return getDownloadURL(imageRef);
    });

    Promise.all(uploadPromises)
      .then((urls) => {
        setImageUpload([]); // Clear the uploaded files
        setImageList((prevImageList) => [...prevImageList, ...urls]);
        alert("Images uploaded");
        const images = urls.map((url) => ({ url }));
        dispatch(addProductImage({ productUniqueId, images }));
      })
      .catch((error) => {
        console.error("Error Uploading Images:", error);
      });
  };

  useEffect(() => {
    listAll(imageListRef)
      .then(async (response) => {
        const promises = response.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        });
        const urls = await Promise.all(promises);
        setImageList(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbarr />
      <form style={{ marginTop: "29em" }} onSubmit={handleImageUpload}>
        <input
          type="text"
          value={productUniqueId}
          onChange={(e) => setProductUniqueId(e.target.value)}
          placeholder="Product Unique ID"
        />

        {/* Custom styled image upload */}
        <label className="custom-image-upload">
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
        </label>

        <button type="submit">Add Images</button>
      </form>
      {imageUpload.length > 0 && (
        <div>
          <p>Selected Images:</p>
          {imageUpload.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Selected Image ${index + 1}`}
              style={{ width: "100px", height: "100px", margin: "5px" }}
            />
          ))}
        </div>
      )}
      {/* {imageList.map((url, index) => (
        <img
          width="100px"
          height="100px"
          key={index}
          src={url}
          alt={`Product Image ${index + 1}`}
        />
      ))}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {success && <div>Product images added successfully!</div>} */}
    </div>
  );
};

export default ProductImageForm;
