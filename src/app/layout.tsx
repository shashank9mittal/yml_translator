import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yml-translator-bpseutcze-shashank9mittals-projects.vercel.app'),
  title: "YML Processor - Free Online YAML Translation Tool",
  description: "Transform and translate YAML configurations instantly. Upload Excel files to translate labels in JSON, YAML, and escaped JSON formats. Free online tool for developers and DevOps teams.",
  keywords: [
    "YAML translator",
    "JSON translator",
    "YAML processor",
    "configuration translator",
    "Excel to YAML",
    "DevOps tools",
    "YAML converter",
    "JSON converter",
    "translation tool",
    "developer tools",
    "configuration management",
    "internationalization",
    "i18n",
    "localization",
    "l10n"
  ],
  authors: [{ name: "YML Processor Team" }],
  creator: "YML Processor",
  publisher: "YML Processor",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yml-translator-bpseutcze-shashank9mittals-projects.vercel.app',
    siteName: 'YML Processor',
    title: 'YML Processor - Free Online YAML Translation Tool',
    description: 'Transform and translate YAML configurations instantly. Upload Excel files to translate labels in JSON, YAML, and escaped JSON formats.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'YML Processor - YAML Translation Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YML Processor - Free Online YAML Translation Tool',
    description: 'Transform and translate YAML configurations instantly. Upload Excel files to translate labels.',
    images: ['/og-image.png'],
    creator: '@ymlprocessor',
  },
  alternates: {
    canonical: 'https://yml-translator-bpseutcze-shashank9mittals-projects.vercel.app',
  },
  category: 'Developer Tools',
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
        {children}
      </body>
    </html>
  );
}
