import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { NotificationProvider } from "@/components/NotificationContext";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game id store",
  description: "The best place to buy games is",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <CartProvider>
            <NotificationProvider>
              <Navbar />
              {children}
              <Footer />
            </NotificationProvider>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}


