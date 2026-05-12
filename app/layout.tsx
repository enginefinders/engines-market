import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import QuoteCheckoutModal from "@/components/checkout/QuoteCheckoutModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Engines Market",
  description:
    "Compare prices for reconditioned, rebuilt and used engines from trusted UK engine specialists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Suspense fallback={null}>
            <QuoteCheckoutModal />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
