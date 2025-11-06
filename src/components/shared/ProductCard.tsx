"use client";

import { IProduct } from "@/types";
import Link from "next/link";
import Image from "next/image"; // Use Next.js Image for optimization
import Rating from "../ui/Rating";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@/store/cartStore"; // <-- NEW: Import cart store

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore(); // <-- NEW: Get addItem action

  // Updated Add to Cart function
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link from navigating
    e.stopPropagation(); // Stop event bubbling
    
    addItem(product, 1); // <-- NEW: Call the store action, add 1
    
    console.log("Adding to cart:", product.name);
    // We can add a "toast" notification here later
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <Link href={`/product/${product._id}`} className="block">
        {/* Product Image */}
        <div className="relative h-64 w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="p-5">
          {/* Category/Brand */}
          <span className="mb-1 inline-block text-xs font-semibold uppercase tracking-wide text-indigo-600">
            {product.brand}
          </span>

          {/* Product Name */}
          <h3 className="truncate text-xl font-bold text-gray-900">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-2">
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {/* Format price with BDT symbol (Taka) */}
              &#2547; {product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button (Appears on hover) */}
      <button
        onClick={handleAddToCart}
        className="absolute bottom-6 right-5 z-10 flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-indigo-600 text-white opacity-0 shadow-lg transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-indigo-700"
        aria-label="Add to cart"
      >
        <FaShoppingCart className="h-5 w-5" />
      </button>
    </div>
  );
}