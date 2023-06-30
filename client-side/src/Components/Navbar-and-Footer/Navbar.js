import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaRegListAlt, FaSearch, FaShoppingCart, FaTimes, FaRegUser } from "react-icons/fa";
import "./Navbar.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineHelpOutline } from "react-icons/md";
import logo from "./image/Group 12.png";
import { useNavigate } from "react-router";
import { logoutUser } from "../../Slices/authSlice";
import { userProfile } from "../../Slices/userSlice";

function Navbar() {
  const userData = JSON.parse(localStorage.getItem("userData"))
  ? JSON.parse(localStorage.getItem("userData"))
  : null;


  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim() !== '') {
      if (searchQuery.trim().length > 3) {
        navigate(`/searchproducts?search=${searchQuery}`);
        console.log(searchQuery)
        
      }
      
    }
  }
  const dispatch = useDispatch();
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLogout = () => {
    dispatch(logoutUser(null));
    window.location.reload();
  };

  const [isOpen, setIsOpen] = useState(false);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const profile = useSelector((state) => state.userProfile
  );

  const auth = useSelector((state) => state.auth);
  
  const handleDropdownToggle = () => {
    const token = auth.token
    setIsOpen(!isOpen);
    console.log(profile)
    dispatch(userProfile(token));
  };
  
  // const handleUserProfile = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await dispatch(userProfile());
  //     console.log(response);
  //     // Additional logic or code after fetching the user profile
  //   } catch (error) {
  //     console.log("Error fetching user profile:", error);
  //     // Handle the error if needed
  //   }
  // };

  
  const navigate = useNavigate();

 
 
  return (
    <header>
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
                flexDirection: "column",
              }}
            >
              <span>
                {/* <button
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
              </button> */}

                <button
                  style={{
                    padding: " 1em 3em",
                    border: "0.083em solid white",
                    color: "white",
                    borderRadius: "0.3em",
                    backgroundColor: "#386AEB",
                    cursor: "pointer",
                    width: "17em",
                  }}
               
                >
                  Profile
                </button>
              </span>

              <button
                style={{
                  padding: " 1em 3em",
                  border: "none",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "0.3em",
                  width: "17em",
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
                flexDirection: "column",
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
                    width: "17em",
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
                  width: "17em",
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
          alignItems: "center",
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
           <form
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "4em",
                  width: "fit-content",
                }}
                className="Width-input"
                onSubmit={handleSearch}
                
              >
                <input
                  style={{
                    height: "3.4em",
                    marginTop: "-1.8em",
                    paddingLeft: "1.2em",
                    marginRight: "0.3em",
                  }}
                  className="Width-input-width"
                  placeholder="Search for items here"
                  value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="Width-input"
                  style={{
                    width: "4em",
                    height: "3.4em",
                    marginTop: "-1.8em",
                    backgroundColor: "#00000060",
                    color: "white",
                    border: "none",
                  }}
                  type="submit"
                >
                  
                  <FaSearch
                    style={{
                      fontSize: "1.3em",
                    }}
                  />
                </button>
              </form>
            </div>
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
           

            <FaShoppingCart className="utton width" />
            {cartTotalQuantity >= 1 ? (
              <span style={{}} className="span-red">
                {cartTotalQuantity}
              </span>
            ) : null}

            <br />
          </span>

          <span className="hide-btnn">
            {auth.token ? (
              <span
                style={{
                  display: "flex",
                  gap: "2.4em",

                }}
              >
                {/* <button
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
                  </button> */}
                {/* <button
                  style={{
                    color: "white",
                    borderRadius: "0.3em",
                    backgroundColor: "#386AEB",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    fontSize: "0.76em",
                  }}
                  className="btnnnn"
                  onClick={handleUserProfile}
                >
                  <img
                   className="Width-input"
                    style={{
                      width: "2em",
                      borderRadius: "100%",
                      marginRight: "1em",
                    }}
                    src={auth.picture}
                    alt="dp"
                  />
                  Hi {" "}
                  {auth.firstName} {" "}
                </button> */}


                <div style={{
          display:'flex',
         justifyContent:'center',
         alignItems:'center'
            
          }} className="dropdown">
      <button className="btnnnn dropp" onClick={handleDropdownToggle}>
        <span className="btn-dropp">
          {/* <img 
          style={{
            width:'2.4em',
            marginRight:'0.4em',
            borderRadius:'100%'

          }} src={auth.userData.photo} alt="dp" /> */}
         My Account<RiArrowDownSLine  style={{
            width:'2.4em',
            marginLeft:'-0.2em',
            borderRadius:'100%'

          }}  />
        </span>
        {isOpen && (
          <div style={{
            
         
          }} className="dropdown-content">
            <p onClick={()=>navigate('/profile')}> <FaRegUser />My Account</p>
            <p> <FaRegListAlt />Orders</p>
            <p><MdOutlineHelpOutline />Help</p>
            <p onClick={handleLogout}
            style={{
              backgroundColor:'#FF000030',
              color:'#FF0000',
              textAlign:'center'
            }}>Log Out</p>
          </div>
        )}
      </button>
    </div>
                <button
               

                  style={{
                    padding: " 1em 3em",
                    border: "none",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "0.3em",
                    fontSize: "0.76em",
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

