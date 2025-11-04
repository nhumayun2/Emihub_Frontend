import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/shared/Navbar"; // <-- 1. Import the Navbar

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
          {/* 2. Add the Navbar here, above the page content */}
          <Navbar />
          <main>{children}</main>
          {/* We will add a Footer component here later */}
        </Providers>
      </body>
    </html>
  );
}