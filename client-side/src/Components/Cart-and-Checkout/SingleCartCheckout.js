import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import "../Products/ProductPage.css";
import "./Cart.css";
//import { fetchCartData } from "../../Slices/Cart/CartSlice";
//import { fetchShippingPrice } from "../../Slices/Shipping/Shipping";
import { checkoutMultipleProducts } from "../../Slices/orders/OrderSlice";
import { payOrder } from "../../Slices/orders/OrderSlice";
import { addItemToCart } from "../../Slices/Cart/CartSlice";
//import { toast } from "react-toastify";

const SingleCartCheckout = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product_unique_id = queryParams.get("product_unique_id");
  //const shipping_unique_id = queryParams.get("shipping_unique_id");
  const quantity = queryParams.get("quantity");
  const productName = queryParams.get("productName");
  const productPrice = queryParams.get("productPrice");
  const shipps = queryParams.get("shipps");
  const shipping_unique_id = queryParams.get("shipping_unique_id");
  const imageUrl = queryParams.get("imageUrl");
  //const locationn = queryParams.get("locationn");

  console.log(imageUrl, shipping_unique_id, "imageUrl");

  // const auth = useSelector((state) => state.auth);
  const shippingPrice = useSelector((state) => state.shipping.shippingPrice);
  console.log(shippingPrice, "authhh");
  const data = useSelector((state) => state.carts);
  console.log(data, "nana");
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setError("");
    console.log(`Selected option: ${event.target.value}`);
  };

  const cart_unique_ids = data?.data?.rows?.map((item) => item.cart_unique_id);
  console.log(cart_unique_ids, "cccc");

  const [shipPrice, setShipPrice] = useState(null);
  const [thisError, setError] = useState(null);
  //const usersAddress = auth?.userData?.address;

  console.log(selectedOption, "selectedNannn");
  const handleCheckouts = async () => {
    try {
      if (selectedOption) {
        const payment_method = selectedOption;

        const responseData = await dispatch(
          addItemToCart({
            product_unique_id: product_unique_id,
            quantity: 1,
          })
        );
        if (responseData.type === "cart/addItemToCart/fulfilled") {
          console.log(responseData, "respnsess");
          const response = await dispatch(
            checkoutMultipleProducts({
              cart_unique_ids: cartUniqueIds,
              payment_method,
            })
          );

          if (response.payload.success === true) {
            const tracking_number = response?.payload?.data?.tracking_number;
            console.log(tracking_number, "trac");
            console.log("Checkout response:", response);
            try {
              const response = await dispatch(payOrder(tracking_number));
              console.log("Response:", response);
            } catch (error) {}
          }
        }
      } else {
        setError("Please select a payment method.");
        console.log("Please select a payment method.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      console.log(error);
    }
  };

  const [cartUniqueIds, setCartUniqueIds] = useState([]);
  const [newLocation, setLocation] = useState("");

  //   useEffect(() => {
  //     dispatch(fetchCartData())
  //       .then((response) => {
  //         console.log(response, "resss");
  //         if (response?.payload?.data?.rows) {
  //           const newCartUniqueIds = response.payload.data.rows.map(
  //             (item) => item.cart_unique_id
  //           );
  //           setCartUniqueIds(newCartUniqueIds);
  //           console.log(newCartUniqueIds, "cart_unique_ids");

  //           const newLocation =
  //             response.payload.data.rows[0].product_data.location;

  //           setLocation(newLocation);
  //           console.log(newLocation, "newLocation");
  //           const handleShipping = () => {
  //             console.log(
  //               response?.data?.rows?.[0].product_data.location,
  //               "response?.data?.rows?.[0].product_data.location"
  //             );

  //             dispatch(
  //               fetchShippingPrice({
  //                 fromAddress: newLocation,
  //                 toAddress: usersAddress,
  //               })
  //             )
  //               .then((action) => {
  //                 console.log("Shipping price action:", action);
  //                 console.log("Shipping price payload:", action.payload);
  //                 console.log("Shipping response data:", action.payload?.data);
  //                 setShipPrice(action.payload?.data?.price);
  //               })
  //               .catch((error) => {
  //                 console.log("Error fetching shipping price:", error);
  //               });
  //           };

  //           handleShipping();
  //         } else if (response?.payload?.message === "All Carts not found!") {
  //           toast.success("Carts moved to Orders", {
  //             position: "top-center",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             style: {
  //               backgroundColor: "#007aff", // Background color
  //               color: "white", // Text color
  //             },
  //           });
  //           navigate("/orderr");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("Error fetching cart data:", error);
  //       });
  //   }, [dispatch, usersAddress, navigate]);

  const itemTotal = productPrice * quantity;
  const grandTotals = Number(shipps) + Number(itemTotal);

  const grandTotal = parseFloat(grandTotals);

  const totalCost = productPrice * quantity;
  const addTotal = totalCost + shipps;
  const url = `${imageUrl}`;

  console.log(
    shipPrice,
    addTotal,
    setCartUniqueIds,
    newLocation,
    setLocation,
    newLocation,
    setShipPrice,
    handleCheckouts
  );

  return (
    <div
      style={{
        marginTop: 120,
      }}
    >
      <div
        style={{
          marginTop: "7em",
        }}
      >
        <div className="spread">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            ></div>

            <div className="cart-first-div" key={product_unique_id}>
              <div className="div-cart-first-div">
                <img className="img-cart-first-div" src={url} alt="cartitem" />
              </div>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginRight: "2em",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      paddingBottom: 16,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "14px",
                      }}
                      className="Product-page-h1"
                    >
                      {productName}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "2.8em",
                      }}
                    >
                      <h3
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          color: "gray",
                          marginTop: "0.3em",
                        }}
                      >
                        {" "}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "gray",
                          }}
                        >
                          {" "}
                          Unit Price:{" "}
                        </span>{" "}
                        <span
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          {" "}
                          <span>&#8358;</span>
                          {parseFloat(productPrice).toLocaleString()}
                        </span>
                      </h3>
                    </div>
                    <h3
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        color: "gray",
                        marginTop: "0.3em",
                      }}
                    >
                      {" "}
                      <span
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        {" "}
                        Qty:{""}
                        <span
                          style={{
                            marginLeft: "0.31em",
                          }}
                        >
                          {" "}
                          {quantity}
                        </span>
                      </span>
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "baseline",
                        color: "black",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <p
                style={{
                  color: "gray",
                  fontSize: "0.94em",
                  padding: 12,
                  marginTop: 24,
                  textAlign: "right",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "gray",
                  }}
                >
                  {" "}
                  Total Price:{" "}
                </span>{" "}
                <span
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  <span>&#8358;</span>
                  {itemTotal.toLocaleString()}
                </span>
              </p>
            </div>
            {/*     );
        })} */}
          </div>

          <div className="last-checkout-div">
            <h3>Order Summary</h3>
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
              <h2
                style={{
                  fontSize: "16px",
                }}
              >
                <span>&#8358;</span>
                {itemTotal.toLocaleString()}
                <span>.00</span>
              </h2>
            </div>

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
                <h4>Delivery Fee </h4>
                <p
                  className="product-title"
                  style={{
                    color: "gray",
                  }}
                >
                  Delivery fee
                </p>
              </div>
              <h2
                style={{
                  fontSize: "16px",
                }}
              >
                <span>&#8358;</span>
                {shipps.toLocaleString()}
                <span>.00</span>
              </h2>
            </div>
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
                <h4>Order Total </h4>
                <p
                  className="product-title"
                  style={{
                    color: "gray",
                  }}
                >
                  Price to be Checked Out
                </p>
              </div>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bolder",
                }}
              >
                <strong>
                  <span>&#8358;</span>
                  {grandTotal.toLocaleString()}
                  <span>.00</span>
                </strong>
              </h2>
            </div>
            <div>
              <div
                style={{
                  marginTop: "3.2em",
                }}
              >
                <div className="payment-page">
                  <label className="payment-option">
                    <input
                      type="checkbox"
                      name="payment-option"
                      value="Credit/Debit Card"
                      onChange={handleOptionChange}
                      checked={selectedOption === "Credit/Debit Card"}
                    />
                    <span className="checkmark"></span>
                    Pay with Credit Card
                  </label>
                  <label className="payment-option">
                    <input
                      type="checkbox"
                      name="payment-option"
                      value="wallet"
                      onChange={handleOptionChange}
                      checked={selectedOption === "wallet"}
                    />
                    <span className="checkmark"></span>
                    Pay with Wallet
                  </label>
                  <label className="payment-option">
                    <input
                      type="checkbox"
                      name="payment-option"
                      value="transfer"
                      onChange={handleOptionChange}
                      checked={selectedOption === "transfer"}
                    />
                    <span className="checkmark"></span>
                    Pay with Transfer
                  </label>
                </div>
              </div>
              <button
                style={{
                  fontSize: "1em",
                  marginTop: "3em",
                }}
                className="checkout-btn"
                onClick={handleCheckouts}
              >
                Pay {""} {""} {""}{" "}
                <span>&#8358;{grandTotal.toLocaleString()}</span>
              </button>
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  textAlign: "center",
                  margin: "8px 0",
                }}
              >
                {thisError}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCartCheckout;
