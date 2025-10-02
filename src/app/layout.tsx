import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cube Habits",
  description: "Your favorite Habit Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center`}
      >
        <header className="flex items-center justify-between h-30 w-full">
          <span className="flex items-center ml-30">
            <Image
              src="/logo.png"
              alt="Logo CubeHabits"
              width={60}
              height={60}
              unoptimized
            />
            <h1 className="text-3xl font-bold text-[#0288d1]">CubeHabits</h1>
          </span>
          <button className="w-45 h-12 bg-blue-500 rounded-xl mr-30">
            My progress
          </button>
        </header>
        {children}
      </body>
    </html>
  );
}
