"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";

export default function RegisterPage() {
  // 1. Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "", // Date of Birth
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 2. Input Change Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Form Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default browser form submission
    setError(null);

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);

    try {
      // 4. Send data to the API endpoint
      const response = await apiClient.post(
        "/api/users/register", //
        formData
      );

      // 5. On success
      if (response.status === 201) {
        // Redirect to the login page or a "please verify" page
        // For now, let's go to the login page.
        router.push("/auth/login");
      }
    } catch (err: any) {
      // 6. On failure
      setIsLoading(false);
      if (
        err.response &&
        (err.response.status === 409 || err.response.status === 400)
      ) {
        // e.g., Email/Phone exists or passwords don't match on backend
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      // This 'finally' block might be redundant if we redirect on success,
      // but it's good practice if we were to just show a success message.
      setIsLoading(false);
    }
  };

  // 7. JSX for the form
  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <input
              name="firstName"
              type="text"
              required
              className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              name="lastName"
              type="text"
              required
              className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>

          {/* Email */}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Email address"
            onChange={handleChange}
            value={formData.email}
          />

          {/* Phone & DOB */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <input
              name="phone"
              type="tel"
              required
              className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Phone Number"
              onChange={handleChange}
              value={formData.phone}
            />
            <input
              name="dob"
              type="date"
              required
              className="w-full rounded-md border-gray-300 p-3 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Date of Birth"
              onChange={handleChange}
              value={formData.dob}
            />
          </div>

          {/* Password */}
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />

          {/* Confirm Password */}
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />

          {/* Error Message */}
          {error && (
            <div className="rounded-md border border-red-300 bg-red-50 p-3 text-center text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
