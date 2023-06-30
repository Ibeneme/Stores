import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorite, deleteFavoriteActions } from "../../Slices/favorites/DeleteSlice";

const FavoriteItem = ({ favorite }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deleteFavorite.loading);
  const error = useSelector((state) => state.deleteFavorite.error);

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
