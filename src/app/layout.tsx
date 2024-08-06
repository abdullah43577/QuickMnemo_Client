import type { Metadata } from "next";
import "./globals.css";
import Header from "@/_components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
