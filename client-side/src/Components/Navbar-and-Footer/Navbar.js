import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import "./Navbar.css";
import logo from "./image/Group 12.png";
import { useNavigate } from "react-router";

// import CategoriesForProps from "../Categories/CategoriesForProps";
// import Categories from "../Categories/CategoriesData";


function Navbar() {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <header
    // style={{
    //   boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
    // }}
    >
      <div>
        <button
          style={{
            color: "white",
            fontSize: "1.2em",
            display: "flex",
            gap: "2em",
          }}
          className="nav-btn"
          onClick={showNavbar}
        >
          <FaBars />
        </button>
        <img className="Logo-top-left" width="24em" alt="logo" src={logo} />

        <h3
          onClick={() => {
            navigate("/");
          }}
          className="h3-for-navbar"
        >
          Hydra
        </h3>
      </div>

      <nav  className="nav-bar" ref={navRef}>
        <span
          style={{
            backgroundColor: "#fff",
            color: "#386AEB",
          }}
          className="logo-in-the-dropdown main-btn"
        >
          <h5
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "1em",
              color: "#386AEB",
              paddingBottom: "0.7em",
              paddingTop: "1em",
              paddingLeft: "0.3em",
              paddingRight: "0.3em",
              width: "16em",
            }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            {" "}
            Sign In as a User
          </h5>

          {/* <img
            style={{ marginRight: "-0.7em" }}
            width="23em"
            height="23em"
            alt="logo"
            src={logo}
          />
          <h6 className="h3-for-navbar">HydraXpress</h6>{" "} */}
        </span>
        <p
          style={{
            marginTop: "0.3em",
          }}
        ></p>
        <span
          style={{
            backgroundColor: "#386AEB",
            border: "0.16em solid white",
            color: "#fff",
          }}
          className="logo-in-the-dropdown"
        >
          <h5
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1em",
              color: "white",
              paddingTop: "0.7em",
              paddingBottom: "1em",
              paddingLeft: "0.3em",
              paddingRight: "0.3em",
              width: "16em",
            }}
            onClick={() => {
              navigate("/vendorSignin");
            }}
          >
            Sign In as a Vendor
          </h5>

          {/* <img
    style={{ marginRight: "-0.7em" }}
    width="23em"
    height="23em"
    alt="logo"
    src={logo}
  />
  <h6 className="h3-for-navbar">HydraXpress</h6>{" "} */}
        </span>

        <br />
        {/* {Categories.map((e) => {
          return <CategoriesForProps key={e.id} icon={e.icon} name={e.name} />;
        })} */}

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <h6
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
        }}
        className="cart-search-user"
      >
        <span className="utton">
          <div className="dropdown">
            <span className="dropbtn">
              <span
                style={{
                  marginRight: "2em",
                }}
                className="utton span-others"
              >
                <FaUser className="utton user-button" />
              </span>
            </span>
            <div className="dropdown-content">
              <h5
                style={{
                  color: "white",
                  paddingBottom: "0.7em",
                  paddingTop: "1em",
                  paddingLeft: "2em",
                  paddingRight: "2em",
                  width: "100%",
                }}
                onClick={() => {
                  navigate("/signup");
                }}
                className="dropdown-p"
              >
                {" "}
                Sign In as a User
              </h5>
              <h5
                style={{
                  color: "white",
                  paddingTop: "0.7em",
                  paddingBottom: "1em",
                  paddingLeft: "2em",
                  paddingRight: "2em",
                  width: "100%",
                }}
                onClick={() => {
                  navigate("/vendorSignin");
                }}
                className="dropdown-p"
              >
                Sign In as a Vendor
              </h5>
            </div>
          </div>

          <FaSearch style={{}} className="utton span-others" />
        </span>

        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            navigate("/Cart");
          }}
          className="utton"
        >
          <h4
            className="cart-cart-in-words"
            style={{
              marginRight: "0.4em",
            }}
          >
            Cart
          </h4>

          <FaShoppingCart className="utton" />
          {cartTotalQuantity >= 1 ? (
            <span className="span-red">{cartTotalQuantity}</span>
          ) : null}
        </span>
      </h6>
    </header>
  );
}

export default Navbar;
