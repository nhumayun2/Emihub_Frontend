import Link from "next/link";
import React from "react";

// We'll use these as placeholder icons for now.
// Later, we'll install 'react-icons' to make them real.
const SocialIcon = ({ name }: { name: string }) => (
  <span className="cursor-pointer rounded-full border border-gray-600 p-2 text-gray-400 hover:border-white hover:text-white">
    {name.substring(0, 2)}
  </span>
);

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 1. Brand/About Section */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white">
              Emihub
            </Link>
            <p className="mt-4 text-sm">
              Buy your favorite products on EMI without a credit card. All you
              need is your NID.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialIcon name="Facebook" />
              <SocialIcon name="Twitter" />
              <SocialIcon name="Instagram" />
            </div>
          </div>

          {/* 2. Quick Links Section */}
          <div>
            <h5 className="font-semibold text-white">Quick Links</h5>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-white">
                  Shops
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Account Section */}
          <div>
            <h5 className="font-semibold text-white">My Account</h5>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white">
                  My Cart
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-white">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info Section */}
          <div>
            <h5 className="font-semibold text-white">Contact Info</h5>
            <p className="mt-4 text-sm">
              Dhaka, Dhaka Division, Bangladesh
              <br />
              <strong>Phone:</strong> +880 123 456 789
              <br />
              <strong>Email:</strong> support@emihub.com
            </p>
          </div>
        </div>

        {/* Bottom Bar (Copyright) */}
        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Emihub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
