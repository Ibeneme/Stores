// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "../../Products/ProductPage.css";
// import "../Cart.css";
// import { BiMinus } from "react-icons/bi";
// import cartItemimage from "../../Products/images/Rectangle 15.png";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { RxPlus } from "react-icons/rx";
// import { fetchCartData } from "../../../Slices/Cart/CartSlice";
// import {
//   deleteCartItem,
//   increaseCartItemQuantity,
//   decreaseCartItemQuantity,
//   clearCart,
// } from "../../../Slices/Cart/CartSlice";
// import { fetchShippingPrice } from "../../../Slices/Shipping/Shipping";
// import { addToCart, decreaseCart } from "../../../Slices/cartSlice";

// const Cart = () => {
//   const cartData = useSelector((state) => state.cart);
//   const shippingPrice = useSelector((state) => state.shipping.shippingPrice);
//   console.log(shippingPrice, "authhh");

//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false);
//   const [displayModal, setDisplayModal] = useState(false);

//   const storedItem = localStorage.getItem("carts");
//   const data = JSON.parse(storedItem);
//   console.log(JSON.parse(storedItem), "loll");

//   const testAddress = data?.data?.data?.rows[0].product_data.location;

//   console.log(testAddress, "biggg");
//   const handleShipping = () => {
//     dispatch(
//       fetchShippingPrice({
//         fromAddress: "Port Harcourt",
//         toAddress: "Port harcourt",
//       })
  
//     )
//       .then((action) => {
//         console.log(action);
//         console.log(action.payload);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleDeleteButtonClick = () => {
//     setDisplayModal(true);
//   };

//   const handleDeleteConfirmation = () => {
//     setDisplayModal(false);
//   };

//   useEffect(
//     (data) => {
//       dispatch(fetchCartData(data));
//     },
//     [dispatch]
//   );

