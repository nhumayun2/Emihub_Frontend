import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
  rating: number;
  numReviews?: number;
}

export default function Rating({ rating, numReviews }: RatingProps) {
  return (
    <div className="flex items-center">
      {/* Star 1 */}
      <span>
        {rating >= 1 ? (
          <FaStar className="text-yellow-500" />
        ) : rating >= 0.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </span>
      {/* Star 2 */}
      <span>
        {rating >= 2 ? (
          <FaStar className="text-yellow-500" />
        ) : rating >= 1.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </span>
      {/* Star 3 */}
      <span>
        {rating >= 3 ? (
          <FaStar className="text-yellow-500" />
        ) : rating >= 2.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </span>
      {/* Star 4 */}
      <span>
        {rating >= 4 ? (
          <FaStar className="text-yellow-500" />
        ) : rating >= 3.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </span>
      {/* Star 5 */}
      <span>
        {rating >= 5 ? (
          <FaStar className="text-yellow-500" />
        ) : rating >= 4.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </span>

      {/* Review Text */}
      {numReviews !== undefined && (
        <span className="ml-2 text-sm text-gray-500">
          ({numReviews} {numReviews === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}
