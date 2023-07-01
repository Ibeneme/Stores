import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../../Slices/favorites/FavSlices";

const FavoritesComponent = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
 
  console.log(favorites);
  
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);


  return (
    <div>
    {Array.isArray(favorites) && favorites.length > 0 ? (
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.name}</li>
        ))}
      </ul>
    ) : (
      <div>No favorite found.</div>
    )}
  </div>
  );
};

export default FavoritesComponent;

