// Component
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorite } from "../../Slices/favorites/GetFavoriteSlice";

const FavoritePage = () => {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite.favorite);

  useEffect(() => {
    const product_unique_id = "LznHlabJ4WP2sMy0Vik7"; // Pass the actual product unique id here
    dispatch(fetchFavorite(product_unique_id));
  }, [dispatch]);


  return (
    <div>
      {Array.isArray(favorite) && favorite.length > 0 ? (
        <ul>
          {favorite.map((favorite) => (
            <li key={favorite.id}>{favorite.name}</li>
          ))}
        </ul>
      ) : (
        <div>No favorite found.</div>
      )}
    </div>
  );
};

export default FavoritePage;
