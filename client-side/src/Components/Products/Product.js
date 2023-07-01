import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../Slices/cartSlice";
import { useGetAllProductsQuery } from "../../Slices/Products/productAPI";
import Carousels from "../Navbar-and-Footer/Carousel";

import Footer from "../Navbar-and-Footer/Footer";
import Loader from "../Loader/Loader";
import "./Products.css";
import sampleimage from "./images/Frame 212.png";
import sampleproductimage from "./images/Re.png";
import Navbarr from "../Navbar-and-Footer/Navbarr";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
    navigate("/cart");
  };

  const handleClick = (user_unique_id, unique_id) => {
    if (user_unique_id && unique_id) {
      navigate(
        `/product?user_unique_id=${user_unique_id}&unique_id=${unique_id}`
      );
      console.log("see", user_unique_id, unique_id);
    }
  };

  const handleCategoryClick = (category_unique_id) => {
    navigate(`/category?category_unique_id=${category_unique_id}`);
    console.log("cattt", category_unique_id);
  };

  

  const handleLocationCategoriesClick = (
    category_unique_id,
    location_unique_id
  ) => {
    navigate(
      `/category/location?category_unique_id=${category_unique_id}&location_unique_id=${location_unique_id}`
    );
    console.log("lls", category_unique_id, location_unique_id);
  };

  const { data, error, isLoading } = useGetAllProductsQuery();
  console.log(data);
  return (
    <div
      style={{
        backgroundColor: "white",
      }}
    >
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>An error occurred...</p>
      ) : (
        <>
          <Navbarr />
          <div style={{ paddingTop: "2em" }}>
            <Carousels />
          </div>

          <div style={{ marginTop: "6em" }} className="div-style-first">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <h2>Categories</h2>
              <div className="categories-display-div">
                {data?.data?.rows?.slice(0, 8).map((product, index) => (
                  <div
                    className="mapped-categories-display-div"
                    style={{}}
                    key={`${product.id}-${index}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: "0.2em",
                      }}
                      onClick={() =>
                        handleCategoryClick(
                          product.category_data.category_unique_id
                        )
                      }
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img src={sampleimage} alt="sampleimage" width="100%" />
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#00000065", // Adjust the opacity (0.5) to control the darkness
                            transition: "opacity 0.3s", // Add transition for a smooth effect
                            opacity: 1, // Set initial opacity to fully opaque
                          }}
                          hover={{
                            opacity: 0, // Set opacity to 0 on hover to make the overlay transparent
                          }}
                        />
                        <div className="white-div-categories">
                          <p
                            onClick={() =>
                              handleCategoryClick(
                                product.category_data.category_unique_id
                              )
                            }
                            className="p-categories-display-div"
                          >
                            {product.category_data.name}
                          </p>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="cat-btn-more">View All Categories</button>
            </div>
            <div>
              <h2
                style={{
                  marginTop: "4em",
                  textAlign: "center",
                }}
              >
                Featured Products
              </h2>
              <div className="categories-display-div">
                {data?.data?.rows?.map((product, index) => (
                  <div
                    className="products-displayed-home"
                    key={`${product.id}-${index}`}
                  >
                    <div className="products-displayed">
                      <img
                        onClick={() =>
                          handleClick(
                            product.user_data.user_unique_id,
                            product.unique_id
                          )
                        }
                        className=""
                        src={sampleproductimage}
                        alt={product.name}
                        width="100%"
                      />
                    </div>
                    <div
                      className="products-displayed-home-div"
                      onClick={() =>
                        handleClick(
                          product.user_data.user_unique_id,
                          product.unique_id
                        )
                      }
                    >
                      <h4 className="products-displayed-home-h4">
                        {product.name}
                      </h4>

                      {/* <p
                      onClick={() => handleLocationClick(product.location)}
                      className="product-title"
                    >
                      {product.location}
                    </p> */}
                      <p
                        onClick={() =>
                          handleLocationCategoriesClick(
                            product.category_data.category_unique_id,
                            product.location
                          )
                        }
                        className="products-displayed-home-location"
                      >
                        {product.location}
                      </p>

                      <p className="products-displayed-home-price">
                        <b>
                          <span className="naira-price-span">&#8358;</span>
                        </b>
                        {product.price}
                        <span className="naira-price-span">.00</span>
                      </p>
                    </div>
                    <button
                    style={{
                      color:'black'
                    }}
                      className="products-displayed-home-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        
          <Footer />
        </>
      )}
    </div>
  );
};

export default Product;
