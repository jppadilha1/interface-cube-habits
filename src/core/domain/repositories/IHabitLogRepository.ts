import { HabitLog } from "../entities/HabitLog";

export interface IHabitLogRepository {
  save(habit: HabitLog): Promise<void>;
  findAll(habitId: string): Promise<HabitLog[] | null>;
}
