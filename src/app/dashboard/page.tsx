"use client";
import AllHabitsChart from "@/components/AllHabitsChart";
import StreakChart from "@/components/Streak";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../assets/images/logo.png";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-end h-30 w-full">
        <button
          className="w-45 h-12 bg-blue-500 rounded-xl mr-5 md:mr-30 cursor-pointer hover:bg-[#026aa7] text-cyan-50 font-bold"
          onClick={() => router.push("/")}
        >
          Habit Manager
        </button>
      </div>
      <div className="w-[90vw] h-[80vh] flex flex-col items-center justify-around lg:flex-row">
        <div className="flex flex-col items-start h-full">
          <span className="flex items-center mb-10">
            <h1 className="text-3xl font-bold text-[#0288d1]">
              Check your 1% better!
            </h1>
            <Image
              src={logo}
              alt="CubeHabits Logo"
              width={60}
              height={60}
              unoptimized
            />
          </span>
          <ul>
            <li className="text-white mt-4">
              Ler 20 minutos{" "}
              <Button className="ml-2 bg-green-600 cursor-pointer">Done</Button>
            </li>
            <li className="text-white mt-4">
              Beber 3l d'água{" "}
              <Button className="ml-2 bg-green-600 cursor-pointer">Done</Button>
            </li>
            <li className="text-white mt-4">
              Treinar 1hr por dia{" "}
              <Button className="ml-2 bg-green-600 cursor-pointer">Done</Button>
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-[90vw] h-[60vh] md:flex-row md:w[90vw] md:gap-2 md:mt-5 lg:w-[50vw] items-center justify-around">
          <AllHabitsChart />
          <StreakChart />
        </div>
      </div>
    </>
  );
}
