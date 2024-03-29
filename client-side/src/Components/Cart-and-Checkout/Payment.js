import React from "react";
import { usePaystackPayment } from "react-paystack";
const config = {
  reference: new Date().getTime().toString(),
  email: "user@example.com",
  amount: 20000,
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

function Pay() {
  return (
    <div className="Pay">
      <header className="Pay-header">
      
        <p>
          Edit <code>src/Pay.js</code> and save to reload.
        </p>
        <a
          className="Pay-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <PaystackHookExample />
    </div>
  );
}

export default Pay;
