import { Habit } from "../../../domain/entities/Habit";
import { Description } from "../../../domain/value-objects/description";
import { MockHabitRepository } from "../../../infra/mocks/MockHabitRepository";

describe("MockHabitRepository", () => {
  it("Should create a habit correctly", async () => {
    const HabitRepository = MockHabitRepository.getInstance();
    const habit = Habit.create(
      "1",
      "1",
      Description.create("Jogar bola 10h por semana"),
      new Date(),
      new Date()
    );

    await expect(HabitRepository.save(habit)).resolves.not.toThrow();
    const habitData = await HabitRepository.findById("1", "1");
    expect(habitData).toBeInstanceOf(Habit);
  });
});
