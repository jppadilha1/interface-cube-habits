"use client";
import { Main } from "../components/Main";
import Image from "next/image";
import logo from "../assets/images/logo.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <header className="flex items-center justify-between h-30 w-full">
        <span className="flex items-center ml-30">
          <Image
            src={logo}
            alt="CubeHabits Logo"
            width={60}
            height={60}
            unoptimized
          />
          <h1 className="text-3xl font-bold text-[#0288d1]">CubeHabits</h1>
        </span>
        <button
          className="w-45 h-12 bg-blue-500 rounded-xl mr-30 cursor-pointer hover:bg-[#026aa7] text-cyan-50 font-bold"
          onClick={() => router.push("/dashboard")}
        >
          My progress
        </button>
      </header>
      <Main />
    </>
  );
}
