import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { categoryFetch } from "../../Slices/Products/CategoriesSlices";
import Loader from "../Loader/Loader";
import { addToCart } from "../../Slices/cartSlice";
import Navbarr from "../Navbar-and-Footer/Navbarr";

const Categories = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category_unique_id = queryParams.get("category_unique_id");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryFetch({ category_unique_id }));
  }, [dispatch, category_unique_id]);

  const {
    items: details,
    status,

  } = useSelector((state) => state.categories);

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

  const handleLocationCategoriesClick = (
    category_unique_id,
    location_unique_id
  ) => {
    navigate(
      `/category/location?category_unique_id=${category_unique_id}&location_unique_id=${location_unique_id}`
    );
    console.log("lls", category_unique_id, location_unique_id);
  };

  let content = null;

  if (status === "pending") {
    content = <Loader />;
  } else if (status === "rejected") {
    content = <div>Error: </div>;
  } else if (details?.data?.category_data && details?.data?.rows) {
    const { category_data, rows } = details?.data;

    content = (
      <div
        style={{
          backgroundColor: "#fff",
        }}
      >
        {category_data && (
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.2em",
              marginTop: "7em",
            }}
          >
            {category_data.name}
          </h2>
        )}
        <div className="categories-display-div">
          {rows?.map((product, index) => (
            <div
              className="products-displayed-home"
              key={`${product.id}-${index}`}
            >
              <div className="products-displayed">
                <img
                  onClick={() =>
                    handleClick(
                      product.user_data.user_unique_id,
                      product.unique_id
                    )
                  }
                  className=""
                  src={product?.product_images_data?.[0]?.image?.url}
                  alt={product.name}
                  width="100%"
                  height="180px"
                />
              </div>
              <div
                className="products-displayed-home-div"
                onClick={() =>
                  handleClick(
                    product.user_data.user_unique_id,
                    product.unique_id
                  )
                }
              >
                <h4 className="products-displayed-home-h4">{product.name}</h4>

                {/* <p
                      onClick={() => handleLocationClick(product.location)}
                      className="product-title"
                    >
                      {product.location}
                    </p> */}
                <p
                  onClick={() =>
                    handleLocationCategoriesClick(
                      product.category_data.category_unique_id,
                      product.location
                    )
                  }
                  className="products-displayed-home-location"
                >
                  {product.location}
                </p>

                <p className="products-displayed-home-price">
                  <b>
                    <span className="naira-price-span">&#8358;</span>
                  </b>
                  {product.price}
                  <span className="naira-price-span">.00</span>
                </p>
              </div>
              <button
                className="products-displayed-home-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbarr/>
      <div className="div-style-first">
        {console.log("lls", category_unique_id)}
        {content}
      </div>
    </div>
  );
};

export default Categories;
