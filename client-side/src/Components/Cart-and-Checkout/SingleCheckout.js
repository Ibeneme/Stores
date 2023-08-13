// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "../Products/ProductPage.css";
// import "./Cart.css";
// import cartItemimage from "../Products/images/Rectangle 15.png";
// import Navbarr from "../Navbar-and-Footer/Navbarr";
// import { fetchCartData } from "../../Slices/Cart/CartSlice";
// import { fetchShippingPrice } from "../../Slices/Shipping/Shipping";
// import { checkoutMultipleProducts } from "../../Slices/orders/OrderSlice";

// const CheckoutSingle = () => {
//   const auth = useSelector((state) => state.auth);
//   const shippingPrice = useSelector((state) => state.shipping.shippingPrice);
//   console.log(shippingPrice, "authhh");
//   const data = useSelector((state) => state.carts);
//   console.log(data, "nana");
//   const dispatch = useDispatch();
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//     console.log(`Selected option: ${event.target.value}`);
//   };

//   const cart_unique_ids = data?.data?.rows?.map((item) => item.cart_unique_id);
//   console.log(cart_unique_ids, "cccc");

//   const [shipPrice, setShipPrice] = useState(null);
//   const [thisError, setError] = useState(null);



// const usersAddress = auth?.userData?.address;

//   useEffect(() => {
//     const handleShipping = () => {
//       dispatch(
//         fetchShippingPrice({
//           fromAddress: newLocation[0] ,
//           toAddress:usersAddress,
//         })
//       )
//         .then((action) => {
//           console.log("Shipping price action:", action);
//           console.log("Shipping price payload:", action.payload);
//           console.log("Shipping response data:", action.payload?.data);
//           setShipPrice(action.payload?.data?.price); // Logging the response data
//         })
//         .catch((error) => {
//           console.log("Error fetching shipping price:", error);
//         });
//     };

//     handleShipping();
//   }, [dispatch]);

//   console.log(selectedOption, "selectedNannn");
//   const handleCheckouts = () => {
//     if (selectedOption) {
//       const payment_method = selectedOption;
//       dispatch(checkoutMultipleProducts({ cart_unique_ids, payment_method }))
//         .then((response) => {
//           console.log("Checkout response:", response);
//         })
//         .catch((error) => {});
//     } else {
//       setError("Please select a payment method.");
//       console.log("Please select a payment method.");
//     }
//   };

//   const [cartUniqueIds, setCartUniqueIds] = useState([]);
//   const [newLocation, setLocation] = useState("");

//   useEffect(() => {
//     dispatch(fetchCartData())
//       .then((response) => {
//         console.log(response, 'resss')
//         if (response.payload?.data?.rows) {
//           const newCartUniqueIds = response.payload.data.rows.map(
//             (item) => item.cart_unique_id
//           );
//           setCartUniqueIds(newCartUniqueIds);
//           console.log(newCartUniqueIds, "cart_unique_ids");

//           const newLocation = response.payload.data.rows.map(
//             (item) => item.product_data.location
//           );
//           setLocation(newLocation);
//           console.log(newLocation, "newLocation");

//         }
//       })
//       .catch((error) => {
//         console.log("Error fetching cart data:", error);
//       });
//   }, [dispatch]);

//   const grandTotal = data?.data?.data?.rows.reduce((total, cartItem) => {
//     const itemTotal = cartItem.product_data.price * cartItem.quantity;
//     return total + itemTotal;
//   }, 0);

//   const checkoutTotal = grandTotal + shipPrice;

//   return (
//     <div>
//       <Navbarr />
//       <div
//         style={{
//           marginTop: "7em",
//         }}
//       >
//         <div className="spread">
//           <div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//               }}
//             ></div>

//             {data?.data?.data?.rows.map((cartItem) => {
//               return (
//                 <div className="cart-first-div" key={cartItem.unique_id}>
//                   <div className="div-cart-first-div">
//                     <img
//                       className="img-cart-first-div"
//                       src={cartItemimage}
//                       alt="cartitem"
//                     />
//                   </div>
//                   <div
//                     style={{
//                       width: "100%",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                         marginRight: "2em",
//                         alignItems: "baseline",
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           width: "100%",
//                         }}
//                       >
//                         <h3
//                           style={{
//                             fontSize: "14px",
//                           }}
//                           className="Product-page-h1"
//                         >
//                           {cartItem.product_data.name}
//                         </h3>

