import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../Products/ProductPage.css";
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
import { fetchCartData } from "../../Slices/Cart/CartSlice";
import {
  deleteCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  clearCart,
} from "../../Slices/Cart/CartSlice";
import { fetchShippingPrice } from "../../Slices/Shipping/Shipping";

const Cart = () => {
  const auth = useSelector((state) => state.auth);
  const shippingPrice = useSelector((state) => state.shipping.shippingPrice);
  console.log(shippingPrice, "authhh");

  const data = useSelector((state) => state.carts);
  console.log(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const testAddress = data?.data?.data?.rows[0].product_data.location;

  const toAddress =
    data?.data?.data?.rows.length > 0 ? <p>{testAddress}</p> : null;

  console.log(testAddress, "biggg");

  const handleShipping = () => {
    dispatch(
      fetchShippingPrice({
        fromAddress: "Port Harcourt",
        toAddress: "Port harcourt",
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

  const handleDeleteButtonClick = () => {
    setDisplayModal(true);
  };

  const handleDeleteConfirmation = () => {
    setDisplayModal(false);
  };

  useEffect(
    (data) => {
      dispatch(fetchCartData(data));
    },
    [dispatch]
  );

  const handleCheckout = () => {
    setShowModal(true);
    handleShipping();
    console.log(data);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClearCartClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleClearCart = async () => {
    try {
      const response = await dispatch(clearCart());
      dispatch(fetchCartData(data));
      setIsModalOpen(false);
      console.log("Item added to cart:", response.payload);
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
  };

  const handleDeleteThisToCart = async (unique_id) => {
    try {
      const response = await dispatch(dispatch(deleteCartItem(unique_id)));
      dispatch(fetchCartData(data));

      console.log("Item added to cart:", response.payload);
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
  };

  const handledecrease = async (unique_id) => {
    const itemData = unique_id;

    try {
      const response = await dispatch(decreaseCartItemQuantity(itemData));
      dispatch(fetchCartData());

      console.log("Item added to cart:", response.payload);
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
  };
  console.log(data?.data?.data?.rows, "here cart");

  const grandTotal = data?.data?.data?.rows.reduce((total, cartItem) => {
    const itemTotal = cartItem.product_data.price * cartItem.quantity;
    return total + itemTotal;
  }, 0);

  const handleIncrease = async (unique_id) => {
    const itemData = unique_id;
    try {
      const response = await dispatch(increaseCartItemQuantity(itemData));
      dispatch(fetchCartData());

      console.log("Item added to cart:", response.payload);
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
  };
  console.log(data);

  return (
    <div>
      <Navbarr />
      <div
        style={{
          marginTop: "7em",
        }}
      >
        {data?.data === null ? (
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  onClick={handleClearCartClick}
                  style={{
                    height: "50px",
                    padding: "0 1em",
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1em",
                    cursor: "pointer",
                  }}
                >
                  Clear Cart
                </div>
              </div>
              {isModalOpen && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 9999,
                  }}
                >
                  <div
                    style={{
                      background: "white",
                      padding: "2em",
                      borderRadius: "5px",
                      maxWidth: "400px",
                      textAlign: "center",
                    }}
                  >
                    <h3>Clear your Cart?</h3>
                    <p
                      style={{
                        marginBottom: "2.4em",
                        marginTop: "0.11em",
                        color: "gray",
                        fontSize: "16px",
                      }}
                    >
                      Are you sure you want to clear your cart?
                    </p>
                    <div className="modal-buttons">
                      <button
                        style={{
                          height: "50px",
                        }}
                        onClick={handleClearCart}
                      >
                        Clear Cart
                      </button>
                      <button onClick={handleModalClose}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}

              {data?.data?.data?.rows.map((cartItem) => {
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
                          </h3> */}
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
                                {cartItem.product_data.price *
                                  cartItem.quantity}
                              </span>
                            </h3>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "baseline",
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
                                onClick={() =>
                                  handledecrease(cartItem.unique_id)
                                }
                              >
                                {" "}
                                <BiMinus />
                              </button>{" "}
                              <p className="product-page-quantity">
                                {" "}
                                {cartItem.quantity}
                              </p>
                              {console.log(cartItem.quantity, "trialll")}
                              <button
                                onClick={() =>
                                  handleIncrease(cartItem.unique_id)
                                }
                                className="product-page-add-or-remove-btn"
                              >
                                <RxPlus />
                              </button>
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
                                marginLeft: "1.4em",
                              }}
                              onClick={handleDeleteButtonClick}
                            >
                              {" "}
                              {console.log(cartItem.unique_id, "uniqueiddd")}
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

                        {displayModal && (
                          <div
                            style={{
                              position: "fixed",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              zIndex: 9999,
                            }}
                          >
                            <div
                              style={{
                                background: "white",
                                padding: "2em",
                                borderRadius: "5px",
                                maxWidth: "400px",
                                textAlign: "center",
                              }}
                            >
                              <h3>Delete Item from Cart</h3>
                              <p
                                style={{
                                  marginBottom: "2.4em",
                                  marginTop: "0.11em",
                                  color: "gray",
                                  fontSize: "16px",
                                }}
                              >
                                Are you sure you want to delete this item from
                                the cart?
                              </p>
                              <div className="modal-buttons">
                                <button
                                  style={{
                                    height: "50px",
                                  }}
                                  onClick={() =>
                                    handleDeleteThisToCart(cartItem.unique_id)
                                  }
                                >
                                  Delete
                                </button>
                                <button
                                  style={{
                                    height: "50px",
                                  }}
                                  onClick={handleDeleteConfirmation}
                                >
                                  Cancel
                                </button>
                              </div>{" "}
                            </div>
                          </div>
                        )}
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
                  <span>&#8358;</span>
                  {grandTotal}
                  <span>.00</span>
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
                            {auth.userData.city} {auth.userData.state}
                          </p>

                          <p
                            style={{
                              marginLeft: "auto",
                              textAlign: "right",
                              width: "100%",
                            }}
                          >
                            {toAddress}
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
                          }}
                          // onClick={() => navigate("/checkout")}
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
