import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData } from "../../../Slices/Cart/CartSlice";
import { useLocation } from "react-router";
import { productsFetch } from "../../../Slices/Products/productSlice";

const CartComponent = () => {
  const cartData = useSelector((state) => state.carts.data.data);
  const isLoading = useSelector((state) => state.carts.loading);
  const error = useSelector((state) => state.carts.error);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user_unique_id = queryParams.get("user_unique_id");
  const unique_id = queryParams.get("unique_id");

  console.log(cartData);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    console.log(user_unique_id);
    dispatch(productsFetch({ user_unique_id, unique_id }));
  }, [dispatch, user_unique_id, unique_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {cartData && cartData.rows && cartData.rows.length > 0 ? (
        <ul>
          {cartData.rows.map((item) => (
            <li key={item.unique_id}>{item.product_data.name}</li>
          ))}
        </ul>
      ) : (
        <div>
          No items in the cart. Good Evening team.. i was called yesterday by
          the Project Manager, then i realized we are to work on the Buyers user
          end.. not sellers, currently.. i have updated the UI.. On Sellers.. to
          be able to add, drafts product.. and delete product at 50%.. my
          apologies.. the buyers end of Cart, shipping and Checkout will be
          fixed by next week.. thank you... so on our inhouse presentation
          today, i will be on the 50% of screens i have done for the sellers.. 

          I accept blames for this.. but i also suggest if a timeline is set so it could serve as a guide.. 
          thank you.
        </div>
      )}
    </div>
  );
};

export default CartComponent;
