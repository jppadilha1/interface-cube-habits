import { Description } from "../../../core/domain/value-objects/description";
import { Habit } from "../../../core/domain/entities/Habit";

describe("Entity Habit", () => {
  it("Should create a valid habit", () => {
    const habit = Habit.create(
      "1",
      "1",
      Description.create("Jogar bola 10h por semana"),
      new Date(),
      new Date()
    );
    expect(habit.id).toBe("1");
    expect(habit.userId).toBe("1");
    expect(habit.description.value).toBe("Jogar bola 10h por semana");
    expect(habit.createdAt.getDate()).toBe(new Date().getDate());
    expect(habit.updatedAt.getDate()).toBe(new Date().getDate());
  });
});
