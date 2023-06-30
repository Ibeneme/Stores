// src/components/FavoritesPage.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../Slices/favorites/ToggleFavoriteSlice";

const FavoritesToggle = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.toggleFavorite.loading);
  const error = useSelector((state) => state.toggleFavorite.error);

  useEffect(() => {
    const product_unique_id = "LznHlabJ4WP2sMy0Vik7"; // Pass the actual product unique id here
    dispatch(toggleFavorite(product_unique_id));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error occurred while toggling favorite.</div>;
  }

  return <div>Toggle Favorite</div>;
};

export default FavoritesToggle;
