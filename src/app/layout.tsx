import type { Metadata } from "next";
import "./globals.css";
import Header from "@/_components/Navbar";

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
      </body>
    </html>
  );
}
