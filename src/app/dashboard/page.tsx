"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  // 1. Handle auth state and client-side hydration
  const [isHydrated, setIsHydrated] = useState(false);

  // 2. Wait for the store to rehydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 3. Check for user. If not logged in after hydration, redirect.
  useEffect(() => {
    if (isHydrated && !user) {
      router.replace("/auth/login");
    }
  }, [isHydrated, user, router]);

  // 4. Show a loading state until hydration is complete
  if (!isHydrated || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-xl text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  // 5. Helper function to render EMI status with nice styling
  const renderEmiStatus = () => {
    switch (user.emiStatus) {
      case "approved":
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
            EMI Approved
          </span>
        );
      case "pending_review":
        return (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
            Pending Review
          </span>
        );
      case "rejected":
        return (
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
            EMI Rejected
          </span>
        );
      case "not_applied":
      default:
        return (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-800">
            Not Applied
          </span>
        );
    }
  };

  // 6. Main dashboard content
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Welcome, {user.firstName}!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Here's a summary of your account and EMI status.
        </p>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Column 1: EMI Status & Profile */}
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Your EMI Status
              </h3>
              <div className="my-4 flex items-center justify-between">
                <p className="text-gray-600">Current status:</p>
                {renderEmiStatus()}
              </div>
              {user.emiStatus === "not_applied" && (
                <div className="mt-6 rounded-md border border-blue-200 bg-blue-50 p-4">
                  <p className="font-medium text-blue-700">
                    Want to buy products on EMI without a credit card?
                  </p>
                  <Link
                    href="/dashboard/apply-emi"
                    className="mt-2 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                  >
                    Apply Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links (Sidebar) */}
        <aside className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900">
              Account Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/dashboard/profile"
                  className="font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/orders"
                  className="font-medium text-indigo-600 hover:text-indigo-800"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="font-medium text-indigo-600 hover:text-indigo-800"
                >
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
