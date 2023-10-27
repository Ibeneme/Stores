import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  // clearCart,
  getTotal,
  clearCart,
} from "../../../Slices/cartSlice";
//
import { useEffect, useState } from "react";
import { BiMinus } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
//import { RxPlus } from "react-icons/rx";
import "react-toastify/dist/ReactToastify.css";
//import Loader from "../../Loader/Loader";
import { productsFetch } from "../../../Slices/Products/productSlice";
import logo from "../images/5购物渐变扁平矢量人物插画2420220903果冻_画板 1.png";
// import { AiFillShop } from "react-icons/ai";
// import { TbTruckDelivery } from "react-icons/tb";
// import { MdBroadcastOnHome } from "react-icons/md";
// import imagge from "../images/Group 36684.png";
import {
  addMultipleItemsToCart,
  // deleteCartItem,
  fetchCartData,
} from "../../../Slices/Cart/CartSlice";
import { userProfile } from "../../../Slices/userSlice";

const Cartsss = (cartItem) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const stateProfile = useSelector((state) => state.userProfile);
  useEffect(() => {
    // Dispatch the action to fetch the user profile when the component mounts
    dispatch(userProfile());
  }, [dispatch]); // Make sure to include dispatch as a dependency

  // const handleCheckout = () => {
  //   setShowModal(true);
  //   // handleShipping();
  //   //console.log(data);
  // };
  // const closeModal = () => {
  //   setShowModal(false);
  // };

  console.log(stateProfile, "stateProfile");
  const {
    items: details,
    //status,
    // error,
  } = useSelector((state) => state.productsDetails);

  const cartData = useSelector((state) => state.cartData);
  const loginUserCart = cartData?.data?.data?.rows;

  useEffect(() => {
    dispatch(fetchCartData())
      .then((response) => {
        const cartItems = response?.payload?.data?.rows;
        console.log("cartData:", cartItems);

        // Check if cartItems is not null or undefined before adding to localStorage
        if (cartItems) {
          // localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [dispatch]);

  //console.log(loginUserCart, "loginUserCart");
  const queryParams = new URLSearchParams(location.search);
  const user_unique_id = queryParams.get("user_unique_id");
  // const unique_id = queryParams.get("unique_id");
  const price = queryParams.get("price");
  const [data, setCartResponse] = useState(null);

  console.log(price, setShowModal, showModal);
  useEffect(() => {
    dispatch(productsFetch({ user_unique_id }));
  }, [dispatch, auth, user_unique_id]);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCartData());
        console.log(response.data, "setCartResponse");
        setCartResponse(response.payload);
      } catch (error) {}
    };

    fetchData();
  }, [dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    // const unique_id = "ftyyTlau66zawnYKZa8T";
    // if (auth?.token) {
    //   if (data?.data?.rows && data?.data?.rows.length > 0) {
    //     console.log("Found data:", data);
    //     for (const item of data) {
    //       if (item.product_data.product_unique_id === "slLRsyJYNSdjaHE8n7Uo") {
    //         console.log("Found Item:", item);
    //         return;
    //       }
    //     }
    //     console.log("Item not found in the cart.");
    //   } else {
    //     console.log("Cart is empty.");
    //   }

    //   dispatch(deleteCartItem(unique_id))
    //     .then((response) => {
    //     dispatch(removeFromCart(cartItem));
    //       console.log("Response:", response);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // } else {
    // }
    dispatch(removeFromCart(cartItem));
  };

  const decreaseInCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const increaseInCart = (cartItem) => {
    dispatch(addToCart(cartItem));
    console.log(cartItem, "carttt");
    console.log(details, "carttt");
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const cartt = useSelector((state) => state.cart);

  console.log(
    cartt,
    "cartt",
    loginUserCart,
    cartTotalQuantity,
    totalPrice,
    addMultipleItemsToCart
  );
  useEffect(() => {
    let newTotalPrice = 0;

    for (const cartItem of cart.cartItems) {
      const itemPrice = cartItem.price;
      const itemQuantity =
        cartItem.quantity >= cartItem.cartQuantity
          ? cartItem.cartQuantity
          : cartItem.product_data?.quantity;

      newTotalPrice += itemPrice * itemQuantity;
    }

    setTotalPrice(newTotalPrice);
  }, [cart.cartItems]);

  // const AddMultipleItemsToCart = ({
  //   product_unique_id,
  //   shipping_unique_id,
  //   to_address,
  //   quantity,
  // }) => {
  //   console.log(
  //     product_unique_id,
  //     shipping_unique_id,
  //     to_address,
  //     quantity,
  //     "cartItem.product_name"
  //   );
  //   const carts = [
  //     {
  //       product_unique_id: product_unique_id,
  //       shipping_unique_id: shipping_unique_id,
  //       to_address: to_address,
  //       quantity: quantity,
  //     },
  //   ];

  //   console.log(product_unique_id, "");
  //   dispatch(addMultipleItemsToCart(carts))
  //     .then((response) => {
  //       console.log("Response:", response);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  //let items = cart.cartItems;

  const [cartItems, setCarts] = useState([]);
  console.log("dddd:", data, setCarts, cartItems);
  // const [itemsFromEndpoint] = useState([{ items }]);

  // const AddMultipleItemsToCarts = (cartItem) => {
  //   setCarts([...cartItems, cartItem]);
  //   const extractedData = items.map((item) => ({
  //     product_unique_id:
  //       item.product_unique_id || item.product_data.product_unique_id,
  //     to_address: item.to_address,
  //     quantity: item.cartQuantity,
  //     shipping_unique_id: item.shipping_unique_id,
  //   }));
  //   dispatch(addMultipleItemsToCart(extractedData))
  //     .then((response) => {
  //       console.log("Response:", response);
  //       navigate("/checkout");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  //   console.log(extractedData, "extractedData");
  // };

  // const addToCartFromEndpoint = () => {
  //   itemsFromEndpoint.forEach((cartItem) => {
  //     AddMultipleItemsToCarts(cartItem);
  //   });
  // };

  // const combinedCartItems = [
  //   ...cart.cartItems,
  //   ...(Array.isArray(loginUserCart) ? loginUserCart : []),
  // ];
  // console.log(cartItems, "combinedCartItems");

  return (
    <div>
      <div
        style={{
          marginTop: "7em",
        }}
      >
        {cartt.cartItems?.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 64,
              marginTop: -48,
            }}
          >
            <div className="no-product">
              <p>Your Cart is currently empty</p>
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
        ) : (
          <div className="spread">
            <div>
              {cartt.cartItems?.map((cartItem) => {
                return (
                  <div>
                    <div className="cart-first-div" key={cartItem.id}>
                      <div className="div-cart-first-div">
                        <img
                          className="img-cart-first-div"
                          src={cartItem.imageUrl}
                          alt="cartitem"
                        />
                      </div>
                      <div
                        style={{
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginRight: "2em",
                            alignItems: "baseline",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <h3
                              style={{
                                fontSize: "14px",
                              }}
                              className="Product-page-h1"
                            >
                              {cartItem.product_name
                                ? cartItem.product_name
                                : cartItem?.product_data?.name}
                            </h3>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "baseline",
                                gap: "2.8em",
                              }}
                            >
                              <h3
                                style={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  color: "gray",
                                  marginTop: "0.3em",
                                }}
                              >
                                {" "}
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "gray",
                                  }}
                                >
                                  {" "}
                                  Total Price:{" "}
                                </span>{" "}
                                <span
                                  style={{
                                    fontSize: "14px",
                                  }}
                                >
                                  {" "}
                                  <span>&#8358;</span>
                                  {cartItem.price
                                    ? (
                                        cartItem.price * cartItem.cartQuantity
                                      ).toLocaleString()
                                    : (
                                        cartItem.product_data.price *
                                        cartItem.quantity
                                      ).toLocaleString()}{" "}
                                </span>
                              </h3>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                alignItems: "baseline",
                                color: "black",
                              }}
                            >
                              <div
                                style={{
                                  margin: "1em 0",
                                }}
                                className="product-page-add-and-remove-button-div"
                              >
                                <button
                                  className="product-page-add-or-remove-btn"
                                  onClick={() => decreaseInCart(cartItem)}
                                >
                                  <BiMinus />
                                </button>
                                <h4 className="product-page-quantity">
                                  {cartItem.quantity >= cartItem.cartQuantity ||
                                  cartItem.quantity >=
                                    cartItem.product_data.quantity
                                    ? cartItem.cartQuantity
                                    : cartItem.quantity}
                                </h4>

                                <button
                                  className="product-page-add-or-remove-btn"
                                  onClick={() => increaseInCart(cartItem)}
                                >
                                  <MdAdd />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              alignItems: "end",
                              height: 48,
                              marginLeft: "1.4em",
                              justifyContent: "flex-end",
                            }}
                          >
                            <button
                              style={{
                                backgroundColor: "white",
                                border: "gray 1px solid",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "0.3em",
                                borderRadius: "2em",
                                width: "2.4em",
                                height: "2.4em",
                                marginLeft: "1.4em",
                              }}
                              onClick={() => handleRemoveFromCart(cartItem)}
                            >
                              <span
                                style={{
                                  fontSize: "1.3em",
                                  marginTop: "0.1em",
                                }}
                              >
                                <RiDeleteBin6Line />{" "}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="last-checkout-div">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>Cart Summary</h3>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "900",
                    color: "#666",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </p>
              </div>
              <br />
              {stateProfile?.data?.address ? (
                <div
                  style={{
                    border: "1px solid #66666635",
                    padding: "16px",
                    borderRadius: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "12px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "15px",
                          fontWeight: "900",
                          color: "#666",
                        }}
                      >
                        {" "}
                        Delivery Address
                      </p>
                    </div>
                  </div>

                  {stateProfile?.data?.address ? (
                    <span>
                      {" "}
                      <p
                        style={{
                          fontSize: "13px",
                          marginTop: "7px",
                          marginBottom: "12px",
                        }}
                      >
                        {" "}
                        {stateProfile?.data?.address}{" "}
                      </p>
                      {/* <button>Send to another Address</button> */}
                    </span>
                  ) : (
                    <p
                      style={{
                        fontSize: "14px",
                      }}
                    ></p>
                  )}

                  {stateProfile?.data?.address ? (
                    <p
                      style={{
                        // backgroundColor: "#064BDE16",
                        color: "#064BDE",
                        //   padding: "6px 12px",
                        //   borderRadius: "152px",
                        fontSize: "14px",
                        fontWeight: 900,
                        width: "fit-content",
                        textAlign: "center",
                        height: "31px",
                        marginBottom: -12,
                        marginTop: 24,
                      }}
                      onClick={() => navigate("/deliverydetails")}
                    >
                      Edit Address{" "}
                    </p>
                  ) : (
                    <p
                      style={{
                        backgroundColor: "#064BDE16",
                        color: "#064BDE",
                        padding: "6px 12px",
                        borderRadius: "152px",
                        fontSize: "14px",
                      }}
                      onClick={() => navigate("/profile")}
                    >
                      Add an Address
                    </p>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    borderLeft: "6px solid #386AEB",
                    padding: "16px",

                    backgroundColor: "#386AEB18",
                  }}
                >
                  <h5
                    style={{
                      color: "#064BDE",
                    }}
                  >
                    {stateProfile?.data?.address
                      ? "Set Up your delivery address to Checkout"
                      : "Sign up to Checkout"}
                  </h5>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "0.03em solid #66666635",
                  paddingTop: " 01.2em",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h4>Cart Total </h4>
                  <p
                    className="product-title"
                    style={{
                      color: "gray",
                    }}
                  >
                    Delivery fees not included yet
                  </p>
                </div>
                <h3>
                  <span>&#8358;</span>
                  {cart.cartTotalAmount.toLocaleString()}

                  <span>.00</span>
                </h3>
              </div>
              <br /> <br />
              {auth.token ? (
                stateProfile?.data?.address ? (
                  <div>
                    <button
                      style={{
                        fontSize: "1em",
                      }}
                      className="checkout-btn"
                      // onClick={() => {
                      //   console.log(
                      //     cartItem.product_unique_id,
                      //     " cart.cartItem.product_unique_id"
                      //   );
                      //   AddMultipleItemsToCart({
                      //     product_unique_id: cartItem.product_unique_id,
                      //     shipping_unique_id: cartItem.shipping_unique_id,
                      //     to_address: cartItem.to_address,
                      //     quantity: cartItem.cartQuantity,
                      //   });
                      // }}

                      //onClick={addToCartFromEndpoint}
                      onClick={() => navigate("/checkout")}
                    >
                      Checkout
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      style={{
                        fontSize: "1em",
                      }}
                      className="checkout-btn"
                      // onClick={() => {
                      //   console.log(
                      //     cartItem.product_unique_id,
                      //     " cart.cartItem.product_unique_id"
                      //   );
                      //   AddMultipleItemsToCart({
                      //     product_unique_id: cartItem.product_unique_id,
                      //     shipping_unique_id: cartItem.shipping_unique_id,
                      //     to_address: cartItem.to_address,
                      //     quantity: cartItem.cartQuantity,
                      //   });
                      // }}

                      //onClick={addToCartFromEndpoint}
                      onClick={() => navigate("/deliverydetails")}
                    >
                      Set up Address
                    </button>
                  </div>
                )
              ) : null}
              {!auth.token ? (
                <div>
                  <button
                    style={{
                      fontSize: "1em",
                    }}
                    className="checkout-btn"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up to Checkout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cartsss;
