import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import dotenv from "dotenv";
dotenv.config()

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Likerest",
  description: "Application for an artist to gain famousity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          poppins.className +
          ` overflow-x-hidden scroll-smooth relative m-0 p-0`
        }
      >
        {children}
        <Analytics />
        <ToastContainer />
      </body>
    </html>
  );
}
