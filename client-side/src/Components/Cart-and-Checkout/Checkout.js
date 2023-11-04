import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../Products/ProductPage.css";
import "./Cart.css";
import "./Checkout.css";
//import cartItemimage from "../Products/images/Rectangle 15.png";
import Navbarr from "../Navbar-and-Footer/Navbarr";
import {
  addMultipleItemsToCart,
  fetchCartData,
} from "../../Slices/Cart/CartSlice";
//import { fetchShippingPrice } from "../../Slices/Shipping/Shipping";
import { checkoutMultipleProducts } from "../../Slices/orders/OrderSlice";
import { payOrder } from "../../Slices/orders/OrderSlice";
//import { toast } from "react-toastify";
//import { usePaystackPayment } from "react-paystack";
import { getTotal } from "../../Slices/cartSlice";

import { productsFetch } from "../../Slices/Products/productSlice";
//import { addToCart, getTotal, removeFromCart } from "../../Slices/cartSlice";
// import { BiMinus } from "react-icons/bi";
// import { MdAdd, MdDelete } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const [cartUniqueIds, setCartUniqueIds] = useState([]);
  const [newLocation, setLocation] = useState("");

  const [cartRes, setCartResponse] = useState([null]);
  const [shipPrice, setShipPrice] = useState(null);
  const [thisError, setError] = useState(null);
  // const usersAddress = auth?.userData?.address;
  const shippingPrice = useSelector((state) => state.shipping.shippingPrice);
  console.log(shippingPrice, "authhh");
  const data = useSelector((state) => state.carts);

  const [totalPrice, setTotalPrice] = useState(0);
  // const { cartTotalQuantity } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const cartt = useSelector((state) => state.cart);
  const queryParams = new URLSearchParams(location.search);
  const user_unique_id = queryParams.get("user_unique_id");
  const unique_id = queryParams.get("unique_id");
  // const price = queryParams.get("price");
  const [datas, setCartResponses] = useState(null);

  console.log(
    data,
    datas,
    thisError,
    showModal,
    cartUniqueIds,
    setShowModal,
    setCartResponse,
    setLocation,
    totalPrice,
    setShipPrice,
    "nana"
  );
  // const handleCheckout = () => {
  //   setShowModal(true);
  //   // handleShipping();
  //   //console.log(data);
  // };
  // const closeModal = () => {
  //   setShowModal(false);
  // };

  // const {
  //   items: details,
  //   // status,
  //   // error,
  // } = useSelector((state) => state.productsDetails);

  // const cartData = useSelector((state) => state.cartData);

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

  useEffect(() => {
    dispatch(productsFetch({ user_unique_id, unique_id }));
  }, [dispatch, auth, user_unique_id, unique_id]);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCartData());
        console.log(response.data, "setCartResponses");
        setCartResponses(response.payload);
      } catch (error) {}
    };

    fetchData();
  }, [dispatch]);

  console.log("dddd:", data);

  // const handleRemoveFromCart = (cartItem) => {
  //   dispatch(removeFromCart(cartItem));
  // };

  // const decreaseInCart = (cartItem) => {
  //   dispatch(decreaseInCart(cartItem));
  // };
  // const increaseInCart = (cartItem) => {
  //   dispatch(addToCart(cartItem));
  //   console.log(cartItem, "carttt");
  //   console.log(details, "carttt");
  // };

  // const config = {
  //   reference: new Date().getTime().toString(),
  //   email: "user@example.com",
  //   amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  //   publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx",
  // };

  // you can call this function anything
  // const onSuccess = (reference) => {
  //   // Implementation for whatever you want to do with reference and after success call.
  //   console.log(reference);
  // };

  // // you can call this function anything
  // const onClose = () => {
  //   // navigate("/orderr");
  //   console.log("closed");
  // };
  // const handlePayment = () => {
  //   initializePayment(); // Call the initializePayment function to trigger the payment
  // };

  //const initializePayment = usePaystackPayment(config);
  // const PaystackHookExample = () => {

  //   const initializePayment = usePaystackPayment(config);
  //   return (
  //     <div>
  //       <button
  //         onClick={() => {
  //           initializePayment(onSuccess, onClose);
  //         }}
  //       >
  //         Paystack Hooks Implementation
  //       </button>
  //     </div>
  //   );
  // };
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

  let items = cart.cartItems;

  const [cartItems, setCarts] = useState([]);
  const [itemsFromEndpoint] = useState([{ items }]);

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
  //       console.log("extractedDataCart:", response);
  //       dispatch(fetchCartData())
  //         .then((response) => {
  //           const data = response?.payload?.data.rows;
  //           console.log("cartUniqueIds", data);
  //           const cartUniqueIds = data.map((item) => item.cart_unique_id);
  //           console.log(cartUniqueIds, "extractedDatacartUniqueIdsd");
  //           setCartUniqueIds(cartUniqueIds);

  //           if (selectedOption) {
  //             const payment_method = selectedOption;
  //             const response = await dispatch(
  //               checkoutMultipleProducts({
  //                 cart_unique_ids: cartUniqueIds,
  //                 payment_method,
  //               })
  //             );
  //             if (response.payload.success === true) {
  //               const tracking_number = response?.payload?.data?.tracking_number;
  //               console.log(tracking_number, "trststtsac");
  //               try {
  //                 initializePayment();
  //                 onClose();
  //                 const response = await dispatch(payOrder(tracking_number));
  //                 console.log("Response:", response); // Log the response
  //                 // Handle success or navigate to a different page
  //               } catch (error) {
  //                 // Handle error
  //               }
  //             }
  //             console.log("Checkout response:", response);
  //           } else {
  //             setError("Please select a payment method.");
  //             console.log("Please select a payment method.");
  //           }

  //         })
  //         .catch((error) => {
  //           console.error("Error:", error);
  //         });
  //       //navigate("/checkout");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  //   console.log(extractedData, "extractedData");
  // };

  // const [selectedOptionError, setSelectedOptionError] = useState("");
  const [selectedOptionDisable, setSelectedOptionDisable] = useState(false);

  const AddMultipleItemsToCarts = async (cartItem) => {
    if (!selectedOption) {
      console.log("selectedOption");
      // setSelectedOptionError("Select a Payment Method");
      setSelectedOptionDisable(false);
      return;
    }

    setSelectedOptionDisable(true);
    setCarts([...cartItems, cartItem]);

    const extractedData = items.map((item) => ({
      product_unique_id:
        item.product_unique_id || item.product_data.product_unique_id,
      to_address: item.to_address,
      quantity: item.cartQuantity,
      shipping_unique_id: item.shipping_unique_id,
    }));

    try {
      const addToCartResponse = await dispatch(
        addMultipleItemsToCart(extractedData)
      );
      console.log("extractedDataCart:", addToCartResponse);
      const fetchCartResponse = await dispatch(fetchCartData());
      const data = fetchCartResponse?.payload?.data.rows;
      //console.log("cartUniqueIds", data);
      const cartUniqueIds = data.map((item) => item.cart_unique_id);
      //console.log(cartUniqueIds, "extractedDatacartUniqueIdsd");
      setCartUniqueIds(cartUniqueIds);

      const payment_method = selectedOption;

      try {
        const checkoutResponse = await dispatch(
          checkoutMultipleProducts({
            cart_unique_ids: cartUniqueIds,
            payment_method,
          })
        );

        console.log(checkoutResponse, "extractedDatacheckoutResponse");
        if (checkoutResponse?.payload?.success === true) {
          //navigate("/orderr");
          const tracking_number =
            checkoutResponse?.payload?.data?.tracking_number;
          console.log(tracking_number, "trststtsac");

          try {
            const payOrderResponse = await dispatch(payOrder(tracking_number));
            console.log("Responsetracking_number:", payOrderResponse);

            if (payOrderResponse?.type === "orders/payOrder/fulfilled") {
              navigate("/orderr");
            }
          } catch (error) {}
        }

        console.log("Checkout response:", checkoutResponse);
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    console.log(extractedData, "extractedData");
  };

  const addToCartFromEndpoint = () => {
    itemsFromEndpoint.forEach((cartItem) => {
      AddMultipleItemsToCarts(cartItem);
    });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setError("");
    console.log(`Selected option: ${event.target.value}`);
  };

  // const cart_unique_ids = data?.data?.rows?.map((item) => item.cart_unique_id);
  // console.log(cart_unique_ids, "cccc");

  // console.log(selectedOption, "selectedNannn");

  // const handleCheckouts = async () => {
  //   try {
  //     if (selectedOption) {
  //       const payment_method = selectedOption;
  //       const response = dispatch(
  //         checkoutMultipleProducts({
  //           cart_unique_ids: cartUniqueIds,
  //           payment_method,
  //         })
  //       );
  //       console.log(response, "trststtsac");
  //       if (response.payload.success === true) {
  //         const tracking_number = response?.payload?.data?.tracking_number;
  //         console.log(tracking_number, "trststtsac");
  //         try {
  //           initializePayment();
  //           onClose();
  //           const response = await dispatch(payOrder(tracking_number));
  //           console.log("Response:", response); // Log the response
  //           // Handle success or navigate to a different page
  //         } catch (error) {
  //           // Handle error
  //         }
  //       }
  //       console.log("Checkout response:", response);
  //     } else {
  //       // setError("Please select a payment method.");
  //       console.log("Please select a payment method.");
  //     }
  //   } catch (error) {
  //     console.error("Error during checkout:", error);
  //     console.log(error);
  //     // Handle the error here
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await dispatch(fetchCartData());
  //       console.log(response.data, "setCartResponse");
  //       setCartResponse(response.payload);
  //       const data = response?.payload?.data.rows;
  //       console.log("cartUniqueIds", data);
  //       const cartUniqueIds = data.map((item) => item.cart_unique_id);
  //       console.log(cartUniqueIds, "cartUniqueIds");

  //       setCartUniqueIds(cartUniqueIds);
  //     } catch (error) {}
  //   };

  //   fetchData();
  // }, [dispatch]);

  // console.log("dddddata:", cartUniqueIds);

  // useEffect(() => {
  //   dispatch(fetchCartData())
  //     .then((response) => {
  //       console.log(response, "resss");
  //       if (response?.payload?.data?.rows) {
  //         const newCartUniqueIds = response.payload.data.rows.map(
  //           (item) => item.cart_unique_id
  //         );
  //         setCartUniqueIds(newCartUniqueIds);
  //         console.log(newCartUniqueIds, "cart_unique_ids");

  //         const newLocation =
  //           response.payload.data.rows[0].product_data.location;

  //         setLocation(newLocation);
  //         console.log(newLocation, "newLocation");

  //         // Nested useEffect for handling shipping after cart data is fetched
  //         const handleShipping = () => {
  //           console.log(
  //             response?.data?.rows?.[0].product_data.location,
  //             "response?.data?.rows?.[0].product_data.location"
  //           );

  //           dispatch(
  //             fetchShippingPrice({
  //               fromAddress: newLocation,
  //               toAddress: usersAddress,
  //             })
  //           )
  //             .then((action) => {
  //               console.log("Shipping price action:", action);
  //               console.log("Shipping price payload:", action.payload);
  //               console.log("Shipping response data:", action.payload?.data);
  //               setShipPrice(action.payload?.data?.price);
  //             })
  //             .catch((error) => {
  //               console.log("Error fetching shipping price:", error);
  //             });
  //         };

  //         handleShipping();
  //       } else if (response?.payload?.message === "All Carts not found!") {
  //         toast.success("Carts moved to Orders", {
  //           position: "top-center",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           style: {
  //             backgroundColor: "#007aff", // Background color
  //             color: "white", // Text color
  //           },
  //         });
  //         //navigate("/orderr");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching cart data:", error);
  //     });
  // }, [dispatch, usersAddress, navigate]);

  const grandTotal = cartRes?.data?.rows.reduce((total, cartItem) => {
    const itemTotal = cartItem.product_data.price * cartItem.quantity;
    return total + itemTotal;
  }, 0);

  const checkoutTotal = grandTotal + shipPrice;
  console.log(checkoutTotal);
  return (
    <div>
      <Navbarr />
      <div
        style={{
          marginTop: "7em",
        }}
      >
        <div className="spread">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <p
                style={{
                  display: "none",
                }}
              >
                {" "}
                {newLocation}
              </p>
            </div>
            <div>
              {cartt.cartItems?.map((cartItem) => {
                return (
                  <div>
                    <div className="cart-first-div" key={cartItem.id}>
                      <div className="div-cart-first-div">
                        <img
                          className="img-cart-first-div"
                          src={
                            cartItem.imageUrl
                              ? cartItem.imageUrl
                              : cartItem?.product_images_data[0].image.url
                          }
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
                              {/* <div
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
                              </div> */}
                            </div>
                          </div>

                          {/*    <div
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
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* {cartRes?.data?.rows.map((cartItem) => {
              return (
                <div className="cart-first-div" key={cartItem.unique_id}>
                  <div className="div-cart-first-div">
                    <img
                      className="img-cart-first-div"
                      src={
                        cartItem.imageUrl
                          ? cartItem.imageUrl
                          : cartItem?.product_images_data[0].image.url
                      }
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
                          {cartItem.product_data.name}
                        </h3>

                        {/* <h3
                            style={{
                              border: "none",
                              margin: "0px",
                              padding: "0px",
                              fontSize: "12px",
                              color: "gray",
                              marginTop: "0.56em",
                            }}
                            className="Product-page-price"
                          >
                            <span>&#8358;</span>
                            {cartItem.product_data.price}{" "}
                            <span
                              style={{
                                fontSize: "0.6em",
                                color: "gray",
                              }}
                            >
                              Unit Price
                            </span>
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
                              {cartItem.product_data.price * cartItem.quantity}
                            </span>
                          </h3>
                        </div>
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
                              fontSize: "14px",
                            }}
                          >
                            {" "}
                            Qty:{""}
                            <span
                              style={{
                                marginLeft: "0.31em",
                              }}
                            >
                              {" "}
                              {cartItem.quantity}
                            </span>
                          </span>
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "baseline",
                            color: "black",
                          }}
                        ></div>
                      </div>
                    </div>

                    <p
                      style={{
                        color: "gray",
                        fontSize: "0.94em",
                      }}
                    >
                      {cartItem.title}
                    </p>
                  </div>
                </div>
              );
            })} */}
          </div>

          <div className="last-checkout-div">
            <h3>Order Summary</h3>
            <br />

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
              <h2
                style={{
                  fontSize: "16px",
                }}
              >
                {/* <span>&#8358;</span>
                {grandTotal}
                <span>.00</span> */}

                <span>&#8358;</span>
                {cart.cartTotalAmount.toLocaleString()}

                <span>.00</span>
              </h2>
            </div>

            <br />

            {/* <div
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
                <h4>Delivery Fee </h4>
                <p
                  className="product-title"
                  style={{
                    color: "gray",
                  }}
                >
                  Delivery fee
                </p>
              </div>
              <h2
                style={{
                  fontSize: "16px",
                }}
              >
                <span>&#8358;</span>
                {shipPrice}
                <span>.00</span>
              </h2>
            </div> */}
            <br />

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
                <h4>Order Total </h4>
                <p
                  className="product-title"
                  style={{
                    color: "gray",
                  }}
                >
                  Price to be Checked Out
                </p>
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bolder",
                }}
              >
                <strong>
                  {/* <span>&#8358;</span>
                  {grandTotal}
                  <span>.00</span> */}
                  <span>&#8358;</span>
                  {cart.cartTotalAmount.toLocaleString()}
                  <span>.00</span>
                </strong>
              </h2>
            </div>
            <div>
              <div
                style={{
                  marginTop: "3.2em",
                }}
              >
                <div
                  className="payment-page"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                  }}
                >
                  <label className="payment-option">
                    <input
                      type="checkbox"
                      name="payment-option"
                      value="Credit/Debit Card"
                      onChange={handleOptionChange}
                      checked={selectedOption === "Credit/Debit Card"}
                    />
                    <span className="checkmark"></span>
                    Pay with Credit Card
                  </label>
                  <label className="payment-option">
                    <input
                      type="checkbox"
                      name="payment-option"
                      value="Wallet"
                      onChange={handleOptionChange}
                      checked={selectedOption === "Wallet"}
                    />
                    <span className="checkmark"></span>
                    Pay with Wallet
                  </label>
                  <label className="payment-option">
                    <input
                      type="checkbox"
                      name="payment-option"
                      value="Transfer"
                      onChange={handleOptionChange}
                      checked={selectedOption === "Transfer"}
                    />
                    <span className="checkmark"></span>
                    Pay with Transfer
                  </label>
                </div>
              </div>
              <button
                style={{
                  fontSize: "1em",
                  marginTop: "3em",
                }}
                disabled={selectedOptionDisable}
                className={
                  selectedOption === null ? "disabled-button" : "checkout-btn"
                }
                onClick={addToCartFromEndpoint}
              >
                Pay {""} {""} {""}{" "}
                <span>&#8358;{cart.cartTotalAmount.toLocaleString()}</span>
              </button>
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  textAlign: "center",
                  margin: "8px 0",
                }}
              >
                {selectedOption === null
                  ? "Select a Payment Method to Proceed"
                  : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
