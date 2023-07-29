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
import { logOutUser } from "../../Slices/authSlice";

function Navbarr({ token }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      if (searchQuery.trim().length > 3) {
        navigate(`/searchproducts?search=${searchQuery}`);
        console.log(searchQuery);
      }
    }
  };
  const dispatch = useDispatch();
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLogout = () => {
    dispatch(logOutUser(null));
  };

  const [isOpen, setIsOpen] = useState(false);

  const profile = useSelector((state) => state.userProfile);
  const storedItem = localStorage.getItem("carts");
  const cartData = JSON.parse(storedItem);
  console.log(JSON.parse(storedItem),'loll');


  const auth = useSelector((state) => state.auth);
  const userprofile = useSelector((state) => state.userProfile.data);


console.log(cartData)
  const handleDropdownToggle = () => {
    const token = auth.token;
    setIsOpen(!isOpen);
    console.log(profile);
    dispatch(userProfile(token));
  };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile(token));
  }, [dispatch, token]);

  return (
    <header
      style={{
        backgroundColor: "#fff",
        color: "#000",
        display: "flex",
        alignItems: "center",
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
        <span>
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
              >
                {" "}
                <FaRegListAlt />
                Orders
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
                <MdFavoriteBorder />
                Favorites
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
            </span>
          ) : (
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
                onClick={() => navigate("/signin")}
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
                  height: "3.4em",

                  width: "100%",
                  paddingLeft: "1.2em",
                  marginRight: "0.3em",
                }}
                placeholder="Search for items here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                style={{
                  height: "3.4em",
                  padding: "0 2em",
                  backgroundColor: "#064bde",
                  color: "white",
                  border: "none",
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
            {auth.token ? (
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
                      {userprofile && userprofile.firstname
                        ? `Hi ${userprofile.firstname}`
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
                        <p>
                          {" "}
                          <FaRegListAlt />
                          Orders
                        </p>
                        <p>
                          <MdOutlineHelpOutline />
                          Help
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
              navigate("/Cart");
            }}
          >
            <FaShoppingCart
              style={{
                color: "black",
                fontSize: "2em",
              }}
            />
            {cartData?.rows?.length >= 1 ? (
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
            ) : null}

            <br />
          </span>
        </div>
      </h6>
    </header>
  );
}

export default Navbarr;
