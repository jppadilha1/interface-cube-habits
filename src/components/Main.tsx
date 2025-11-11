"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { makeHabitUseCases } from "@/core/factories/makeHabitUseCases";
import { Habit } from "@/core/domain/entities/Habit";
import { Description } from "@/core/domain/value-objects/description";

export function Main() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [editing, setEditing] = useState<Habit | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [user, setUser] = useState<string | null>(null);
  const userId = JSON.parse(user!);

  const fetchHabits = async () => {
    if (!user) return;
    try {
      const { readAll } = makeHabitUseCases();
      const allHabits = await readAll.execute({ userId: userId.id });
      setHabits(allHabits);
    } catch (e) {
      console.log(`Error in fetchHabits: ${e}`);
      setHabits([]);
    }
  };

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    fetchHabits();
  }, []);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    fetchHabits();
  }, [editing]);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
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
    } catch (e) {
      alert(e);
    }

    formRef.current?.reset();
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;

    const { update } = makeHabitUseCases();

    const formData = new FormData(e.currentTarget);
    const habit = formData.get("habit") as string;

    await update.execute(
      Habit.create(
        editing.id,
        editing.userId,
        Description.create(habit),
        editing.createdAt,
        new Date()
      )
    );

    await fetchHabits();
    formRef.current?.reset();
    setEditing(null);
  }

  async function handleDelete(habit: Habit) {
    const { delet } = makeHabitUseCases();

    await delet.execute({ habitId: habit.id, userId: habit.userId });

    await fetchHabits();
  }

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
              <Button
                variant="ghost"
                size="icon"
                className={
                  editing?.id === habit.id ? "animate-pulse bg-yellow-600" : ""
                }
                onClick={() => {
                  setEditing(habit);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <AlertDialog>
              <TooltipTrigger asChild className="ml-1 cursor-pointer">
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>

              <AlertDialogContent className="border-none">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">
                    Confirmar exclusão
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja deletar este item? Esta ação não pode
                    ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-white cursor-pointer">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => handleDelete(habit)}
                    className="cursor-pointer bg-red-800 hover:bg-red-500"
                  >
                    Deletar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Tooltip>
        </TooltipProvider>
      </li>
    ));
  }

  return (
    <main className="w-4/5 h-[60vh] md:w-3/5 md:h-[60vh] mt-[5%]">
      {editing ? (
        <form
          ref={formRef}
          onSubmit={handleUpdate}
          className="flex items-center"
        >
          <input
            className="h-8 md:h-12 w-3/5 ml-[10%] rounded-xl text-black pl-3 bg-cyan-50"
            type="text"
            name="habit"
            placeholder="Atualize a descrição aqui"
            required
          />
          <button
            type="submit"
            className="h-8 text-sm md:text-xl mr-[10%] ml-[5%] w-[15%] md:h-12 bg-yellow-400 rounded-xl text-cyan-50 font-bold cursor-pointer hover:bg-yellow-600 transition-colors"
          >
            Edit
          </button>
        </form>
      ) : (
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
      )}

      <section className="mt-[10%] md:mt-[5%] min-h-3/4 rounded-lg bg-[#1c1c1c]">
        <h2 className="text-[26px] text-center text-[#0288d1] pt-[3%]">
          MyHabits
        </h2>
        <ul className="pt-[5%] pl-[7%] pb-[5%]">{renderHabits(habits)}</ul>
      </section>
    </main>
  );
}
