import type { Metadata } from "next";
import "./globals.css";
import Header from "@/_components/Navbar";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import UpgradeLayout from "@/_components/(upgrades)/upgradeLayout";
import LayoutProvider from "@/_components/Provider";
import { Toast } from "@/utils/toast";

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
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className="relative pb-[52px]" suppressHydrationWarning={true}>
        <Header />
        <Suspense fallback={null}>
          <LayoutProvider>{children}</LayoutProvider>
        </Suspense>
        {/* Modal Window */}
        <UpgradeLayout />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          theme="dark"
          transition={Zoom}
        />
        <Toast />
      </body>
    </html>
  );
}
