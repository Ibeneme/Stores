import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteFavorite } from "../../Slices/favorites/DeleteSlice";

const FavoriteItem = ({ favorite }) => {
  const dispatch = useDispatch();
  
  const favorite_unique_id = "E3xCxGWU2J1yFqbHaMjx";

  useEffect(() => {
    dispatch(deleteFavorite(favorite_unique_id));
  }, [dispatch, favorite_unique_id]);


  return (
    <div>
      {/* Render your favorite item */}
    </div>
  );
};

export default FavoriteItem;
