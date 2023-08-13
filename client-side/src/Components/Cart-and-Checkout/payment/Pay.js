import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makePayment } from "../../../Slices/orders/OrderSlice";

const Pay = () => {
  const dispatch = useDispatch();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");
  const [error, setError] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    // Validate inputs here if needed

    // Dispatch the makePayment action with payment data
    try {
      await dispatch(
        makePayment({
          cardNumber,
          expiry,
          cvc,
        })
      );

      // Handle successful payment here if needed
    } catch (error) {
      // Handle payment error
      setError("Payment failed. Please check your details.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          width: "fit-content",
          padding: "24px",
          backgroundColor: "white",
          display: "flex",
          margin: "12em 0",
          flexDirection: "column",
        }}
      >
        <h2>Pay with Card</h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "48px",
          }}
          onSubmit={handlePayment}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            Card Number
            <input
              className="input-forms"
              type="text"
              value={cardNumber}
              placeholder="Enter your Card Number"
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            Expiry (MM/YY)
            <input
              className="input-forms"
              type="text"
              placeholder="Enter your Card Expiry date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            CVC
            <input
              className="input-forms"
              type="text"
              placeholder="Enter your Card CVC"
              value={cvc}
              onChange={(e) => setCVC(e.target.value)}
            />
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              height: "50px",
              marginTop: "32px",
            }}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pay;
