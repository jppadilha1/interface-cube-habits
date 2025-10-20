import { Habit } from "../entities/Habit";
import { IHabitRepository } from "../repositories/IHabitRepository";

export class FindHabits {
  constructor(readonly habitRepository: IHabitRepository) {}

  async execute(params: { userId: string }): Promise<Habit[]> {
    const { userId } = params;

    const habit = await this.habitRepository.findAll(userId);

    if (!habit) {
      throw new Error("Habit not found");
    }

    return habit;
  }
}
