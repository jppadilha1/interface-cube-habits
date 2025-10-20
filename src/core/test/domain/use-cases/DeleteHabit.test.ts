import { DeleteHabit } from "../../../domain/use-cases/DeleteHabit";
import { Habit } from "../../../domain/entities/Habit";
import { Description } from "../../../domain/value-objects/description";
import { CreateHabit } from "../../../domain/use-cases/CreateHabit";
import { MockHabitRepository } from "../../../infra/mocks/MockHabitRepository";

describe("DeleteHabit Use Case", () => {
  it("should delete a habit by id", async () => {
    const habitRepository = MockHabitRepository.getInstance();
    const habit = Habit.create(
      "1",
      "1",
      Description.create("Ir à academia 3x por semana"),
      new Date(),
      new Date()
    );

    await new CreateHabit(habitRepository).execute(habit);

    await new DeleteHabit(habitRepository).execute({
      habitId: habit.id,
      userId: habit.userId,
    });

    const verify = await habitRepository.findById("1", "1");

    expect(verify).toBeNull();
  });
});
