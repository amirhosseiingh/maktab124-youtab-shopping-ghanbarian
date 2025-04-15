import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

type StarRatingProps = {
  rating: number; 
};

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-400 text-lg gap-1">
      {Array(fullStars)
        .fill(null)
        .map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
      {hasHalfStar && <FaStarHalfAlt />}
      {Array(emptyStars)
        .fill(null)
        .map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
    </div>
  );
};

export default StarRating;
