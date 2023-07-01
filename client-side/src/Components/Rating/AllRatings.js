import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRatings } from "../../Slices/Ratings/AllRatingsSlices";

const RatingsPage = () => {
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.ratings.ratings);

  const error = useSelector((state) => state.ratings.error);

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

 console.log(ratings)
 console.log(error)
  return (
    <div>
      {ratings.length > 0 ? (
        <ul>
          {ratings.map((rating) => (
            <li key={rating.id}>{rating.value}</li>
          ))}
        </ul>
      ) : (
        <div>No ratings found.</div>
      )}
    </div>
  );
};

export default RatingsPage;
