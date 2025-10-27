import { Habit } from "../../../core/domain/entities/Habit";
import { MockHabitRepository } from "../../../core/infra/mocks/MockHabitRepository";
import { Description } from "../../../core/domain/value-objects/description";
import { CreateHabit } from "../../../core/domain/use-cases/CreateHabit";
import { FindHabits } from "../../../core/domain/use-cases/FindHabit";

describe("CreateHabit Use Case", () => {
  it("should create a habit", async () => {
    const habitRepository = MockHabitRepository.getInstance();
    const habit = Habit.create(
      "4",
      "user1",
      Description.create("Ir à academia 3x por semana"),
      new Date(),
      new Date()
    );

    await new CreateHabit(habitRepository).execute(habit);

    const findHabits = await new FindHabits(habitRepository).execute({
      userId: "user1",
    });

    const habit4 = findHabits.filter((habit) => habit.id == "4");

    expect(habit4).toBeDefined();
    expect(habit4[0]).toBe(habit);
  });
});
