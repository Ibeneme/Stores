import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRating } from '../../Slices/Ratings/AddRatingSlice';

const AddRatings = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.addRating);
  
  const [rating, setRating] = useState(0);
console.log(error)
  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
    
    // Dispatch the addRating action
    dispatch(addRating({ productUniqueId: 'XbZVmZZj2YHun7s3YPHu', rating: selectedRating }));
  };
console.log(error)
  return (
    <div>
      <h2>Rating: {rating} stars</h2>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= rating}
          onClick={() => handleRatingClick(star)}
        />
      ))}
    
    </div>
  );
};

const Star = ({ filled, onClick }) => (
  <span
    style={{ cursor: 'pointer', color: filled ? 'gold' : 'gray' }}
    onClick={onClick}
  >
    &#9733;
  </span>
);

export default AddRatings;
