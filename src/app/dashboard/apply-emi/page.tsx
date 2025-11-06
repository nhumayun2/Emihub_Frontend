"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/store/authStore";
import { IUser } from "@/types"; // Import the IUser interface

export default function ApplyEmiPage() {
  const router = useRouter();
  // 1. Get user, token, AND the 'login' function
  // We need 'login' to *update* the user in the store
  const { user, token, login } = useAuthStore();

  // 2. Auth/Hydration check (same as dashboard)
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace("/auth/login");
    }
  }, [isHydrated, user, router]);

  // 3. Form State
  const [formData, setFormData] = useState({
    nidNumber: "",
    street: "",
    city: "",
    postalCode: "",
    country: "Bangladesh", // Default country
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 4. Input Change Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 5. Form Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Prepare the payload as per the API docs
    const payload = {
      nidNumber: formData.nidNumber,
      address: {
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
    };

    try {
      // 6. Send data to the API endpoint
      const response = await apiClient.post(
        "/api/users/apply-for-emi",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // <-- Protected route!
          },
        }
      );

      // 7. On success
      if (response.status === 200) {
        // The response body is the *updated* user object
        const updatedUser: IUser = response.data;

        // CRITICAL: Update the global store with the new user info
        // This will update their emiStatus from "not_applied" to "pending_review"
        if (token) {
          login(updatedUser, token);
        }

        // Redirect back to the dashboard to see the new status
        router.push("/dashboard");
      }
    } catch (err: any) {
      // 8. On failure
      setIsLoading(false);
      if (
        err.response &&
        (err.response.status === 400 || err.response.status === 401)
      ) {
        setError(err.response.data.message || "Application failed.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // 9. Loading/Auth Check
  if (!isHydrated || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  // 10. JSX for the form
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Apply for EMI
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Submit your NID and address for admin approval. This is a one-time
            process.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* NID Number */}
          <input
            name="nidNumber"
            type="text"
            required
            className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="National ID (NID) Number"
            onChange={handleChange}
            value={formData.nidNumber}
          />

          {/* Street Address */}
          <input
            name="street"
            type="text"
            required
            className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Street Address"
            onChange={handleChange}
            value={formData.street}
          />

          {/* City & Postal Code */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <input
              name="city"
              type="text"
              required
              className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="City"
              onChange={handleChange}
              value={formData.city}
            />
            <input
              name="postalCode"
              type="text"
              required
              className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Postal Code"
              onChange={handleChange}
              value={formData.postalCode}
            />
          </div>

          {/* Country (Read-only) */}
          <input
            name="country"
            type="text"
            readOnly
            className="w-full rounded-md border-gray-300 bg-gray-100 p-3 text-gray-500 shadow-sm"
            value={formData.country}
          />

          {/* Error Message */}
          {error && (
            <div className="rounded-md border border-red-300 bg-red-50 p-3 text-center text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4">
            <Link
              href="/dashboard"
              className="rounded-md px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
