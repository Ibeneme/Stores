import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import TextFieldCheckout from "./TextFieldCheckout";
import * as Yup from "yup";
import "./Checkout.css";
import Footer from "../Navbar-and-Footer/Footer";

import "../Navbar-and-Footer/Navbar.css";
import Navbarr from "../Navbar-and-Footer/Navbarr";

const PaymentCheckout = (cartItem) => {
  const validate = Yup.object({
    cardNumber: Yup.string()
      .max(15, "Must be 15 Characters or less")
      .required("Your Card Number is required"),
    cvv: Yup.string()
      .max(3, "Must be 3 Characters or less")
      .required("Your Cvv is required"),
    expiryDate: Yup.string()
      .max(45, "Must be 12 Characters or less")
      .required("Your Card expiry date is required"),
    cardPin: Yup.string()
      .max(4, "Must be 4 Characters or less")
      .required("Your card pin is required"),
  });
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  return (
    <div>
      <Navbarr />
      <div className="checkout-main-div">
        <div className="last-checkout-div">
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
                NGN
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
          <button
            style={{
              backgroundColor: "#66666635",
              height: "3.1em",
              borderRadius: "0.4em",
              border: "none",
              fontSize: "01em",
              color: "black",
              width: "100%",
              marginTop: "01em",
              marginBottom: "01em",
            }}
            type="submit"
            onClick={() => {
              navigate("/cart");
            }}
          >
            Modify Cart
          </button>
        </div>
        <div>
          <div></div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "1em",
                backgroundColor: "white",
              }}
            >
              <Formik
                initialValues={{
                  cardNumber: "",
                  cvv: "",
                  expiryDate: "",
                  cardPin: "",
                }}
                validationSchema={validate}
              >
                {(formik) => (
                  <div className="checkout-div-delivery">
                    {/* <img
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    src={logo}
                    alt="logo"
                  /> */}
                    <h2
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "02em",
                      }}
                    >
                      {" "}
                      Payment
                    </h2>
                    <p
                      style={{
                        marginTop: "0.5em",
                      }}
                    >
                      <span
                        style={{
                          color: "#386AEB",
                        }}
                        onClick={() => navigate("/signin")}
                      ></span>
                    </p>
                    <br /> <br />
                    {console.log(formik.values)}
                    <Form>
                      <TextFieldCheckout
                        label="Card Number"
                        name="cardNumber"
                        type="text"
                      />

                      <br />
                      <TextFieldCheckout label="Cvv" name="cvv" type="text" />
                      <br />
                      {/* <TextFieldCheckout
                      label="Town"
                      name="townOfDelivery"
                      type="text"
                    /> 
                     <br />*/}
                      <TextFieldCheckout
                        label="Expiry Date"
                        name="expiryDate"
                        type="date"
                      />
                      <br />
                      <TextFieldCheckout
                        label="Pin"
                        name="cardPin"
                        type="text"
                      />
                      <br />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <br />
                        <button
                          style={{
                            backgroundColor: "#386AEB",
                            height: "3.1em",
                            borderRadius: "0.4em",
                            border: "none",
                            color: "white",
                            fontSize: "1em",
                          }}
                          type="submit"
                          onClick={() => navigate("")}
                        >
                          Pay
                        </button>
                        <button
                          style={{
                            backgroundColor: "#66666635",
                            height: "3.1em",
                            borderRadius: "0.4em",
                            border: "none",
                            fontSize: "01em",
                            color: "black",

                            marginTop: "01em",
                            marginBottom: "01em",
                          }}
                          type="submit"
                          onClick={() => {
                            navigate("/cart");
                          }}
                        >
                          Modify Cart
                        </button>
                      </div>

                      {/* <button type='submit'>Reset</button> */}
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentCheckout;
