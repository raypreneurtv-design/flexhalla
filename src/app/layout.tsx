import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flexhalla - Brawlhalla Combo Training & Stats Tracker",
  description: "Master Brawlhalla combos with personalized training recommendations. Analyze your stats, discover weaknesses, and improve your rank with AI-powered combo guides.",
  keywords: "Brawlhalla combos, Brawlhalla training, Brawlhalla stats, true combos, combo guide, legend combos, Brawlhalla tier list",
  authors: [{ name: "Flexhalla" }],
  creator: "Flexhalla",
  publisher: "Flexhalla",
  metadataBase: new URL("https://flexhalla.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flexhalla - Brawlhalla Combo Training & Stats Tracker",
    description: "Master Brawlhalla combos with personalized training recommendations. Analyze your stats and improve your rank.",
    url: "https://flexhalla.com",
    siteName: "Flexhalla",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flexhalla - Brawlhalla Training Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flexhalla - Brawlhalla Combo Training",
    description: "Master Brawlhalla combos with AI-powered training recommendations.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://flexhalla.com/#webapp",
      name: "Flexhalla",
      description: "AI-powered Brawlhalla training companion with combo guides and stats analysis",
      url: "https://flexhalla.com",
      applicationCategory: "GameApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "VideoGame",
      "@id": "https://flexhalla.com/#brawlhalla",
      name: "Brawlhalla",
      gamePlatform: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"],
      genre: ["Fighting", "Platform Fighter"],
      publisher: {
        "@type": "Organization",
        name: "Blue Mammoth Games",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://flexhalla.com/#organization",
      name: "Flexhalla",
      url: "https://flexhalla.com",
      logo: "https://flexhalla.com/logo.png",
      description: "AI-powered Brawlhalla training and combo recommendation platform",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
