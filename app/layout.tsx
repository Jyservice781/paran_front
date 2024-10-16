import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import StoreProvider from "./StoreProvider";
import QueryProvider from "./QueryProvider";
//import paranFavicon from "@/app/assets/paran_logo_favicon.png"

export const metadata: Metadata = {
  title: "paranmanzang",
  description: "파란만장 모임 서비스!",
  icons: {
    icon: "../app/assets/paran_logo_favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/app/assets/paran_logo_favicon.png" />
      </head>
      <body>
        <StoreProvider>
        <QueryProvider >
          <Header />
          <main className="mb-6 pb-6">{children}</main>
          <Footer />          
        </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}