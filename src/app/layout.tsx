"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from '../app/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>FinLog - Personal Finance Tracker</title>
        <meta name="description" content="Track your income and expenses easily with FinLog" />
      </head>
      <body>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}