import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Beyond UI - Modern Blog Platform",
    template: "%s | Beyond UI Blog",
  },
  description:
    "Discover insightful articles and tutorials on web development, design, and technology. A modern blog built with Next.js and cutting-edge technologies.",
  keywords: [
    "blog",
    "web development",
    "design",
    "technology",
    "tutorials",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Beyond UI Team" }],
  creator: "Beyond UI",
  publisher: "Beyond UI",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oronium-assigment.vercel.app",
    siteName: "Beyond UI Blog",
    title: "Beyond UI - Modern Blog Platform",
    description:
      "Discover insightful articles and tutorials on web development, design, and technology.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beyond UI Blog - Modern Blog Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond UI - Modern Blog Platform",
    description:
      "Discover insightful articles and tutorials on web development, design, and technology.",
    creator: "@beyondui",
    images: ["/og-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://oronium-assigment.vercel.app/" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-4 py-2 rounded z-50"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
