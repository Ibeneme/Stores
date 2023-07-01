import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  // clearCart,
  getTotal,
} from "../../Slices/cartSlice";
import "../Products/ProductPage.css";
import { fetchCartData } from "../../Slices/Cart/CartSlice";
import { useEffect } from "react";
import "./Cart.css";
import { BiMinus } from "react-icons/bi";
import logo from "./images/5购物渐变扁平矢量人物插画2420220903果冻_画板 1.png";
import Footer from "../Navbar-and-Footer/Footer";
import cartItemimage from "../Products/images/Rectangle 15.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxPlus } from "react-icons/rx";
import Navbarr from "../Navbar-and-Footer/Navbarr";
import imagge from "./images/Group 36684.png";
import { AiFillShop } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdBroadcastOnHome } from "react-icons/md";

const Cart = (cartItem) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);



  const cartData = useSelector((state) => state.carts.data.data);

  console.log(cartData)
  const handleCheckout = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();
 

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const decreaseInCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const increaseInCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  // const handleclearCart = (cartItem) => {
  //   dispatch(clearCart(cartItem));
  // };

  return (
    <div>
      <Navbarr />
      <div
        style={{
          marginTop: "7em",
        }}
      >
        {cart.cartItems.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="no-product">
              <p>Your Cart is currently empty</p>
              <br />
              <img src={logo} alt="shopping" />
              <br /> <br />
              <button
                style={{
                  width: "17em",
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
              {cart.cartItems.map((cartItem) => {
                return (
                  <div className="cart-first-div" key={cartItem.unique_id}>
                    <div className="div-cart-first-div">
                      <img
                        className="img-cart-first-div"
                        src={cartItemimage}
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
                          }}
                        >
                          <h3 className="Product-page-h1">{cartItem.name}</h3>
                          <p
                            style={{
                              marginTop: "0",
                            }}
                            className="Product-page-Short-description"
                          >
                            {cartItem.description}
                          </p>
                          <h3
                            style={{
                              border: "none",
                              margin: "0px",
                              padding: "0px",
                            }}
                            className="Product-page-price"
                          >
                            <span>&#8358;</span>
                            {cartItem.price}
                          </h3>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                margin: "1em 0",
                              }}
                              className="product-page-add-and-remove-button-div"
                            >
                              {" "}
                              <button
                                className="product-page-add-or-remove-btn"
                                onClick={() => decreaseInCart(cartItem)}
                              >
                                {" "}
                                <BiMinus />
                              </button>{" "}
                              <p className="product-page-quantity">
                                {" "}
                                {cartItem.cartQuantity}
                              </p>
                              <button
                                onClick={() => increaseInCart(cartItem)}
                                className="product-page-add-or-remove-btn"
                              >
                                <RxPlus />
                              </button>
                            </div>
                          </div>
                        </div>

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
              })}
            </div>

            <div className="last-checkout-div">
              {/* <button onClick={() => handleclearCart(cartItem)}>
              clear cart
            </button> */}
              <h3>Cart Summary</h3>
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
                <h2>
                  <span
                    style={{
                      fontSize: "0.5em",
                    }}
                  >
                    <span>&#8358;</span>
                  </span>
                  {cart.cartTotalAmount}
                  <span
                    style={{
                      fontSize: "0.5em",
                    }}
                  >
                    .00
                  </span>
                </h2>
              </div>
              <br /> <br />
              {auth.token ? (
                <div>
                  <button
                    style={{
                      fontSize: "1em",
                    }}
                    className="checkout-btn"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
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
                            alt="alt"
                          />
                        </div>
                        <h2>Calculating Fare</h2>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop:'0.5em'
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
                          <p style={{ marginRight: "auto", textAlign: "left" }}>
                            {auth.userData.address} {auth.userData.street}
                            {auth.userData.city}
                          </p>

                          <p style={{ marginLeft: "auto", textAlign: "right" }}>
                            {auth.userData.address} {auth.userData.street}
                            {auth.userData.city}
                          </p>
                        </div>
                        <h2>
                          <span>&#8358;</span> {cart.cartTotalAmount / 10}
                        </h2>
                        <button
                          style={{
                            backgroundColor: "#064BDE",
                            color: "white",
                            width: "100%",
                            padding: "1em 0.3em",
                            border: "none",
                            marginTop: "1em",
                          }}
                          onClick={() => navigate("/checkout")}
                        >
                          Accept Fare
                        </button>
                      </div>
                    </div>
                  )}{" "}
                </div>
              ) : (
                <button
                  style={{
                    fontSize: "1em",
                  }}
                  className="checkout-btn"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up to Checkout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
