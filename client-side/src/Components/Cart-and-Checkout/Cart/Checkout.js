import React, { useEffect, useState } from "react";

const Checkout = () => {
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
