"use client";
import { Main } from "../components/Main";
import Image from "next/image";
import logo from "../assets/images/logo.png";
import { AuthGuard } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <AuthGuard>
        <header className="flex items-center justify-between h-30 w-full">
          <span className="flex items-center ml-10 md:ml-30">
            <Image
              src={logo}
              alt="CubeHabits Logo"
              width={60}
              height={60}
              unoptimized
            />
            <h1 className="hidden md:flex text-3xl font-bold text-[#0288d1]">
              CubeHabits
            </h1>
          </span>
          <Link
            className="flex items-center justify-center w-30 md:w-45 h-12 bg-blue-500 rounded-xl mr-10 md:mr-30 cursor-pointer hover:bg-[#026aa7] text-cyan-50 font-bold"
            href="/dashboard"
          >
            My progress
          </Link>
        </header>
        <div className="w-full flex items-center justify-center">
          <Main />
        </div>
      </AuthGuard>
    </>
  );
}
