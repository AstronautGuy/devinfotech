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
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { CursorProvider } from "@/context/CursorContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.devinfotech.net"),
  title: {
    default: "Devinfotech | Web Development & IT Solutions",
    template: "%s | Devinfotech",
  },
  description: "Devinfotech provides cutting-edge web development, IT solutions, and digital transformation services. Built by Devolve Studio.",
  keywords: ["Web Development", "IT Solutions", "Devinfotech", "Software Agency", "Digital Transformation", "Devolve Studio"],
  openGraph: {
    title: "Devinfotech | Web Development & IT Solutions",
    description: "Devinfotech provides cutting-edge web development, IT solutions, and digital transformation services.",
    url: "https://www.devinfotech.net",
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
  // Global Sitelinks and Organization Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.devinfotech.net/#organization",
        "name": "DevInfotech",
        "url": "https://www.devinfotech.net",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9825039020",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi", "Gujarati"]
        },
        "sameAs": [
          "https://www.facebook.com/devinfotech",
          "https://twitter.com/devinfotech",
          "https://www.linkedin.com/company/devinfotech"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.devinfotech.net/#website",
        "url": "https://www.devinfotech.net",
        "name": "DevInfotech",
        "publisher": {
          "@id": "https://www.devinfotech.net/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.devinfotech.net/products?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CursorProvider>
          <CartProvider>
            <CartDrawer />
            <Preloader />
            <Header />
            <GradientMesh />
            <CustomCursor />
            {children}
            <Analytics />
            <Footer />
          </CartProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
