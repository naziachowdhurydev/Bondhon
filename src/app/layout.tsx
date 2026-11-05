import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("bondhon-theme")==="dark"){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark"}}catch(error){console.error("Unable to load saved theme:",error)}',
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--card)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
            },
            success: {
              iconTheme: {
                primary: "#2A9D8F",
                secondary: "#FFF8F3",
              },
            },
          }}
        />

        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
