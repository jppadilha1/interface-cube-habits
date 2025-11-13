"use client";
import { useState, useEffect } from "react";
import { Habit } from "@/core/domain/entities/Habit";
import { User } from "@/core/domain/entities/User";
import { makeHabitUseCases } from "@/core/factories/makeHabitUseCases";
import { usePathname } from "next/navigation";

interface HabitState {
  habits: Habit[];
  setHabits: (habit: Habit[]) => void;
  user: string | null;
  setUser: (user_localstorage: string | null) => void;
  userId: User;
  fetchHabits: () => void;
}

export function useUserHabits(): HabitState {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const userId = JSON.parse(user!);
  const pathname = usePathname();

  const fetchHabits = async () => {
    const userExist = localStorage.getItem("user");
    if (!userExist) return;

    const userExistId = JSON.parse(userExist);
    try {
      const { readAll } = makeHabitUseCases();
      const allHabits = await readAll.execute({ userId: userExistId.id });
      setHabits(allHabits);
    } catch (e) {
      console.log(`Error in fetchHabits: ${e}`);
      setHabits([]);
    }
  };

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    fetchHabits();
  }, [pathname]);

  return {
    habits,
    setHabits,
    user,
    setUser,
    userId,
    fetchHabits,
  };
}
