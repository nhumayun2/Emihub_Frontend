"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Import both
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { IProduct } from "@/types";
import Image from "next/image";
import Rating from "@/components/ui/Rating";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@/store/cartStore"; // Import cart store

// 1. Define the fetcher function
const fetchProduct = async (id: string): Promise<IProduct> => {
  // Use .data.data as per our previous fix
  const { data } = await apiClient.get(`/api/products/${id}`);
  return data.data; 
};

export default function ProductDetailPage() {
  const params = useParams(); // Get URL params
  const id = params.id as string; // Get the 'id' from the URL
  const router = useRouter(); // Initialize router

  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore(); // Get addItem action

  // 2. Use the useQuery hook
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<IProduct, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Don't run query until id is available
  });

  // 3. Handle Loading state
  if (isLoading || !id) {
    return (
      <div className="container mx-auto py-24 text-center">
        <p className="text-xl text-gray-500">Loading product...</p>
      </div>
    );
  }

  // 4. Handle Error state
  if (isError) {
    return (
      <div className="container mx-auto py-24 text-center">
        <p className="text-xl text-red-600">
          Error: {error?.message || "Failed to load product."}
        </p>
      </div>
    );
  }

  // 5. Handle Product Not Found
  if (!product) {
    return (
      <div className="container mx-auto py-24 text-center">
        <p className="text-xl text-gray-500">Product not found.</p>
      </div>
    );
  }

  // 6. Add to Cart handler
  const handleAddToCart = () => {
    addItem(product, quantity); // Call the store action
    console.log(`Added ${quantity} of ${product.name} to cart.`);
    // We could add a redirect or a "toast" notification here
  };

  // 7. JSX for the product details
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Column 1: Product Image */}
          <div className="relative h-96 w-full overflow-hidden rounded-xl shadow-lg md:h-[500px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Column 2: Product Details */}
          <div>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wide text-indigo-600">
              {product.brand}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>

            {/* Price & Rating */}
            <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-4xl font-bold text-gray-900">
                &#2547; {product.price.toLocaleString()}
              </span>
              <div className="flex-shrink-0">
                <Rating rating={product.rating} numReviews={product.numReviews} />
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Description
              </h2>
              <p className="mt-4 text-base text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Status */}
            <div className="mt-8">
              <span className="text-lg font-medium text-gray-900">
                Status:{" "}
                {product.countInStock > 0 ? (
                  <span className="font-semibold text-green-600">In Stock</span>
                ) : (
                  <span className="font-semibold text-red-600">Out of Stock</span>
                )}
              </span>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            {product.countInStock > 0 && (
              <div className="mt-8 flex items-center space-x-4">
                {/* Quantity Selector */}
                <div>
                  <label htmlFor="quantity" className="sr-only">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="rounded-md border border-gray-300 p-3 text-lg focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    {[...Array(product.countInStock).keys()].slice(0, 10).map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-lg font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <FaShoppingCart className="mr-3 h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}