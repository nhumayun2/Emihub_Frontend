"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { IProduct } from "@/types";
import ProductCard from "@/components/shared/ProductCard";

// 1. Define the shape of the API response
interface ProductsResponse {
  products: IProduct[];
  page: number;
  pages: number;
  count: number;
}

// 2. Define the fetcher function
const fetchProducts = async (): Promise<ProductsResponse> => {
  const { data } = await apiClient.get("/api/products");
  console.log("Get Products API Response:", data);
  return data.data;
};

export default function ProductsPage() {
  // 3. Use the useQuery hook
  const {
    data: productsData,
    isLoading,
    isError,
    error,
  } = useQuery<ProductsResponse, Error>({
    queryKey: ["products"], // The unique key for this query
    queryFn: fetchProducts, // The function to fetch the data
  });

  // 4. Handle Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-xl text-gray-500">Loading products...</p>
        {/* We can add a skeleton loader here later for a modern feel */}
      </div>
    );
  }

  // 5. Handle Error state
  if (isError) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-xl text-red-600">
          Error: {error?.message || "Failed to load products."}
        </p>
      </div>
    );
  }

  // 6. Handle Success state
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            All Products
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find the best products, available for EMI.
          </p>
        </header>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(productsData?.products || []).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* We can add Pagination controls here later */}
      </div>
    </div>
  );
}
