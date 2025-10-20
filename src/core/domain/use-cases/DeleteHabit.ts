import { IHabitRepository } from "../repositories/IHabitRepository";

export class DeleteHabit {
  constructor(readonly habitRepository: IHabitRepository) {}

  async execute(params: { habitId: string; userId: string }): Promise<void> {
    const { habitId, userId } = params;

    await this.habitRepository.delete(habitId, userId);
  }
}
