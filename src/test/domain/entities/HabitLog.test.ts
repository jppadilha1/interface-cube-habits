import { HabitLog } from "../../../core/domain/entities/HabitLog";

describe("Entity HabitLog", () => {
  it("Should create a valid HabitLog instance", () => {
    const log = HabitLog.create("1", "1", new Date());

    expect(log.id).toBe("1");
    expect(log.habitId).toBe("1");
    expect(log.doneAt.getDate()).toBe(new Date().getDate());
  });
});
