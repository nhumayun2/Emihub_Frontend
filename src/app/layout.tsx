import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer"; // <-- 1. Import the Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emihub - EMI Without a Credit Card",
  description: "Buy products on EMI using your NID.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            {/* 2. Add the Footer here, below the main content */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
