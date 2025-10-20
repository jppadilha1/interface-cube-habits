import { Habit } from "../../../domain/entities/Habit";
import { MockHabitRepository } from "../../../infra/mocks/MockHabitRepository";
import { Description } from "../../../domain/value-objects/description";
import { CreateHabit } from "../../../domain/use-cases/CreateHabit";
import { UpdateHabit } from "../../../domain/use-cases/UpdateHabit";

describe("UpdateHabit Use Case", () => {
  it("should update a habit", async () => {
    const habitRepository = MockHabitRepository.getInstance();
    const habit = Habit.create(
      "1",
      "1",
      Description.create("Ir à academia 3x por semana"),
      new Date(),
      new Date()
    );

    await new CreateHabit(habitRepository).execute(habit);

    const updatedHabit = await new UpdateHabit(habitRepository).execute(
      Habit.create(
        "1",
        "1",
        Description.create("Ir à academia 3x por semana. seg,ter,sex."),
        new Date(),
        new Date()
      )
    );

    expect(updatedHabit).not.toEqual(habit);
  });

  it("should not update if habit not found", async () => {
    const habitRepository = MockHabitRepository.getInstance();
    const habit = Habit.create(
      "1",
      "1",
      Description.create("Ir à academia 3x por semana"),
      new Date(),
      new Date()
    );

    await new CreateHabit(habitRepository).execute(habit);

    await expect(
      new UpdateHabit(habitRepository).execute(
        Habit.create(
          "1",
          "2",
          Description.create("Ir à academia 3x por semana. seg,ter,sex."),
          new Date(),
          new Date()
        )
      )
    ).rejects.toThrow();
  });
});
