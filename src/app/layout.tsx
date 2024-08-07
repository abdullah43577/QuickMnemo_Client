import type { Metadata } from "next";
import "./globals.css";
import Header from "@/_components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "QuickMnemo",
  description: "QuickMnemo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative pb-[52px]" suppressHydrationWarning={true}>
        <Header />
        <Suspense fallback={null}>{children}</Suspense>
        <ToastContainer />
      </body>
    </html>
  );
}
