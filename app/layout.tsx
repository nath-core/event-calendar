import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventForge India — Tech Event Aggregator",
  description: "Neo-Brutalist event discovery for Indian B.Tech CSE students — CTFs, hackathons, workshops, college fests.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@300;400;700;800&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-neo-white text-neo-black">{children}</body>
    </html>
  );
}
