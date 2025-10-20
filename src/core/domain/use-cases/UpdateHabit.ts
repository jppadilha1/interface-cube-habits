import { Habit } from "../entities/Habit";
import { IHabitRepository } from "../repositories/IHabitRepository";

export class UpdateHabit {
  constructor(readonly habitRepository: IHabitRepository) {}

  async execute(habit: Habit): Promise<Habit> {
    const savedHabit = await this.habitRepository.findById(
      habit.id,
      habit.userId
    );

    if (!savedHabit) {
      throw new Error("Habit not found");
    }

    const newData = {
      newDescription: habit.description
        ? habit.description
        : savedHabit.description,
      newUpdatedAt: new Date(),
    };

    const updated = Habit.create(
      habit.id,
      habit.userId,
      newData.newDescription,
      habit.createdAt,
      newData.newUpdatedAt
    );

    await this.habitRepository.update(updated);

    return updated;
  }
}
