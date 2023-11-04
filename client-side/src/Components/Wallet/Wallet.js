// import React, { useEffect, useState } from "react";
// import "./wallet.css";
// import { IoWallet } from "react-icons/io5";
// import { MdOutlineAddCircleOutline, MdOutlineSend } from "react-icons/md";
// import { useDispatch } from "react-redux";
// import { fetchAllTransactions } from "../../Slices/Transaction/TransactionSlice";
// import ShimmerLoader from "../Loader/Shima";
// import ill from "../Orders/image/No data found.png";
// import { useNavigate } from "react-router";
// import { BsFillCreditCard2BackFill } from "react-icons/bs";



// const Wallet = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState("");
//   const [transactions, setTransactions] = useState("");
//   const amount = { amount: 102345.67 };
//   const handleFetchTransactions = () => {
//     setLoading(true);
//     dispatch(fetchAllTransactions())
//       .then((response) => {
//         setLoading(false);
//         console.log("Data:", transactions?.payload?.data?.rows);
//         setTransactions(response);
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.error("Error:", error);
//       });
//   };

//   useEffect(() => {
//     handleFetchTransactions();
//   }, [handleFetchTransactions()]);

//   return (
//     <div
//       style={{
//         marginTop: 120,
//       }}
//     >
//       <div className="wallet-first-div">
//         <div>
//           {/* <img
//             className="wallet-image"
//             src={yourImage}
//             alt="walletDescription"
//           /> */}
//           <div className="wallet-first-div-balance">
//             <div
//               style={{
//                 alignItems: "center",
//               }}
//             >
//               <p>Wallet Balance</p>
//               <span
//                 style={{
//                   display: "flex",
//                   alignItems: "baseline",
//                   marginTop: 12,
//                 }}
//               >
//                 {" "}
//                 {/* <p>NGN</p> */}
//                 <h2>
//                   {" "}
//                   {amount.amount?.toLocaleString("en-NG", {
//                     style: "currency",
//                     currency: "NGN",
//                   })}
//                 </h2>
//               </span>
//             </div>
//             <div
//               style={{
//                 fontSize: 48,
//                 backgroundColor: "#ffffff21",
//                 width: 64,
//                 height: 64,
//                 borderRadius: 48,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 display: "flex",
//               }}
//             >
//               <IoWallet
//                 style={{
//                   fontSize: 28,
//                   color: "white",
//                 }}
//               />
//             </div>
//           </div>

//           <div className="deposit-withdraw">
//             <div className="deposit-withdraw-border">
//               <div className="deposit-button">
//                 <h3 className="deposit-button-h3">Deposit</h3>
//                 <MdOutlineAddCircleOutline />
//               </div>
//               <div className="deposit-button">
//                 <h3 className="deposit-button-h3">Withdraw</h3>
//                 <MdOutlineSend />
//               </div>{" "}
//             </div>
//           </div>

//           <div>
//             <div>
//               <div>
//                 <div>{loading ? <ShimmerLoader /> : <div></div>}</div>
//                 {transactions?.type ===
//                 "transaction/fetchAllTransactions/rejected" ? (
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       padding: "48px",
//                     }}
//                   >
//                     <p
//                       style={{
//                         textAlign: "center",
//                       }}
//                     >
//                       You have no Orders
//                     </p>
//                     <img width="300px" src={ill} alt="not" />
//                     <button
//                       style={{
//                         padding: "12px 32px",
//                         backgroundColor: "#386AEB",
//                         color: "white",
//                         border: "none",
//                         height: "55px",
//                         borderRadius: "6px",
//                       }}
//                       onClick={() => navigate("/")}
//                     >
//                       Start Shopping
//                     </button>
//                   </div>
//                 ) : null}

//                 <div
//                   style={{
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     color: "black",
//                     border: "1px solid #00000025",
//                     borderRadius: 24,
//                   }}
//                 >
//                   {transactions &&
//                     transactions?.payload?.data?.rows?.map((transactions) => (
//                       <div
//                         key={transactions.unique_id}
//                         style={{
//                           width: "100%",
//                           display: "flex",
//                           justifyContent: "space-between",
//                           color: "black",
//                           alignItems: "center",
//                           padding: 12,
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: "100%",
//                             display: "flex",
//                             gap: 12,
//                             alignItems: "center",
//                           }}
//                         >
//                           <div>
//                             {transactions?.payment_method ===
//                             "Credit/Debit Card" ? (
//                               <div
//                                 style={{
//                                   fontSize: 48,
//                                   backgroundColor:
//                                     transactions.transaction_status ===
//                                     "Completed"
//                                       ? "#17993321"
//                                       : "#ff000021",
//                                   width: 48,
//                                   height: 48,
//                                   borderRadius: 48,
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                   display: "flex",
//                                 }}
//                               >
//                                 <BsFillCreditCard2BackFill
//                                   style={{
//                                     fontSize: 24,
//                                     color:
//                                       transactions.transaction_status ===
//                                       "Completed"
//                                         ? "#179933"
//                                         : "#ff0000",
//                                   }}
//                                 />
//                               </div>
//                             ) : null}
//                           </div>

//                           <div>
//                             <h4> {transactions.type}</h4>
//                             <p
//                               style={{
//                                 color: "gray",
//                                 fontSize: 14,
//                               }}
//                             >
//                               {" "}
//                               {transactions.payment_method}
//                             </p>
//                           </div>
//                         </div>

//                         <div
//                           style={{
//                             width: "100%",
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "flex-end",
//                           }}
//                         >
//                           <p>
//                             {" "}
//                             {transactions.amount?.toLocaleString("en-NG", {
//                               style: "currency",
//                               currency: "NGN",
//                             })}
//                           </p>
//                           <p
//                             style={{
//                               color: "gray",
//                               fontSize: 12,
//                             }}
//                           >
//                             {transactions.createdAt?.time}
//                           </p>
//                         </div>

//                         {/*  <p> {transactions.amount}</p>
//                         <p> {transactions.transaction_status}</p>
//                         <p> {transactions.createdAt?.time}</p>
//                         <p> {transactions.createdAt?.fulldate}</p> */}
//                       </div>
//                     ))}
//                 </div>

//                 <div></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wallet;
