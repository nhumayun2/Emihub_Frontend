"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  // 1. Get the login action from our auth store
  const { login } = useAuthStore();
  const router = useRouter();

  // 2. Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 3. Input Change Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 4. Form Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 5. Send data to the API endpoint
      const response = await apiClient.post(
        "/api/users/login", //
        formData
      );

      // --- ADD THIS LINE FOR DEBUGGING ---
      console.log("Login API Response:", response.data);
      // -------------------------------------

      // 6. On success
      if (response.status === 200) {
        const { user, token } = response.data.data; // <-- PROBLEM MIGHT BE HERE
        // Use our Zustand store to save the user and token
        login(user, token);
        // Redirect to the user dashboard
        router.push("/dashboard");
      }
    } catch (err: any) {
      // 7. On failure
      setIsLoading(false);

      // --- ALSO ADD THIS LINE FOR DEBUGGING ---
      console.error("Login API Error:", err.response);
      // ------------------------------------------

      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 404)
      ) {
        // "Invalid credentials" or "User not found"
        setError(err.response.data.message || "Invalid email or password");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // 8. JSX for the form
  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/auth/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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

          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />

          {/* Error Message */}
          {error && (
            <div className="rounded-md border border-red-300 bg-red-50 p-3 text-center text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
