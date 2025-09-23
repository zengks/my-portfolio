import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionWrapper from "./components/SessionWrapper";
import NavBar from "./components/UI/NavBar";
import Footer from "./components/UI/Footer";

import "./globals.css";
import "@/styles/component.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CZ",
  description: "CZ's portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-sky-300 via-sky-200 to-sky-100 animate-gradient-xy`}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl -z-10" />
        <div className="glass-container outer-glass-container h-screen">
          <NavBar />
          <SessionWrapper>{children}</SessionWrapper>
        </div>
        <Footer />
      </body>
    </html>
  );
}
