import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../Slices/Sellers/SellersProductDetailsSlice";
import { useLocation, useNavigate } from "react-router";
import { publishProduct } from "../../Slices/Sellers/publishProductSlice";
import sample from "../Products/images/Rectangle 15.png";
import Loader from "../Loader/Loader";

const SellersProductPage = () => {
  const product = useSelector((state) => state.sellersProductsDetails.products);
  const loading = useSelector((state) => state.sellersProductsDetails.loading);
  const error = useSelector((state) => state.sellersProductsDetails.error);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const unique_id = queryParams.get("unique_id");

  const navigate = useNavigate();
  const handlePublish = () => {
    dispatch(publishProduct(unique_id));
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleDeleteConfirmation = () => {
    setDeleteModalOpen(false);
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
    console.log("del", unique_id);
  };

  // const handleClickDelete = (unique_id) => {
  //   navigate(`/deleteproduct?unique_id=${unique_id}`);
  //   console.log("del", unique_id);
  // };

  useEffect(() => {
    dispatch(fetchProducts(unique_id));
  }, [dispatch]);

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
                  <img
                    src={sample}
                    alt="im"
                    className="Product-image-first-image"
                  />
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
                            <div className="modal">
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
                                    backgroundColor:'#064bde'
                                  }}
                                  onClick={handlePublish}>
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
                        <div className="modal">
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
