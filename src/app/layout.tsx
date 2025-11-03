import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-ignore: Allow side-effect CSS import without type declarations
import "./globals.css";
import Providers from "./providers"; // <-- 1. Import our new Providers

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
        {/* 2. Wrap the children with our Providers component */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}