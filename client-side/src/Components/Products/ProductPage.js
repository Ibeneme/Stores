import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { productsFetch } from "../../Slices/Products/productSlice";
//import Loader from "../Loader/Loader";
import {
  addItemToCart,
  fetchCartData,
  //updateCartItem,
} from "../../Slices/Cart/CartSlice";
import "./ProductPage.css";
import { MdLocationOn } from "react-icons/md";
import { BiMinus } from "react-icons/bi";
import { RxPlus } from "react-icons/rx";
import {
  addToCart,
  decreaseCart,
  // decreaseCart,
  getTotal,
  removeFromCart,
} from "../../Slices/cartSlice";
import Navbarr from "../Navbar-and-Footer/Navbarr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { addItem } from "../../Slices/CartStorage";
import { addShipping, getShipping } from "../../Slices/Products/Shipping";
import { fetchShippingPrice } from "../../Slices/Shipping/Shipping";
import imagge from "../Cart-and-Checkout/images/Group 36684.png";
import { AiFillShop } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdBroadcastOnHome } from "react-icons/md";

const ProductPage = () => {
  const location = useLocation();
  const shippingPrice = useSelector((state) => state.shipping.shippingPrice);
  const queryParams = new URLSearchParams(location.search);
  const user_unique_id = queryParams.get("user_unique_id");
  const unique_id = queryParams.get("unique_id");
  const price = queryParams.get("price");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shippingID, setShippingID] = useState(0);
  const [counts, setCounts] = useState(0);
  const [data, setCartResponse] = useState(null);
  const [locationn, setLocation] = useState("");
  const [uid, setUniqueID] = useState("");
  const [productName, setName] = useState("");
  const [productPrice, setPrice] = useState("");
  const [productImageUrl, setImageUrl] = useState("");

  const auth = useSelector((state) => state.profile);

  const UUI = auth?.profile?.user_unique_id;
  const cart = useSelector((state) => state.cart);
  console.log(UUI, "cartcart");

  const productUniqueIdToFind = unique_id;

  useEffect(() => {
    const foundItem = cart.cartItems.find(
      (item) => item.product_unique_id === productUniqueIdToFind
    );
    const quantityy = foundItem?.cartQuantity || 0;
    setCounts(quantityy);

    const requestData = {
      product_unique_id: unique_id,
      from_country: "Nigeria",
      from_state: "Rivers",
      to_country: "Nigeria",
      to_state: "Lagos",
      price: price,
    };
    dispatch(addShipping(requestData))
      .then((response) => {
        fetchShippingData();
        console.log(response, "...sjshshhs");
      })
      .catch((error) => {
        console.error(error);
        fetchShippingData();
      });
  }, [dispatch, price, unique_id, auth]);

  const fetchShippingData = async () => {
    try {
      console.log(unique_id, "shippp");
      const response = await dispatch(getShipping({ unique_id }));
      console.log(response, "Response from getShipping thunk");
      console.log(
        response.payload.data.rows[0].shipping_unique_id,
        "shipping_unique_id"
      );
      setShippingID(response.payload.data.rows[0].shipping_unique_id);
    } catch (error) {
      console.error(error, "Error from getShipping thunk");
    }
  };

  const closeModal = () => {
    setShowModal(false);
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

    console.log(details.data.product_images_data[0].image.url, "cartttsdata");

    if (
      details.data.user_data?.user_unique_id === auth.profile?.user_unique_id
    ) {
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
    } else if (
      details.data.user_data?.user_unique_id !== auth.profile?.user_unique_id
    ) {
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

  const popfromCart = ({ id, name }) => {
    if (counts > 0) {
      const dataCart = {
        product_unique_id: id,
        product_name: name,
      };
      dispatch(decreaseCart(dataCart));
      setCounts(counts - 1);
    }
  };

  const GoToCart = () => {
    navigate("/test-cart");
  };

  console.log(auth);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const {
    items: details,
    // status,
    // error,
  } = useSelector((state) => state.productsDetails);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (details?.data?.product_images_data?.length > 0) {
      setSelectedImage(details.data.product_images_data[0].image.url || null);
    }
  }, [details]);
  const box = details?.data;
  console.log(box, "boss");
  const shipping_id = details?.data?.price;
  const Shipping_location = details?.data?.location;
  console.log(Shipping_location);

  useEffect(() => {
    console.log(user_unique_id);
    dispatch(productsFetch({ user_unique_id, unique_id }));
  }, [dispatch, user_unique_id, unique_id]);

  const handleShipping = () => {
    dispatch(
      fetchShippingPrice({
        fromAddress: auth.profile.address,
        toAddress: details?.data?.user_data?.seller_location,
      })
    )
      .then((action) => {
        console.log(action);
        console.log(action.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch]);

  const AddSingleProductToCart = (location, quantityy, name, price) => {
    const shipps = shippingPrice?.data?.price;
    const product_unique_id = unique_id;
    const shipping_unique_id = shippingID;
    const to_address = locationn;
    const quantity = counts;
    const imageUrl = details.data.product_images_data[0].image.url;
    const product_Price = details.data?.price;
    const product_Name = details.data?.name;

    console.log(
      productName,
      shipps,
      productPrice,
      product_unique_id,
      shipping_unique_id,
      quantity,
      imageUrl,
      "imageUrl"
    );
    dispatch(
      addItemToCart({
        product_unique_id,
        shipping_unique_id,
        to_address,
        quantity,
      })
    )
      .then((response) => {
        console.log("Response:", response);
        navigate(
          `/checkout-one?product_unique_id=${product_unique_id}&locationn=${locationn}&shipping_unique_id=${shipping_unique_id}&quantity=${quantity}&productPrice=${product_Price}&productName=${product_Name}&shipps=${shipps}&imageUrl=${imageUrl}`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCartData());
        setCartResponse(response.payload); // Store the response in a variable
      } catch (error) {}
    };

    fetchData();
  }, [dispatch]);

  console.log(data, "dataz");

  const [showModal, setShowModal] = useState(false);

  // const productLocation =
  //   data?.data?.rows?.[0]?.product_data?.location || "Unknown Location";

  // const usersAddress = auth?.userData?.address;

  const handleCheckout = (seller_location) => {
    if (
      details.data.user_data?.user_unique_id === auth.profile?.user_unique_id
    ) {
      console.log(details.data.user_data?.user_unique_id, " jjjjj");
      console.log(auth.profile?.user_unique_id, "jjjjj");

      toast.success("Unable to Buy your own Product", {
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
    } else if (
      details.data.user_data?.user_unique_id !== auth.profile?.user_unique_id
    ) {
      setShowModal(true);
      setLocation(seller_location);
      handleShipping();
      console.log(data);
    } else {
      toast.success("Pls Login To Checkout", {
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
      navigate("/signin");
      // }
    }
  };

  // const calculateCartItemTotal = (cartItem) => {
  //   return cartItem.product_data.price * cartItem.quantity;
  // };

  // const calculateGrandTotal = () => {
  //   if (!data?.data?.rows) return 0;

  //   return data.data.rows.reduce((total, cartItem) => {
  //     return total + calculateCartItemTotal(cartItem);
  //   }, 0);
  // };

  // const grandTotal = calculateGrandTotal();

  return (
    <div>
      <Navbarr />
      {details && details.data && (
        <div>
          <div
            style={{
              marginBottom: "64px",
            }}
            className="Product-page-first-div"
          >
            <div className="Product-page-second-div">
              <div className="Product-page-third-div">
                <div
                  style={{
                    width: "100%",
                  }}
                >
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
                        width: "100%",
                        height: "auto",
                        marginRight: "10px",
                        marginBottom: "10px",
                        border: "none",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        // gridTemplateColumns: "repeat(3, 100px)",
                        gap: "10px",
                        overflow: "auto",
                      }}
                    >
                      {details.data.product_images_data
                        ? details.data.product_images_data.map(
                            (data, index) => (
                              <img
                                className="Product-image-first-image"
                                key={index}
                                src={data.image.url}
                                alt={`lol ${index}`}
                                style={{
                                  width: 100,
                                  height: 100,
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
                    <b>{details.data.name}</b>
                  </h3>
                  <p className="Product-page-location">
                    {" "}
                    <MdLocationOn /> {details.data.location}
                  </p>
                  <p className="Product-page-Short-description">
                    Short Description: {details.data.description}
                  </p>

                  <h3 className="Product-page-price">
                    <span>&#8358;</span>
                    {details.data.price.toLocaleString()}
                  </h3>
                  <p className="Product-page-remaining">
                    Only{" "}
                    <span className="Product-page-span-remaining">
                      {details.data.remaining} {""}items
                    </span>{" "}
                    remaining Order while stock last.
                  </p>
                  <div>
                    <div>
                      <div className="product-page-btns">
                        <div className="product-page-add-and-remove-button-div">
                          <button
                            className="product-page-add-or-remove-btn"
                            onClick={() =>
                              popfromCart({
                                id: details.data.unique_id,
                                // location: details.data.user_data.seller_location,
                                // quantity: details.data.quantity,
                                // price: details.data.price,
                                name: details.data.name,
                                // description: details.data.description,
                                // imageUrl:
                                //   details?.data?.product_images_data[0].image
                                //     ?.url,
                              })
                            }
                          >
                            {console.log(details?.data, " details?.data?")}

                            <BiMinus />
                          </button>

                          <p className="product-page-quantity">{counts}</p>
                          <button
                            onClick={() =>
                              pushToCart({
                                id: details.data.unique_id,
                                location:
                                  details.data.user_data.seller_location,
                                quantity: details.data.quantity,
                                price: details.data.price,
                                name: details.data.name,
                                description: details.data.description,
                                imageUrl:
                                  details?.data?.product_images_data[0].image
                                    ?.url,
                                user_unique_id:
                                  details.data.user_data?.user_unique_id,
                              })
                            }
                            className="product-page-add-or-remove-btn"
                          >
                            <RxPlus /> {/* Fix component name */}
                          </button>
                        </div>
                        <button
                          style={{
                            height: "50px",
                          }}
                          className="product-page-add-to-cart-btn"
                        >
                          {counts > 0 ? (
                            <p
                              onClick={() =>
                                GoToCart({
                                  id: details.data.unique_id,
                                  location:
                                    details.data.user_data.seller_location,
                                  quantity: details.data.quantity,
                                  price: details.data.price,
                                  name: details.data.name,
                                  description: details.data.description,
                                  imageUrl:
                                    details.data.product_images_data[0].image
                                      .url,
                                  user_unique_id:
                                    details.data.user_data?.user_unique_id,
                                })
                              }
                            >
                              View your Cart
                            </p>
                          ) : (
                            <p
                              onClick={() =>
                                pushToCart({
                                  id: details.data.unique_id,
                                  location:
                                    details.data.user_data.seller_location,
                                  quantity: details.data.quantity,
                                  price: details.data.price,
                                  name: details.data.name,
                                  description: details.data.description,
                                  user_unique_id:
                                    details.data.user_data?.user_unique_id,
                                  imageUrl:
                                    details.data.product_images_data[0].image
                                      .url,
                                })
                              }
                            >
                              Add to Cart
                            </p>
                          )}
                        </button>
                      </div>

                      <button
                        style={{
                          height: "50px",
                        }}
                        className="product-page-buy-now-btn"
                        onClick={() =>
                          handleCheckout(
                            details?.data?.user_data?.seller_location
                          )
                        }
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="Product-page-product-full-description-div">
                <h4>Product Description</h4>
                <p className="Product-page-long-description">
                  {details.data.description}: Lorem ipsum dolor sit amet
                  consectetur. Sit neque posuere auctor euismod pharetra
                  pellentesque. Faucibus eu nunc lorem non facilisis. Ipsum
                  ipsum elementum aliquet morbi eget sodales in massa. Metus
                  scelerisque pharetra diam orci pretium non. Etiam ipsum nisl
                  ipsum egestas sed. Lorem ipsum dolor sit amet consectetur. Sit
                  neque posuere auctor euismod pharetra pellentesque. Faucibus
                  eu nunc lorem non facilisis. Ipsum ipsum elementum aliquet
                  morbi eget sodales in massa. Metus scelerisque pharetra diam
                  orci pretium non. Etiam ipsum nisl ipsum egestas sed.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3em",
                }}
              >
                <p>Seller</p>
                <img
                  alt="alt"
                  width="33em"
                  src={details.data.user_data.photo}
                />
                <h4>
                  {details.data.user_data.firstname}
                  {""} {details.data.user_data.lastname}
                  {""} {details.data.user_data.middlename}
                </h4>
                <p>{details.data.user_data.email}</p>
                <p>{details.data.user_data.phone_number}</p>
              </div>
              <div className="Product-page-product-full-description-div">
                <h4>More Items Like this</h4>
                <p className="Product-page-long-description">View More items</p>
              </div>
              {showModal && (
                <div
                  style={{
                    zIndex: "999",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  onClick={closeModal}
                  className="modal"
                >
                  <div
                    className="modal-content"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      justifyItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <img
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        src={imagge}
                        width="170px"
                        alt="loll"
                      />
                    </div>
                    <h2>Calculating Fare</h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "0.5em",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          fontSize: "0.7em",
                          color: "gray",
                        }}
                      >
                        <AiFillShop
                          style={{ fontSize: "2.4em", color: "#064BDE" }}
                        />
                        Vendor
                      </span>
                      <span
                        style={{
                          marginTop: "-0.6em",
                          marginLeft: "0.6em",
                          marginRight: "1em",
                          width: "6em",
                          color: "gray",
                          borderBottom: "3px solid gray",
                        }}
                      >
                        {""}
                      </span>
                      <span>
                        <TbTruckDelivery
                          style={{ fontSize: "2em", color: "#064BDE" }}
                        />
                      </span>
                      <span
                        style={{
                          marginTop: "-0.6em",
                          marginLeft: "1em",
                          marginRight: "1em",
                          width: "6em",
                          color: "gray",
                          borderBottom: "3px solid gray",
                        }}
                      >
                        {""}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          fontSize: "0.7em",
                          color: "gray",
                        }}
                      >
                        <MdBroadcastOnHome
                          style={{ fontSize: "2.4em", color: "#064BDE" }}
                        />
                        you
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: "0.65em",
                        color: "gray",
                        display: "flex",
                        justifyContent: "space-between", // Added property for justifying content
                        width: "100%",
                        borderLeft: "3px solid #064BDE50",
                        borderRight: "3px solid #FF7F5850",
                        padding: "1.4em 1em",
                        marginTop: "1em",
                        marginBottom: "1em",
                      }}
                    >
                      <p
                        style={{
                          marginRight: "auto",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {auth?.profile?.address}
                      </p>

                      <p
                        style={{
                          marginLeft: "auto",
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        {details?.data?.user_data?.seller_location}
                      </p>
                    </div>
                    <h2>
                      <span>&#8358;</span> {shippingPrice?.data?.price}
                    </h2>
                    <button
                      style={{
                        backgroundColor: "#064BDE",
                        color: "white",
                        width: "100%",
                        padding: "1em 0.3em",
                        border: "none",
                        marginTop: "1em",
                        height: "50px",
                        fontSize: "16px",
                      }}
                      onClick={() => {
                        AddSingleProductToCart({
                          location: details.data.user_data.seller_location,
                          quantity: details.data.quantity,
                          price: details.data.price,
                          name: details.data.name,
                        });
                      }}
                    >
                      Accept Fare
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
