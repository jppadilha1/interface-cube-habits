import { Habit } from "../entities/Habit";
import { IHabitRepository } from "../repositories/IHabitRepository";

export class CreateHabit {
    constructor(readonly habitRepository: IHabitRepository) {}

    async execute(habit: Habit): Promise<void> {
        await this.habitRepository.save(habit);
    }
}