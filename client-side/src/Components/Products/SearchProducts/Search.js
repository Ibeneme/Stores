import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProducts } from "../../../Slices/Products/SearchAllProductsSlice";
import clearSearchResults from "../../../Slices/Products/SearchAllProductsSlice";
import Footer from "../../Navbar-and-Footer/Footer";
import Loader from "../../Loader/Loader";
import { addToCart } from "../../../Slices/cartSlice";
import Navbar from "../../Navbar-and-Footer/Navbar";
import illustration from "../images/Plugin/Search.png";
import Navbarr from "../../Navbar-and-Footer/Navbarr";
import sampleproductimage from "../images/Re.png";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");
  console.log(searchQuery);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClick = (user_unique_id, unique_id) => {
    if (user_unique_id && unique_id) {
      navigate(
        `/product?user_unique_id=${user_unique_id}&unique_id=${unique_id}`
      );
      console.log("see", user_unique_id, unique_id);
    }
  };

  const handleCategoryClick = (category_unique_id) => {
    navigate(`/category?category_unique_id=${category_unique_id}`);
    console.log("cattt", category_unique_id);
  };

  const handleLocationClick = (location_unique_id) => {
    navigate(`/location?location_unique_id=${location_unique_id}`);
    console.log("location", location_unique_id);
  };

  const handleLocationCategoriesClick = (
    category_unique_id,
    location_unique_id
  ) => {
    navigate(
      `/category/location?category_unique_id=${category_unique_id}&location_unique_id=${location_unique_id}`
    );
    console.log("lls", category_unique_id, location_unique_id);
  };

  const {
    items: details,
    status,
    errors,
  } = useSelector((state) => state.search);
  console.log(details);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchProducts({ searchForProduct: searchQuery }));
    }
  }, [dispatch, searchQuery]);

  const handleClearSearchResults = () => {
    dispatch(clearSearchResults());
  };

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "rejected" && errors) {
    return (
      <div>
        {errors.map((error, index) => (
          <div key={index}>Error: {error}</div>
        ))}
      </div>
    );
  }

  const renderRows = () => {
    if (details && details.data && details.data.rows) {
      return details.data.rows.map((row) => (
        <div className="products-displayed-home" key={`${row.id}`}>
          <div className="products-displayed">
            <img
              onClick={() =>
                handleClick(row.user_data.user_unique_id, row.unique_id)
              }
              className=""
              src={sampleproductimage}
              alt={row.name}
              width="100%"
            />
          </div>
          <div
            className="products-displayed-home-div"
            onClick={() =>
              handleClick(row.user_data.user_unique_id, row.unique_id)
            }
          >
            <h4 className="products-displayed-home-h4">{row.name}</h4>

            {/* <p
          onClick={() => handleLocationClick(product.location)}
          className="product-title"
        >
          {product.location}
        </p> */}
            <p
              onClick={() =>
                handleLocationCategoriesClick(
                  row.category_data.category_unique_id,
                  row.location
                )
              }
              className="products-displayed-home-location"
            >
              {row.location}
            </p>

            <p className="products-displayed-home-price">
              <b>
                <span className="naira-price-span">&#8358;</span>
              </b>
              {row.price}
              <span className="naira-price-span">.00</span>
            </p>
          </div>
          <button
            className="products-displayed-home-btn"
            onClick={() => handleAddToCart(row)}
          >
            Add to Cart
          </button>
        </div>
      ));
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginTop: "3em",
            }}
          >
            <img width="300px" src={illustration} alt="Search Results" />
            <br />
            <h2
              style={{
                marginTop: "2em",
              }}
            >
              No Results Found
            </h2>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Navbarr />
      <div style={{ marginTop: "10em" }} className="div-style-first">
        <h2>
          Results for{" "}
          <span
            style={{
              backgroundColor: "#386aeb",
              color: "white",
              padding: "0.3em",
            }}
          >
            {searchQuery}
          </span>
        </h2>
        {details && details.data && details.data.rows ? (
          <div className="categories-display-div">{renderRows()}</div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                marginTop: "3em",
              }}
            >
              <img width="300px" src={illustration} alt="Search Results" />
              <br />
              <h2
                style={{
                  marginTop: "2em",
                }}
              >
                No Results Found
              </h2>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Search;
