import { Habit } from "../entities/Habit";

export interface IHabitRepository {
  save(habit: Habit): Promise<void>;
  findById(habitId: string, userId: string): Promise<Habit | null>;
  findAll(userId: string): Promise<Habit[] | null>;
  update(habit: Habit): Promise<void>;
  delete(habitId: string, userId: string): Promise<void>;
}
