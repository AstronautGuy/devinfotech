import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { GradientMesh } from "@/components/GradientMesh";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import React from "react";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://devinfotech.net"),
  title: {
    default: "Devinfotech | Web Development & IT Solutions",
    template: "%s | Devinfotech",
  },
  description: "Devinfotech provides cutting-edge web development, IT solutions, and digital transformation services. Built by Devolve Studio.",
  keywords: ["Web Development", "IT Solutions", "Devinfotech", "Software Agency", "Digital Transformation", "Devolve Studio"],
  openGraph: {
    title: "Devinfotech | Web Development & IT Solutions",
    description: "Devinfotech provides cutting-edge web development, IT solutions, and digital transformation services.",
    url: "https://devinfotech.net",
    siteName: "Devinfotech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devinfotech | Web Development & IT Solutions",
    description: "Devinfotech provides cutting-edge web development, IT solutions, and digital transformation services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Preloader />
        <Header />
        <GradientMesh />
        <CustomCursor />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
