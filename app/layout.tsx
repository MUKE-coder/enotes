import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Entrepreneur Notes - Smart Note-Taking App",
    template: "%s | Entrepreneur Notes",
  },
  description:
    "Smart note-taking for busy entrepreneurs. Capture ideas, organize thoughts, and boost productivity with AI-powered insights. By JB",
  keywords: [
    "note-taking",
    "entrepreneur",
    "productivity",
    "business",
    "ideas",
    "organization",
    "AI notes",
  ],
  authors: [{ name: "JB" }],
  creator: "Entrepreneur Notes",
  publisher: "Entrepreneur Notes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yourappdomain.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourappdomain.com",
    title: "Entrepreneur Notes - Smart Note-Taking for Entrepreneurs",
    description:
      "Capture ideas, organize thoughts, and boost productivity with AI-powered insights.",
    siteName: "Entrepreneur Notes",
    images: [
      {
        url: "/og-image.png", // Create and add this image
        width: 1200,
        height: 630,
        alt: "Entrepreneur Notes - Smart Note-Taking App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrepreneur Notes - Smart Note-Taking for Entrepreneurs",
    description:
      "Capture ideas, organize thoughts, and boost productivity with AI-powered insights.",
    creator: "@entrepreneurnotes", // Replace with your actual Twitter handle
    images: ["/og-image.png"], // Create and add this image
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

  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Entrepreneur Notes",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#3b82f6",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
