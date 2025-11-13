"use client";
import AllHabitsChart from "@/components/AllHabitsChart";
import StreakChart from "@/components/Streak";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { AuthGuard } from "@/context/AuthContext";
import { Habit } from "@/core/domain/entities/Habit";
import { useUserHabits } from "@/hooks/useUserHabits";
import { makeHabitLogUseCase } from "@/core/factories/makeHabitLogsUseCases";
import { useState } from "react";

export default function Dashboard() {
  const { habits } = useUserHabits();
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [doneToday, setDoneToday] = useState<Habit[]>([]);
  const [habitsStreaks, setHabitsStreaks] = useState<
    { habit: string; streak: number }[]
  >([]);

  async function handleCheck(habit: Habit) {
    try {
      const { register } = makeHabitLogUseCase();
      await register.execute({
        id: `${Math.floor(Math.random() * (1000 - 4 + 1)) + 4}`,
        habitId: habit.id,
        doneAt: new Date(),
      });

      setCurrentStreak((prev) => prev + 1);
      setDoneToday((prev) => [...prev, habit]);

      const streakbyHabit = await fetchStreakByHabit(habit);

      // Update or Add
      setHabitsStreaks((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.habit === habit.description.value
        );

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            habit: habit.description.value,
            streak: streakbyHabit,
          };
          return updated;
        } else {
          return [
            ...prev,
            { habit: habit.description.value, streak: streakbyHabit },
          ];
        }
      });
    } catch (e) {
      alert("Error in Check the Habit");
    }
  }

  async function fetchStreakByHabit(habit: Habit): Promise<number> {
    try {
      const { findAll } = makeHabitLogUseCase();
      const allLogs = await findAll.execute(habit.id);
      return allLogs.length;
    } catch (e) {
      alert("Error in fetch logs");
      return 0;
    }
  }

  function renderHabits(habits: Habit[]) {
    if (habits.length === 0) {
      return <li className="text-gray-500">Nenhum hábito cadastrado</li>;
    }

    return habits.map((habit) => (
      <li className="text-white mt-4" key={habit.id}>
        {habit.description.value}
        <Button
          className={`ml-2 bg-green-600 cursor-pointer ${
            doneToday.includes(habit) ? "hidden" : ""
          }`}
          onClick={() => {
            handleCheck(habit);
          }}
        >
          Done
        </Button>
      </li>
    ));
  }

  return (
    <>
      <AuthGuard>
        <div className="flex items-center justify-end h-30 w-full">
          <Link
            className="flex items-center justify-center w-30 md:w-45 h-12 bg-blue-500 rounded-xl mr-10 md:mr-30 cursor-pointer hover:bg-[#026aa7] text-cyan-50 font-bold"
            href="/"
          >
            Habit Manager
          </Link>
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
            <ul>{renderHabits(habits!)}</ul>
          </div>
          <div className="flex flex-col w-[90vw] h-[60vh] md:flex-row md:w[90vw] md:gap-2 md:mt-5 lg:w-[50vw] items-center justify-around">
            <AllHabitsChart logsByHabit={habitsStreaks} />
            <StreakChart streak={currentStreak} />
          </div>
        </div>
      </AuthGuard>
    </>
  );
}
