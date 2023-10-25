import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBars,
  FaRegListAlt,
  FaShoppingCart,
  FaTimes,
  FaRegUser,
} from "react-icons/fa";
import "./Navbarr.css";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  MdFavoriteBorder,
  MdHistory,
  MdOutlineHelpOutline,
  MdOutlineSell,
} from "react-icons/md";
import logologo from "./image/logo.png";
import { useNavigate } from "react-router";

import { userProfile } from "../../Slices/userSlice";
import { fetchUserProfile } from "../../Slices/Users/ProfileSlice";
import { signoutUser } from "../../Slices/auth/signUpSlice";
import { fetchCartData } from "../../Slices/Cart/CartSlice";
import { clearToken } from "../../Slices/auth/signUpSlice";

function Navbarr({ token }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartData, setCartResponse] = useState(null);
  const dispatch = useDispatch();

  const { cartTotalQuantity } = useSelector((state) => state.cart);
  console.log(cartData, cartTotalQuantity);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCartData());
        setCartResponse(response.payload.data); // Store the response in a variable
      } catch (error) {}
    };

    fetchData();
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      if (searchQuery.trim().length > 3) {
        navigate(`/searchproducts?search=${searchQuery}`);
      }
    }
  };

  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(signoutUser());
    const token = localStorage.getItem("token");
    console.log(token, "llol");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const [isOpen, setIsOpen] = useState(false);

  const auth = useSelector((state) => state.auth);
  const userprofile = useSelector((state) => state.userProfile.data);

  const handleDropdownToggle = () => {
    const token = auth.token;
    setIsOpen(!isOpen);

    dispatch(userProfile(token));
  };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile(token));
  }, [dispatch, token]);

  const cart = useSelector((state) => state.cart);

  return (
    <header
      style={{
        backgroundColor: "#fff",
        color: "#000",
        display: "flex",
        alignItems: "center",
        zIndex: "99",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: " 0.5em",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: " 0.5em",
            alignItems: "center",
          }}
        >
          <button
            style={{
              color: "#000",
              fontSize: "1.2em",
              display: "flex",
              gap: "2em",
            }}
            className="nav-btn"
            onClick={showNavbar}
          >
            <FaBars />
          </button>

          <img
            style={{
              marginRight: "0.5em",
            }}
            className="Logo-top-left"
            width="24em"
            alt="logo"
            src={logologo}
          />

          <h3
            onClick={() => {
              navigate("/");
            }}
          >
            Hydra
          </h3>
        </div>
      </div>

      <nav className="nav-bar" ref={navRef}>
        <span
          style={{
            width: "100%",
          }}
        >
          {auth.token ? (
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "3em",
              }}
            >
              <p
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                onClick={() => navigate("/sellersproductsdisplay")}
              >
                {" "}
                <MdOutlineSell />
                Sell a Product
              </p>
              <p
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                onClick={() => navigate("/profile")}
              >
                {" "}
                <FaRegUser />
                My Account
              </p>
              <p
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                onClick={() => navigate("/orderr")}
              >
                {" "}
                <FaRegListAlt />
                Orders
              </p>
              <p
                onClick={() => navigate("/sellersorder")}
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                {" "}
                <MdFavoriteBorder />
                Sellers Orders
              </p>
              <p
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                {" "}
                <MdHistory />
                History
              </p>
              <p
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <MdOutlineHelpOutline />
                Help
              </p>
              <span
                style={{
                  width: "90%",
                  height: "50px",

                  borderRadius: "22em",
                  border: "1px solid white",
                  backgroundColor: "#ff000000",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleLogout}
              >
                Logout
              </span>
            </span>
          ) : (
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "3em",
                width: "100%",
              }}
            >
              <p
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                onClick={() => navigate("/signin")}
              >
                {" "}
                <MdOutlineSell />
                Sell a Product
              </p>
              <p
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                onClick={() => navigate("/signin")}
              >
                {" "}
                <FaRegUser />
                My Account
              </p>
              <p
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                onClick={() => navigate("/orderr")}
              >
                {" "}
                <FaRegListAlt />
                Orders
              </p>
              <p
                onClick={() => navigate("/signin")}
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                {" "}
                <MdFavoriteBorder />
                Favorites
              </p>
              <p
                onClick={() => navigate("/signin")}
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                {" "}
                <MdHistory />
                History
              </p>
              <p
                onClick={() => navigate("/signin")}
                style={{
                  display: "flex",
                  gap: "1em",
                  marginLeft: "1em",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <MdOutlineHelpOutline />
                Help
              </p>

              <span
                style={{
                  height: "50px",
                  borderRadius: "22em",
                  border: "none",
                  backgroundColor: "white",
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                }}
                onClick={() => navigate("/signin")}
              >
                Sign in
              </span>
              <span
                style={{
                  width: "90%",
                  height: "50px",
                  marginTop: "-2em",
                  borderRadius: "22em",
                  border: "1px solid white",
                  backgroundColor: "none",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </span>
            // <span
            //   style={{
            //     display: "flex",
            //     flexDirection: "column",
            //     justifyContent: "center",
            //     gap: "3em",
            //   }}
            // >
            //   <div
            //      style={{
            //         display: "flex",
            //         gap: "1em",
            //         marginLeft: "1em",
            //         fontSize: "1.2em",
            //         cursor: "pointer",
            //         alignItems: "center",
            //         justifyContent:'center',
            //         border:'1px solid white',
            //         padding: '0.5em 3em',
            //         width:'100%'
            //       }}
            //     onClick={() => navigate("/signin")}
            //   >
            //      Sign In
            //   </div>

            //   <div  style={{
            //       display: "flex",
            //       gap: "1em",
            //       marginLeft: "1em",
            //       fontSize: "1.2em",
            //       cursor: "pointer",
            //       alignItems: "center",
            //       justifyContent:'center',
            //       border:'1px solid white',
            //       padding: '0.5em 3em',
            //       width:'100%'
            //     }}
            //     ÏonClick={() => navigate("/signup")}>Sign Up</div>
            // </span>
          )}
        </span>

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <h6
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4em",
          }}
        >
          <div className="hide-mobile" style={{}}>
            <form
              className="hide-mobile"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40vw",
              }}
              onSubmit={handleSearch}
            >
              <input
                style={{
                  height: "50px",
                  borderRadius: "12px",
                  width: "100%",
                  paddingLeft: "1.2em",
                  marginRight: "0.3em",
                  border: "1px solid black",
                }}
                placeholder="Search for items here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                style={{
                  height: "50px",
                  padding: "0 2em",
                  backgroundColor: "#064bde",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                }}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          <span
            style={{
              gap: "4em",
            }}
            className="hide-mobile"
          >
            {auth?.token ? (
              <span
                style={{
                  display: "flex",
                  gap: "4em",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="dropdown"
                >
                  <div
                    style={{
                      backgroundColor: "#d9d9d965",
                      color: "#000",
                      fontSize: "1.4em",
                      padding: "1em 2em",
                      display: "flex",
                      gap: "1em",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "53em",
                    }}
                    onClick={handleDropdownToggle}
                  >
                    <p>
                      {userprofile && userprofile?.firstname
                        ? `Hi ${userprofile?.firstname}`
                        : "My Account"}
                    </p>
                    <span
                      style={{
                        marginLeft: "0.9em",
                        display: "flex",
                      }}
                    >
                      <RiArrowDownSLine />
                    </span>
                    {isOpen && (
                      <div
                        style={{
                          fontSize: "0.9em",
                          gap: "1em",
                          width: "100%",
                        }}
                        className="dropdown-content"
                      >
                        <p onClick={() => navigate("/sellersproductsdisplay")}>
                          {" "}
                          <MdOutlineSell />
                          Sell a Product
                        </p>
                        <p onClick={() => navigate("/profile")}>
                          {" "}
                          <FaRegUser />
                          My Account
                        </p>
                        <p onClick={() => navigate("/orderr")}>
                          {" "}
                          <FaRegListAlt />
                          Orders
                        </p>
                        <p onClick={() => navigate("/sellersorder")}>
                          <FaRegListAlt /> {/*   <MdOutlineHelpOutline /> */}
                          Seller's Order
                        </p>
                        <p
                          onClick={handleLogout}
                          style={{
                            backgroundColor: "#FF000030",
                            color: "#FF0000",
                            textAlign: "center",
                          }}
                        >
                          Log Out
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </span>
            ) : (
              <span
                style={{
                  display: "flex",
                  gap: "6em",
                  marginRight: "3em",
                }}
              >
                <span>
                  <h3 onClick={() => navigate("/signin")}>Sign In</h3>
                </span>

                <h3 onClick={() => navigate("/signup")}>Sign Up</h3>
              </span>
            )}
          </span>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              navigate("/test-cart");
            }}
          >
            {/* <FaShoppingCart className="utton" />
            {cartTotalQuantity >= 1 ? (
              <span style={{}} className="span-red">
                {cartTotalQuantity}
              </span>
            ) : null} */}

            <FaShoppingCart
              style={{
                color: "black",
                fontSize: "2em",
              }}
            />

            {cart.cartItems.length > 0 ? (
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "23em",
                  width: "2em",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0.42em",
                  marginLeft: "-0.5em",
                  marginTop: "-2em",
                }}
              >
                {cart.cartItems.length}
              </span>
            ) : null}
            {/* {cartData?.rows?.length >= 1 ? (
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "23em",
                  width: "2em",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0.42em",
                  marginLeft: "-0.5em",
                  marginTop: "-2em",
                }}
              >
                {cartData?.rows.length}
              </span>
            ) : null} */}
            <br />
          </span>
        </div>
      </h6>
    </header>
  );
}

export default Navbarr;
