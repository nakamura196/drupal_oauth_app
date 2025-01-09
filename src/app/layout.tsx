// app/layout.js
"use client";

import { SessionProvider } from "next-auth/react";

import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />

          <main>{children}</main>

          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