//   const handleCheckout = () => {
//     setShowModal(true);
//     handleShipping();
//     console.log(data);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleClearCartClick = () => {
//     setIsModalOpen(true);
    
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleClearCart = async () => {
//     try {
//       const response = await dispatch(clearCart());
//       dispatch(fetchCartData(data));
//       setIsModalOpen(false);
//       console.log("Item added to cart:", response.payload);
//     } catch (error) {
//       console.log("Error adding item to cart:", error);
//     }
//   };

//   const handleDeleteThisToCart = async (unique_id) => {
//     try {
//       const response = await dispatch(dispatch(deleteCartItem(unique_id)));
//       dispatch(fetchCartData(data));

//       console.log("Item added to cart:", response.payload);
//     } catch (error) {
//       console.log("Error adding item to cart:", error);
//     }
//   };

//   const handledecrease = async (unique_id) => {
//     dispatch(decreaseCart(unique_id))
//     const itemData = unique_id;

//     try {
//       const response = await dispatch(decreaseCartItemQuantity(itemData));
//       dispatch(fetchCartData());

//       console.log("Item added to cart:", response.payload);
//     } catch (error) {
//       console.log("Error adding item to cart:", error);
//     }
//   };
//   console.log(data?.data?.data?.rows, "here cart");

//   const grandTotal = data?.data?.data?.rows.reduce((total, cartItem) => {
//     const itemTotal = cartItem.product_data.price * cartItem.quantity;
//     return total + itemTotal;
//   }, 0);

//   const handleIncrease = async (unique_id) => {
//     dispatch(addToCart(unique_id))
//     const itemData = unique_id;
//     try {
//       const response = await dispatch(increaseCartItemQuantity(itemData));
//       dispatch(fetchCartData());

//       console.log("Item added to cart:", response.payload);
//     } catch (error) {
//       console.log("Error adding item to cart:", error);
//     }
//   };
//   console.log(data);

//   return (
//     <div>
//       <div style={{ marginTop: "7em" }}>
//         {/* Check if cartData.cartItems exists */}
//         {cartData?.cartItems? (
//           cartData?.cartItems?.length === 0 ? (
//             // Render when cartItems is an empty array
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               {/* ... Your empty cart content ... */}
//             </div>
//           ) : (
//             // Render when cartItems has items
//             <div className="spread">
//               <div>
//                 <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                   {/* ... Clear Cart button and modal code ... */}
//                 </div>
//                 {/* Render the cart items using .map */}
//                 {cartData?.cartItems.map((cartItem) => (
//                   <div className="cart-first-div" key={cartItem.unique_id}>
//                     <div className="div-cart-first-div">
//                       <img
//                         className="img-cart-first-div"
//                         src={cartItemimage}
//                         alt="cartitem"
//                       />
//                     </div>
//                     <div style={{ width: "100%" }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "row",
//                           justifyContent: "space-between",
//                           marginRight: "2em",
//                           alignItems: "baseline",
//                         }}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             width: "100%",
//                           }}
//                         >
//                           <h3
//                             style={{ fontSize: "14px" }}
//                             className="Product-page-h1"
//                           >
//                             {cartItem?.product_data?.name}
//                           </h3>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "baseline",
//                               gap: "2.8em",
//                             }}
//                           >
//                             <h3
//                               style={{
//                                 display: "flex",
//                                 alignItems: "baseline",
//                                 color: "gray",
//                                 marginTop: "0.3em",
//                               }}
//                             >
//                               <span style={{ fontSize: "12px", color: "gray" }}>
//                                 Total Price:{" "}
//                               </span>
//                               <span style={{ fontSize: "14px" }}>
//                                 <span>&#8358;</span>
//                                 {cartItem?.product_data?.price *
//                                   cartItem.quantity}
//                               </span>
//                             </h3>
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "space-between",
//                               width: "100%",
//                               alignItems: "baseline",
//                               color: "black",
//                             }}
//                           >
//                             <div
//                               style={{ margin: "1em 0" }}
//                               className="product-page-add-and-remove-button-div"
//                             >
//                               <button
//                                 className="product-page-add-or-remove-btn"
//                                 onClick={() =>
//                                   handledecrease(cartItem.unique_id)
//                                 }
//                               >
//                                 <BiMinus />
//                               </button>
//                               <p className="product-page-quantity">
//                                 {" "}
//                                 {cartItem.quantity}
//                               </p>
//                               <button
//                                 onClick={() =>
//                                   handleIncrease(cartItem.unique_id)
//                                 }
//                                 className="product-page-add-or-remove-btn"
//                               >
//                                 <RxPlus />
//                               </button>
                             
//                             </div>
//                             <button
//                               style={{
//                                 backgroundColor: "white",
//                                 border: "gray 1px solid",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 padding: "0.3em",
//                                 borderRadius: "2em",
//                                 width: "2.4em",
//                                 height: "2.4em",
//                                 marginLeft: "1.4em",
//                               }}
//                               onClick={handleDeleteButtonClick}
//                             >
//                               <span
//                                 style={{
//                                   fontSize: "1.3em",
//                                   marginTop: "0.1em",
//                                 }}
//                               >
//                                 <RiDeleteBin6Line />
//                               </span>
//                             </button>
//                           </div>
//                         </div>
//                         {displayModal && (
//                           <div
//                             style={{
//                               position: "fixed",
//                               top: 0,
//                               left: 0,
//                               width: "100%",
//                               height: "100%",
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               backgroundColor: "rgba(0, 0, 0, 0.5)",
//                               zIndex: 9999,
//                             }}
//                           >
//                             {/* ... Modal code ... */}
//                           </div>
//                         )}
//                       </div>
//                       <p style={{ color: "gray", fontSize: "0.94em" }}>
//                         {cartItem.title}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="last-checkout-div">
//                 {/* ... Rest of your cart summary section ... */}
//               </div>
//             </div>
//           )
//         ) : null}
//         {/* Rest of your JSX */}
//       </div>
//     </div>
//   );
// };

// export default Cart;
