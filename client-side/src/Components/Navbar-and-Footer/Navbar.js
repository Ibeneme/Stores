import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "./image/Group 12.png";
import { useNavigate } from "react-router";
import { logoutUser } from "../../Slices/authSlice";


function Navbar() {
  const dispatch = useDispatch();
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const handleLogout = () => {
    dispatch(logoutUser(null));
   window.location.reload(); 
  };

  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <header
  
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

      <nav className="nav-bar" ref={navRef}>
        <span>
          {auth.token ? (
            <span
            style={{
              display: "flex",
              gap: "1em",
              flexDirection:'column'
            }}
          >
            <span>
              <button
                style={{
                  padding: " 1em 3em",
                  border: "0.083em solid white",
                  color: "white",
                  borderRadius: "0.3em",
                  backgroundColor: "#386AEB",
                  cursor: "pointer",
                  width:'17em',
                }}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </span>

            <button
              style={{
                padding: " 1em 3em",
                border: "none",
                backgroundColor: "black",
                color: "white",
                borderRadius: "0.3em",
                width:'17em',
              }}
              onClick={() => navigate("/vendor")}
            >
              Sell
            </button>
          </span>
          ) : (
            <span
            style={{
              display: "flex",
              gap: "1em",
              flexDirection:'column'
            }}
          >
            <span>
              <button
                style={{
                  padding: " 1em 3em",
                  border: "0.083em solid white",
                  color: "white",
                  borderRadius: "0.3em",
                  backgroundColor: "#386AEB",
                  cursor: "pointer",
                  width:'17em',
                }}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            </span>

            <button
              style={{
                padding: " 1em 3em",
                border: "none",
                backgroundColor: "black",
                color: "white",
                borderRadius: "0.3em",
                width:'17em',
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </span>
          )}
        </span>

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            gap: "1.5em",
          }}
        >
          <span className="utton">
            <div className="dropdown">
              <span className="dropbtn">
                <span
                  style={{
                    marginRight: "2em",
                  }}
                  
                  className="utton span-others"
                ></span>
              </span>
              <div className="dropdown-content"></div>
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
       
            </h4>

            <FaShoppingCart className="utton" />
            {cartTotalQuantity >= 1 ? (
              <span style={{}} className="span-red">
                {cartTotalQuantity}
              </span>
            ) : null}

            <br />
          </span>

          <span className="hide-btnn">
            {auth.token ? (
              <span style={{
                display: "flex",
                gap: "1em",
              }}>
  <button
                    style={{
                      padding: " 1em 3em",
                      border: "0.083em solid white",
                      color: "white",
                      borderRadius: "0.3em",
                      backgroundColor: "#386AEB",
                      cursor: "pointer",
                    }}
                    className="btnnnn"
                    onClick={handleLogout}
                 
                  >
                   Log Out
                  </button>
              <button
                style={{
                  padding: " 1em 3em",
                  border: "none",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "0.3em",
                }}className="btnnnn"
                onClick={() => navigate("/vendor")}
              >
               Sell
              </button>
                </span>
          
            ) : (
              <span
                style={{
                  display: "flex",
                  gap: "1em",
                }}
              >
                <span>
                  <button
                    style={{
                      padding: " 1em 3em",
                      border: "0.083em solid white",
                      color: "white",
                      borderRadius: "0.3em",
                      backgroundColor: "#386AEB",
                      cursor: "pointer",
                    }}
                    className="btnnnn"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </button>
                </span>

                <button
                  style={{
                    padding: " 1em 3em",
                    border: "none",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "0.3em",
                  }}
                  className="btnnnn"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </span>
            )}
          </span>
        </div>
      </h6>
    </header>
  );
}

export default Navbar;
