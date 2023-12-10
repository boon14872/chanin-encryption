import type { Metadata } from "next";
import { Itim } from "next/font/google";
import "./globals.css";

const itim = Itim({ subsets: ["latin", "thai"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Data Encryption System",
  description:
    "it is a system that can encrypt and decrypt data. this project is a part of the subject COM 3414-63 Cybersecurity, Computer Science, Rajaphat Chiangmai University @2023",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={itim.className}>
        <>
          <div className="min-h-screen bg-purple-400 flex justify-center items-center overflow-hidden relative">
            <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block" />
            <div className="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block" />
            {children}
            <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block" />
            <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block" />
          </div>
        </>
      </body>
    </html>
  );
}
