// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "./providers";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Kasta SaaS",
  description: "Premium scroll-driven websites and SaaS templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/SF-Pro.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <PostHogProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64">
              <div className="container mx-auto px-8 py-8">
                {children}
              </div>
            </main>
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}