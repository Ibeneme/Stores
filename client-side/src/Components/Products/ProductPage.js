import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { productsFetch } from "../../Slices/Products/productSlice";
import Footer from "../Navbar-and-Footer/Footer";
import Loader from "../Loader/Loader";
import { addItemToCart } from "../../Slices/Cart/CartSlice";
import sample from "./images/Rectangle 15.png";
import "./ProductPage.css";
import { MdLocationOn } from "react-icons/md";
import { BiMinus } from "react-icons/bi";
import { RxPlus } from "react-icons/rx";
import { removeFromCart } from "../../Slices/cartSlice";
import Navbarr from "../Navbar-and-Footer/Navbarr";

const ProductPage = () => {
  // Remove unused cartItem parameter
  // const cart = useSelector((state) => state.cart);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user_unique_id = queryParams.get("user_unique_id");
  const unique_id = queryParams.get("unique_id");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartQuantity, setCartQuantity] = useState(0);

  const handleRemoveFromCart = (cartItem) => {
    if (cartQuantity > 0) {
      dispatch(removeFromCart(cartItem));
      setCartQuantity(cartQuantity - 1);
    }
  };

  const {
    items: details,
    status,
    error,
  } = useSelector((state) => state.productsDetails);

  const box = details?.data?.unique_id; // Use optional chaining to handle undefined values
  console.log(box);
  const shipping_id = details?.data?.price;
  console.log("shipping", shipping_id);
  const Shipping_location = details?.data?.location;
  console.log(Shipping_location);
  const sellers = details?.data?.user_data?.seller_location;
  console.log("track", unique_id);

  const [itemData, setItemData] = useState({
    product_unique_id: unique_id,
    shipping_fee: shipping_id,
    from_address: sellers,
    to_address: Shipping_location,
    quantity: 1,
  });

  console.log("jer", itemData);

  const handleAddToCart = () => {
    setItemData(itemData);
    dispatch(addItemToCart(itemData));
    navigate("/newcart");
    console.log("done", itemData);
  };

  useEffect(() => {
    console.log(user_unique_id);
    dispatch(productsFetch({ user_unique_id, unique_id }));
  }, [dispatch, user_unique_id, unique_id]);

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "rejected") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbarr />
      {details && details.data && (
        <div>
          <div className="Product-page-first-div">
            <div className="Product-page-second-div">
              <div className="Product-page-third-div">
                <div>
                  <img
                    src={sample}
                    alt="im"
                    className="Product-image-first-image"
                  />
                </div>

                <div className="Product-flex-on-web-right">
                  <h3 className="Product-page-h1">
                    <b>{details.data.name}</b>
                  </h3>
                  <p className="Product-page-location">
                    {" "}
                    <MdLocationOn /> {details.data.location}
                  </p>
                  <p className="Product-page-Short-description">
                    Short Description: {details.data.description}
                  </p>

                  <h3 className="Product-page-price">
                    <span>&#8358;</span>
                    {details.data.price}
                  </h3>
                  <p className="Product-page-remaining">
                    Only{" "}
                    <span className="Product-page-span-remaining">
                      {details.data.remaining} {""}items
                    </span>{" "}
                    remaining Order while stock last.
                  </p>
                  <div>
                    <div>
                      <div className="product-page-btns">
                        <div className="product-page-add-and-remove-button-div">
                          <button
                           
                            className="product-page-add-or-remove-btn"
                            onClick={() => handleRemoveFromCart(details.data)}
                          >
                            <BiMinus />
                          </button>
                          <p className="product-page-quantity">
                            {cartQuantity}
                          </p>
                          <button
                            onClick={() => handleAddToCart(details.data)}
                            className="product-page-add-or-remove-btn"
                          >
                            <RxPlus /> {/* Fix component name */}
                          </button>
                        </div>
                        <button
                          style={{
                            height: "50px",
                          }}
                          className="product-page-add-to-cart-btn"
                        >
                          {cartQuantity > 0 ? (
                            <p onClick={() => navigate("/cart")}>
                              View your Cart
                            </p>
                          ) : (
                            <p onClick={() => handleAddToCart()}>Add to Cart</p>
                          )}
                        </button>
                      </div>

                      <button
                        style={{
                          height: "50px",
                        }}
                        className="product-page-buy-now-btn"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="Product-page-product-full-description-div">
                <h4>Product Description</h4>
                <p className="Product-page-long-description">
                  {details.data.description}: Lorem ipsum dolor sit amet
                  consectetur. Sit neque posuere auctor euismod pharetra
                  pellentesque. Faucibus eu nunc lorem non facilisis. Ipsum
                  ipsum elementum aliquet morbi eget sodales in massa. Metus
                  scelerisque pharetra diam orci pretium non. Etiam ipsum nisl
                  ipsum egestas sed. Lorem ipsum dolor sit amet consectetur. Sit
                  neque posuere auctor euismod pharetra pellentesque. Faucibus
                  eu nunc lorem non facilisis. Ipsum ipsum elementum aliquet
                  morbi eget sodales in massa. Metus scelerisque pharetra diam
                  orci pretium non. Etiam ipsum nisl ipsum egestas sed.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3em",
                }}
              >
                <p>Seller</p>
                <img
                  alt="alt"
                  width="33em"
                  src={details.data.user_data.photo}
                />
                <h4>
                  {details.data.user_data.firstname}
                  {""} {details.data.user_data.lastname}
                  {""} {details.data.user_data.middlename}
                </h4>
                <p>{details.data.user_data.email}</p>
                <p>{details.data.user_data.phone_number}</p>
              </div>
              <div className="Product-page-product-full-description-div">
                <h4>More Items Like this</h4>
                <p className="Product-page-long-description">View More items</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductPage;
