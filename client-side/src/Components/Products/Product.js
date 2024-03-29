import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../../Slices/Products/productAPI";
import Carousels from "../Navbar-and-Footer/Carousel";
import Loader from "../Loader/Loader";
import "./Products.css";
import sampleimage from "./images/Frame 212.png";
import { addItemToCart } from "../../Slices/Cart/CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../Slices/cartSlice";
import logo from "../../Components/Cart-and-Checkout/images/5购物渐变扁平矢量人物插画2420220903果冻_画板 1.png";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [counts, setCounts] = useState(0);
  const [imageUrls, setImageUrl] = useState("");
  const auth = useSelector((state) => state.profile);

  const [locationn, setLocation] = useState("");
  const [shippingID, setShippingID] = useState(0);
  const [uid, setUniqueID] = useState("");
  const [productName, setName] = useState("");
  const [productPrice, setPrice] = useState("");

  const UUI = auth?.profile?.user_unique_id;

  const {
    items: details,
    // status,
    // error,
  } = useSelector((state) => state.productsDetails);

  console.log(details.data, "cartttsdata");

  const pushToCarts = (product) => {
    // setImageUrl(imageUrl);

    // const data = {
    //   product_unique_id: product?.product_unique_id,
    //   // shipping_unique_id: shippingID,
    //   to_address: product?.location,
    //   quantity: product?.quantity,
    // };

    const dataCart = {
      product_unique_id: product?.product_unique_id,
      //shipping_unique_id: shippingID,
      to_address: product?.location,
      quantity: product?.quantity,
      price: product?.price,
      product_name: product?.name,
      product_description: product?.description,
      imageUrl: `${product?.product_images_data[0]?.image?.url}`,
      my_unique_id: UUI ? UUI : null,
      user_unique_id: product?.user_unique_id,
    };

    console.log(
      product?.product_images_data[0]?.image?.url,
      "imageUrlcartttsdata"
    );

    if (auth.profile) {
      if (product?.user_unique_id === auth.profile?.user_unique_id) {
        toast.success("Unable to add own product to cart!", {
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
      } else if (product?.user_unique_id !== auth.profile?.user_unique_id) {
        dispatch(addToCart(dataCart));
        setCounts(counts + 1);
        handleAddThisToCart();
        navigate("/test-cart");
      } else {
        toast.success("Whoops an Error occured", {
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
    } else {
      dispatch(addToCart(dataCart));
      setCounts(counts + 1);
      navigate("/test-cart");
    }
  };

  const pushToCart = ({
    id,
    location,
    quantity,
    price,
    name,
    description,
    imageUrl,
    user_unique_id,
  }) => {
    setName(name);
    setPrice(price);
    setLocation(location);
    setImageUrl(imageUrl);
    const data = {
      product_unique_id: id,
      shipping_unique_id: shippingID,
      to_address: location,
      quantity: quantity,
    };
    console.log(user_unique_id, "imageUrll");
    console.log(data.product_unique_id, "hhhhh");
    setUniqueID(data.product_unique_id);
    const dataCart = {
      product_unique_id: id,
      shipping_unique_id: shippingID,
      to_address: location,
      quantity: quantity,
      price: price,
      product_name: name,
      product_description: description,
      imageUrl: `${imageUrl}`,
      my_unique_id: UUI,
      user_unique_id: user_unique_id,
    };

    console.log(imageUrl, "cartttsdata");

    if (user_unique_id === auth.profile?.user_unique_id) {
      toast.success("Unable to add own product to cart!", {
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
    } else if (user_unique_id !== auth.profile?.user_unique_id) {
      dispatch(addToCart(dataCart));
      setCounts(counts + 1);
    } else {
      toast.success("Whoops an Error occured", {
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
  };

  console.log(auth);

  const handleAddThisToCart = async (product) => {
    const itemData = {
      product_unique_id: product?.unique_id,
      to_address: product?.location,
      quantity: 1,
    };

    try {
      const response = await dispatch(addItemToCart(itemData));
      console.log("Item added to cart:", response.payload);
      if (response.payload.message === "Unable to add to cart, add address") {
        toast.error(response.payload.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "red", // Background color
            color: "white", // Text color
          },
        });

        navigate("/editdelivery");
      } else if (response.payload.message === "Cart added successfully!") {
        toast.success(response.payload.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#007aff", // Background color
            color: "white", // Text color
          },
        });
      } else if (response.payload.message === "No token provided!") {
        toast.success("Please login to add to Cart", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#007aff", // Background color
            color: "white", // Text color
          },
        });
        navigate("/signin");
      } else if (
        response.payload.message === "Unable to add own product to cart!"
      ) {
        toast.success("Unable to add your own product to cart!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#007aff", // Background color
            color: "white", // Text color
          },
        });
      }
    } catch (error) {
      console.log("Error adding item to cart:", error);
      toast.error(error.payload.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "red", // Background color
          color: "white", // Text color
        },
      });
    }
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

  console.log(
    imageUrls,
    locationn,
    setShippingID,
    uid,
    productName,
    productPrice,
    pushToCarts
  );

  return (
    <div
      style={{
        backgroundColor: "white",
      }}
    >
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // marginBottom: 64,
              marginTop: 48,
            }}
          >
            <div className="no-product">
              <h2
                style={{
                  marginTop: 12,
                  marginBottom: 12,
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                Whoopss Error loading.... No Products found
              </h2>

              <p>No products found</p>
              <br />
              <br />
              <img src={logo} alt="logo" />
              <br />
              <button
                style={{
                  width: "200px",
                  height: "3.8em",
                  borderRadius: "0.4em",
                  border: "none",
                  backgroundColor: "#386AEB",
                  color: "white",

                  fontSize: "1em",
                }}
                onClick={() => navigate("/")}
              >
                Start shopping
              </button>
              <br />
            </div>
          </div>
        </div>
      ) : (
        <>
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
                    <div
                      className="products-displayed"
                      onClick={() =>
                        handleClick(
                          product?.user_data?.user_unique_id,
                          product.unique_id
                        )
                      }
                    >
                      {product.product_images_data &&
                        product.product_images_data[0] && (
                          <img
                            key={0}
                            src={product.product_images_data[0]?.image?.url}
                            alt="orders"
                            width="100%"
                            height="180px"
                          />
                        )}
                    </div>
                    {}
                    <div
                      className="products-displayed-home-div"
                      onClick={() =>
                        handleClick(
                          product?.user_data?.user_unique_id,
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
                        {product?.price.toLocaleString()}
                        <span className="naira-price-span">.00</span>
                      </p>
                    </div>
                    <button
                      style={{
                        color: "black",
                      }}
                      className="products-displayed-home-btn"
                      onClick={() =>
                        pushToCart({
                          id: product.unique_id,
                          location: product.location,
                          quantity: product.quantity,
                          price: product.price,
                          name: product.name,
                          description: product.description,
                          my_unique_id: UUI,
                          user_unique_id: product?.user_data?.user_unique_id,
                          imageUrl: product?.product_images_data[0]?.image?.url,
                        })
                      }

                      // onClick={() => pushToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
