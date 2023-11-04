import React, { useEffect, useState } from "react";
import React from "react";
import { usePaystackPayment } from "react-paystack";
const Checkout = () => {
const config = {
  reference: new Date().getTime().toString(),
  email: "user@example.com",
  amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx",
};

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};

const PaystackHookExample = () => {
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};





  const [data, setCartResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCartData());
        console.log(response.data, "setCartResponse");
        setCartResponse(response.payload);
      } catch (error) {}
    };

    fetchData();
  }, [dispatch]);

  console.log(data)
  return <div>Checkout</div>;
};

export default Checkout;
