import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRating } from "../../Slices/Ratings/RatingsSlices";

const GetRating = () => {
  const dispatch = useDispatch();
  const rating = useSelector((state) => state.rating.rating);
  const loading = useSelector((state) => state.rating.loading);
  const error = useSelector((state) => state.rating.error);

  useEffect(() => {
    const product_unique_id = "XbZVmZZj2YHun7s3YPHu"; // Pass the actual product unique id here
    dispatch(fetchRating(product_unique_id ));
  }, [dispatch]);

  console.log(rating)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching rating.</div>;
  }
  console.log(error)
  return (
    <div>
      <h1>Rating</h1>
      {rating.map((rating) => (
        <div key={rating.id}>
          <p>Rating: {rating.value}</p>
          <p>Comment: {rating.comment}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default GetRating;
