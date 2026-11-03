import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
