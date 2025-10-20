import { Habit } from "../../../domain/entities/Habit";
import { MockHabitRepository } from "../../../infra/mocks/MockHabitRepository";
import { Description } from "../../../domain/value-objects/description";
import { CreateHabit } from "../../../domain/use-cases/CreateHabit";
import { FindHabit } from "../../../domain/use-cases/FindHabit";

describe("FindHabit Use Case", () => {
    it("should find a habit by id", async () => {
        const habitRepository = MockHabitRepository.getInstance();
        const habit = Habit.create('1','1', Description.create("Ir à academia 3x por semana"),new Date(), new Date())

        await new CreateHabit(habitRepository).execute(habit)

        const findHabit = await new FindHabit(habitRepository).execute({habitId: '1', userId: '1'})

        expect(findHabit).toBe(habit)
    })

    it("should return Habit not found", async () => {
        const habitRepository = MockHabitRepository.getInstance();
        const habit = Habit.create('1','1', Description.create("Ir à academia 3x por semana"),new Date(), new Date())

        await new CreateHabit(habitRepository).execute(habit)

        await expect(new FindHabit(habitRepository).execute({habitId: '1', userId: '2'})).rejects.toThrow('Habit not found')
    })
})