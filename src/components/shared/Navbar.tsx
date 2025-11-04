"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  // 1. Get the state and actions from our auth store
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Emihub
            </Link>
          </div>

          {/* Main Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/products"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Products
              </Link>
              <Link
                href="/companies"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Shops
              </Link>
              {/* We'll add cart/wishlist links here later */}
            </div>
          </div>

          {/* Auth Links (Login/Register or Profile/Logout) */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* 2. Conditionally render links based on user state */}
              {user ? (
                // If user IS logged in
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Hi, {user.firstName}
                  </Link>
                  <button
                    onClick={logout}
                    className="ml-4 rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // If user IS NOT logged in
                <>
                  <Link
                    href="/auth/login"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="ml-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* Mobile menu button will be added later */}
        </div>
      </div>
    </nav>
  );
}