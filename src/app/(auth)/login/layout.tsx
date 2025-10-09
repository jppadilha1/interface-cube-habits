import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { Header } from "../../../components/Header";

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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
        <Header />
        {children}
      </div>
    </div>
  );
}
