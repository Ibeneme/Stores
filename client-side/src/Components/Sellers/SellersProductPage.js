import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../Slices/Sellers/SellersProductDetailsSlice";
import { useLocation, useNavigate } from "react-router";
import { publishProduct } from "../../Slices/Sellers/publishProductSlice";
import Loader from "../Loader/Loader";
import { deleteProduct } from "../../Slices/Sellers/deleteProductSlice";
import { deleteProductImage } from "../../Slices/Sellers/Image/deleteImageSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellersProductPage = () => {
  const product = useSelector((state) => state.sellersProductsDetails.products);
  const loading = useSelector((state) => state.sellersProductsDetails.loading);
  const error = useSelector((state) => state.sellersProductsDetails.error);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product?.data?.product_images_data?.length > 0) {
      setSelectedImage(product.data.product_images_data[0].image.url || null);
    }
  }, [product]);
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const unique_id = queryParams.get("unique_id");

  const navigate = useNavigate();

  const handlePublish = () => {
    dispatch(publishProduct(unique_id))
      .then(() => {
        // Product successfully deleted
        // Navigate to the success page
        navigate(`/sellersproductsdisplay`);

        toast.success("Product Published successful;", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#007aff",
            color: "white",
          },
        });
      })
      .catch((error) => {
        navigate(`/errorpage?message=Error%20Adding%20this%20Product`);
      });
    console.log("working delete", unique_id);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    dispatch(
      deleteProductImage({ uniqueId: unique_id, productUniqueId: unique_id })
    );
    try {
      const response = await dispatch(deleteProduct(unique_id));
      if (response.type === "product/deleteProduct/fulfilled") {
        navigate(`/sellersproductsdisplay`);
        toast.error("Product Deleted successful;", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#007aff",
            color: "white",
          },
        });
      }

      // Product successfully deleted
      // Navigate to the success page
      // navigate(`/success?message=Product%20successfully%20deleted`);

      console.log("working delete", unique_id);
      console.log("Delete response:", response);
    } catch (error) {
      //  navigate(`/errorpage?message=Delete%20Failed`);
      console.log("Error deleting product:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };
  const handleClick = (unique_id) => {
    navigate(`/editall?unique_id=${unique_id}`);
    console.log("see", unique_id);
  };

  const handleClickDelete = (unique_id) => {
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    dispatch(fetchProducts(unique_id));
  }, [dispatch, unique_id]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {product && product.data && (
        <div>
          {console.log(product.data.quantity)}
          <div className="Product-page-first-div">
            <div className="Product-page-second-div">
              <div className="Product-page-third-div">
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <img
                      className="Product-image-first-image"
                      key={0}
                      src={selectedImage}
                      alt="Selected"
                      style={{
                        marginRight: "10px",
                        marginBottom: "10px",
                        border: "none",
                      }}
                    />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 100px)",
                        gap: "10px",
                      }}
                    >
                      {product?.data?.product_images_data
                        ? product?.data?.product_images_data.map(
                            (data, index) => (
                              <img
                                className="Product-image-first-image"
                                key={index}
                                src={data?.image?.url}
                                alt={`yeah ${index}`}
                                style={{
                                  width: "100%",
                                  height: "100px",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleImageClick(data.image.url)}
                              />
                            )
                          )
                        : null}
                    </div>
                  </div>
                </div>

                <div className="Product-flex-on-web-right">
                  <h3 className="Product-page-h1">
                    <b>{product.data.name}</b>
                  </h3>
                  <p className="Product-page-location">
                    {" "}
                    {product.data.location}
                  </p>
                  {console.log(product.data)}
                  <p
                    style={{
                      marginTop: "1em",
                    }}
                  >
                    Number of Views: {product.data.views}
                  </p>
                  <p className="Product-page-Short-description">
                    Short Description: {product.data.description}
                  </p>

                  {product.data.sales_price === product.data.price ? (
                    <h3
                      style={{
                        display: "flex",
                        gap: "1em",
                      }}
                      className="Product-page-price"
                    >
                      <span>
                        {" "}
                        <span>&#8358;</span>
                        {product.data.price}
                      </span>{" "}
                    </h3>
                  ) : (
                    <h3
                      style={{
                        display: "flex",
                        gap: "1em",
                      }}
                      className="Product-page-price"
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "red",
                        }}
                      >
                        {" "}
                        <span>&#8358;</span>
                        {product.data.price}
                      </span>{" "}
                      <span>&#8358;{product.data.sales_price}</span>
                    </h3>
                  )}

                  <p className="Product-page-remaining">
                    Only{" "}
                    <span className="Product-page-span-remaining">
                      {product.data.remaining} {""}items
                    </span>{" "}
                    remaining Order while stock last.
                  </p>
                  <p
                    style={{
                      marginTop: "1em",
                      marginBottom: "0.6em",
                    }}
                  >
                    Quantity:{product.data.quantity}
                  </p>
                  <p>Sold:{product.data.quantity - product.data.remaining}</p>
                  <div>
                    <div
                      style={{
                        marginTop: "1em",
                        gap: "0.5em",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {product.data.status === 2 ? (
                        <div>
                          <button
                            className="btn-btn-sellers"
                            onClick={handleButtonClick}
                          >
                            Publish
                          </button>

                          {isOpen && (
                            <div
                              style={{
                                zIndex: "999",
                              }}
                              className="modal"
                            >
                              <div className="modal-content">
                                <h3>
                                  Confirm You want to Publish this Product
                                </h3>
                                <p>
                                  Are you sure you want to publish this product?
                                </p>
                                <div className="modal-buttons">
                                  <button
                                    style={{
                                      backgroundColor: "#064bde",
                                    }}
                                    onClick={handlePublish}
                                  >
                                    Publish
                                  </button>
                                  <button onClick={handleCancel}>Cancel</button>
                                </div>{" "}
                              </div>
                            </div>
                          )}
                          <button
                            className="product-page-buy-now-btn"
                            onClick={() => handleClick(unique_id)}
                          >
                            Edit
                          </button>
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {product.data.status === 1 ? (
                        <button
                          className="btn-btn-sellers"
                          onClick={() => handleClick(unique_id)}
                        >
                          Edit
                        </button>
                      ) : null}

                      <button
                        className="btn-btn-div-publish"
                        style={{
                          backgroundColor: "#FF000035",
                          color: "red",
                          border: " 1px solid red",
                        }}
                        onClick={() => handleClickDelete(unique_id)}
                      >
                        Delete
                      </button>

                      {isDeleteModalOpen && (
                        <div
                          style={{
                            zIndex: "999",
                          }}
                          className="modal"
                        >
                          <div className="modal-content">
                            <h3>Confirm Delete</h3>
                            <p>Are you sure you want to delete this product?</p>
                            <div className="modal-buttons">
                              <button onClick={handleDeleteConfirmation}>
                                Delete
                              </button>
                              <button onClick={handleCancelDelete}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="Product-page-product-full-description-div"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellersProductPage;
