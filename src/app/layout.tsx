import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Bondhon | Connect, Serve, Make a Difference",
    template: "%s | Bondhon",
  },
  description:
    "Bondhon is a community platform where people discover social service events, volunteer together, and create meaningful change.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-(--background) text-(--foreground)">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