//                         {/* <h3
//                             style={{
//                               border: "none",
//                               margin: "0px",
//                               padding: "0px",
//                               fontSize: "12px",
//                               color: "gray",
//                               marginTop: "0.56em",
//                             }}
//                             className="Product-page-price"
//                           >
//                             <span>&#8358;</span>
//                             {cartItem.product_data.price}{" "}
//                             <span
//                               style={{
//                                 fontSize: "0.6em",
//                                 color: "gray",
//                               }}
//                             >
//                               Unit Price
//                             </span>
//                           </h3> */}
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "baseline",
//                             gap: "2.8em",
//                           }}
//                         >
//                           <h3
//                             style={{
//                               display: "flex",
//                               alignItems: "baseline",
//                               color: "gray",
//                               marginTop: "0.3em",
//                             }}
//                           >
//                             {" "}
//                             <span
//                               style={{
//                                 fontSize: "12px",
//                                 color: "gray",
//                               }}
//                             >
//                               {" "}
//                               Total Price:{" "}
//                             </span>{" "}
//                             <span
//                               style={{
//                                 fontSize: "14px",
//                               }}
//                             >
//                               {" "}
//                               <span>&#8358;</span>
//                               {cartItem.product_data.price * cartItem.quantity}
//                             </span>
//                           </h3>
//                         </div>
//                         <h3
//                           style={{
//                             display: "flex",
//                             alignItems: "baseline",
//                             color: "gray",
//                             marginTop: "0.3em",
//                           }}
//                         >
//                           {" "}
//                           <span
//                             style={{
//                               fontSize: "14px",
//                             }}
//                           >
//                             {" "}
//                             Qty:{""}
//                             <span
//                               style={{
//                                 marginLeft: "0.31em",
//                               }}
//                             >
//                               {" "}
//                               {cartItem.quantity}
//                             </span>
//                           </span>
//                         </h3>
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             width: "100%",
//                             alignItems: "baseline",
//                             color: "black",
//                           }}
//                         ></div>
//                       </div>
//                     </div>

//                     <p
//                       style={{
//                         color: "gray",
//                         fontSize: "0.94em",
//                       }}
//                     >
//                       {cartItem.title}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="last-checkout-div">
//             <h3>Order Summary</h3>
//             <br />

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 borderTop: "0.03em solid #66666635",
//                 paddingTop: " 01.2em",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <h4>Cart Total </h4>
//                 <p
//                   className="product-title"
//                   style={{
//                     color: "gray",
//                   }}
//                 >
//                   Delivery fees not included yet
//                 </p>
//               </div>
//               <h2
//                 style={{
//                   fontSize: "16px",
//                 }}
//               >
//                 <span>&#8358;</span>
//                 {grandTotal}
//                 <span>.00</span>
//               </h2>
//             </div>

//             <br />

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 borderTop: "0.03em solid #66666635",
//                 paddingTop: " 01.2em",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <h4>Delivery Fee </h4>
//                 <p
//                   className="product-title"
//                   style={{
//                     color: "gray",
//                   }}
//                 >
//                   Delivery fee
//                 </p>
//               </div>
//               <h2
//                 style={{
//                   fontSize: "16px",
//                 }}
//               >
//                 <span>&#8358;</span>
//                 {shipPrice}
//                 <span>.00</span>
//               </h2>
//             </div>
//             <br />

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 borderTop: "0.03em solid #66666635",
//                 paddingTop: " 01.2em",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <h4>Order Total </h4>
//                 <p
//                   className="product-title"
//                   style={{
//                     color: "gray",
//                   }}
//                 >
//                   Price to be Checked Out
//                 </p>
//               </div>
//               <h2
//                 style={{
//                   fontSize: "20px",
//                   fontWeight: "bolder",
//                 }}
//               >
//                 <strong>
//                   <span>&#8358;</span>
//                   {checkoutTotal}
//                   <span>.00</span>
//                 </strong>
//               </h2>
//             </div>
//             <div>
//               <div
//                 style={{
//                   marginTop: "3.2em",
//                 }}
//               >
//                 <div className="payment-page">
//                   <label className="payment-option">
//                     <input
//                       type="checkbox"
//                       name="payment-option"
//                       value="credit-card"
//                       onChange={handleOptionChange}
//                       checked={selectedOption === "credit-card"}
//                     />
//                     <span className="checkmark"></span>
//                     Pay with Credit Card
//                   </label>
//                   <label className="payment-option">
//                     <input
//                       type="checkbox"
//                       name="payment-option"
//                       value="wallet"
//                       onChange={handleOptionChange}
//                       checked={selectedOption === "wallet"}
//                     />
//                     <span className="checkmark"></span>
//                     Pay with Wallet
//                   </label>
//                   <label className="payment-option">
//                     <input
//                       type="checkbox"
//                       name="payment-option"
//                       value="transfer"
//                       onChange={handleOptionChange}
//                       checked={selectedOption === "transfer"}
//                     />
//                     <span className="checkmark"></span>
//                     Pay with Transfer
//                   </label>
//                 </div>
//               </div>
//               <button
//                 style={{
//                   fontSize: "1em",
//                   marginTop: "3em",
//                 }}
//                 className="checkout-btn"
//                 onClick={handleCheckouts}
//               >
//                 Pay {""} {""} {""} <span>&#8358;{checkoutTotal}</span>
//               </button>
//               <p
//                 style={{
//                   color: "red",
//                   fontSize: "14px",
//                   textAlign: "center",
//                   margin: "8px 0",
//                 }}
//               >
//                 {thisError}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutSingle;
