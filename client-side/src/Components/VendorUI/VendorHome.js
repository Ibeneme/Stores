import React from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form } from "formik";
import TextFieldCheckout from "./TextFieldCheckout";
import * as Yup from "yup";
import "./Checkout.css";

import Footer from "../Navbar-and-Footer/Footer";
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";

import "../Navbar-and-Footer/Navbar.css";
import logo from "../../Components/Navbar-and-Footer/image/Group 12.png";

const VendorHome = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const validate = Yup.object({
    SelectCategory: Yup.string()
      .max(45, "Must be 12 Characters or less")
      .required("Select Category is required"),
    NameofProduct: Yup.string()
      .max(45, "Must be 12 Characters or less")
      .required(" Name of Product is required"),
    PhoneNumber: Yup.string()
      .max(45, "Must be 12 Characters or less")
      .required("Your Phone Number is required"),
    Specifications: Yup.string()
      .max(45, "Must be 12 Characters or less")
      .required("Your Specifications is required"),
    Price: Yup.string()
      .max(45, "Must be 12 Characters or less")
      .required("Your Price is required"),
  });


  const navigate = useNavigate();

  return (
    <div>
      <header>
        <div>
          <img width="24em" alt="logo" src={logo} />

          <h3
            onClick={() => {
              navigate("/");
            }}
            className="h3-for-navbar"
          >
            Hydra
          </h3>
        </div>

        <nav className="nav-bar" ref={navRef}>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
      </header>
      <div className="checkout-main-div">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
              borderRadius: "1em",
              backgroundColor: "white",
            }}
          >
            <Formik
              initialValues={{
                houseNumber: "",
                streetAddress: "",
                nearestBustop: "",
                townOfDelivery: "",
                cityOfDelivery: "",
                stateOfDelivery: "",
              }}
              validationSchema={validate}
            >
              {(formik) => (
                <div className="checkout-div-delivery">
          
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
                    Sell Product
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
                  <Form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextFieldCheckout
                      label="Select Category"
                      name="SelectCategory"
                      type="text"
                    />
                    {/*  <br /><TextFieldCheckout
                      label="Street Description"
                      name="streetAddress"
                      type="text"
                    /> */}
                    <br />
                    <TextFieldCheckout
                      label="Name of Product"
                      name="NameofProduct"
                      type="text"
                    />
                    <br />
                    <TextFieldCheckout
                      label="Upload"
                      name="Upload"
                      type="file"
                      style={{
                        width: " 100%",
                        border: "0.1em solid gray",
   
                        display: "flex",

                        justifyContent: "center",
                        marginBottom: "2.4em",
                      }}
                    />
                    <br />
                    <TextFieldCheckout
                      label="Specifications"
                      name="Specifications"
                      type="text"
                    />
                    <br />
                    <TextFieldCheckout label="Price" name="Price" type="text" />
                    <br />
                    <TextFieldCheckout
                      label="Phone Number"
                      name="PhoneNumber"
                      type="text"
                    />
                    <br />
                    <br />{" "}
                    <button
                      style={{
                        backgroundColor: "#386AEB",
                        height: "3.1em",
                        borderRadius: "0.4em",
                        border: "none",
                        color: "white",
                        fontSize: "1em",
                        width: "100%",
                      }}
                      type="submit"
                    >
                      Upload
                    </button>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <br />
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorHome;
