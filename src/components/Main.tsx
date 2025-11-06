"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, Trash2 } from "lucide-react";
import { makeHabitUseCases } from "@/core/factories/makeHabitUseCases";
import { Habit } from "@/core/domain/entities/Habit";
import { Description } from "@/core/domain/value-objects/description";
import { User } from "@/core/domain/entities/User";

export function Main() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [user, setUser] = useState<string | null>(null);
  const userId = JSON.parse(user!);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { create } = makeHabitUseCases();

    const formData = new FormData(e.currentTarget);
    const habit = formData.get("habit") as string;
    await create.execute(
      Habit.create(
        `${Math.floor(Math.random() * (1000 - 4 + 1)) + 4}`,
        userId.id,
        Description.create(habit),
        new Date(),
        new Date()
      )
    );
    await fetchHabits();

    formRef.current?.reset();
  }

  const fetchHabits = async () => {
    if (!user) return;
    const { readAll } = makeHabitUseCases();
    const allHabits = await readAll.execute({ userId: userId.id });
    setHabits(allHabits);
  };

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    fetchHabits();
  }, []);

  function renderHabits(habits: Habit[]) {
    if (habits.length === 0) {
      return <li className="text-gray-500">Nenhum hábito cadastrado</li>;
    }
    return habits.map((habit) => (
      <li
        className="mb-2 text-cyan-50 w-[90%] flex items-center"
        key={habit.id}
      >
        <span className="p-2 break-word">{habit.description.value}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className="ml-2 cursor-pointer">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4 " />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className="ml-1 cursor-pointer">
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 " />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </li>
    ));
  }

  return (
    <main className="w-4/5 h-[60vh] md:w-3/5 md:h-[60vh] mt-[5%]">
      <form ref={formRef} onSubmit={handleAdd} className="flex items-center">
        <input
          className="h-8 md:h-12 w-3/5 ml-[10%] rounded-xl text-black pl-3 bg-cyan-50"
          type="text"
          name="habit"
          required
        />
        <button
          type="submit"
          className="h-8 text-sm md:text-xl mr-[10%] ml-[5%] w-[15%] md:h-12 bg-[#0288d1] rounded-xl text-cyan-50 font-bold cursor-pointer hover:bg-[#026aa7] transition-colors"
        >
          Add
        </button>
      </form>

      <section className="mt-[10%] md:mt-[5%] min-h-3/4 rounded-lg bg-[#1c1c1c]">
        <h2 className="text-[26px] text-center text-[#0288d1] pt-[3%]">
          MyHabits
        </h2>
        <ul className="pt-[5%] pl-[7%] pb-[5%]">{renderHabits(habits)}</ul>
      </section>
    </main>
  );
}
