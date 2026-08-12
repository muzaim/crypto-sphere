import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { WatchlistProvider } from "@/lib/watchlist-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CryptoSphere - Professional Crypto Information Platform",
  description: "Secure. Decentralized. Limitless. Real-time cryptocurrency listings, insights, charts, news, and learning tools.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#12132a] text-white flex flex-col`}
      >
        <WatchlistProvider>
          <Navbar />
          {/* Main flex-grow pushes footer to bottom on short pages */}
          <main className="flex-grow pt-24 sm:pt-28 md:pt-32 relative">
            {children}
          </main>
          <Footer />
        </WatchlistProvider>
      </body>
    </html>
  );
}
