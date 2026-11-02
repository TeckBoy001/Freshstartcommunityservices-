import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const montserratAlt = Montserrat_Alternates({
  variable: "--font-montserrat-alt",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fresh Start Community Services, Inc.",
    template: "%s | Fresh Start Community Services",
  },
  description:
    "Fresh Start Community Services, Inc. provides compassionate support for youth, families, women, men, seniors, and Indigenous community members — offering programs in job training, case management, mentorship, and more.",
  keywords: [
    "nonprofit",
    "community services",
    "youth programs",
    "job training",
    "case management",
    "Fresh Start Community Services",
    "FSC",
  ],
  metadataBase: new URL("https://freshstartcommunityservices.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://freshstartcommunityservices.com",
    siteName: "Fresh Start Community Services, Inc.",
    title: "Fresh Start Community Services, Inc.",
    description:
      "Providing an array of compassionate services for individuals and families across underserved communities — with love, integrity, and without judgment.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fresh Start Community Services, Inc.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fresh Start Community Services, Inc.",
    description:
      "Providing an array of compassionate services for individuals and families across underserved communities.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserratAlt.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
