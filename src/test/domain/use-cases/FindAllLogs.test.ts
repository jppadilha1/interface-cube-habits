import { HabitLog } from "../../../core/domain/entities/HabitLog";
import { FindAllLogs } from "../../../core/domain/use-cases/FindAllLogs";
import { RegisterLog } from "../../../core/domain/use-cases/RegisterLog";
import { MockHabitLogRepository } from "../../../core/infra/mocks/MockHabitLogRepository";

describe("FindAllLogs UseCase", () => {
  it("Should create log correctly", async () => {
    const HabitLogRepository = MockHabitLogRepository.getIstance();

    await new RegisterLog(HabitLogRepository).execute({
      id: "1",
      habitId: "1",
      doneAt: new Date("2025-10-09"),
    });

    await new RegisterLog(HabitLogRepository).execute({
      id: "2",
      habitId: "1",
      doneAt: new Date("2025-10-10"),
    });

    await new RegisterLog(HabitLogRepository).execute({
      id: "3",
      habitId: "1",
      doneAt: new Date("2025-10-11"),
    });

    const habitLog = await new FindAllLogs(HabitLogRepository).execute("1");

    expect(habitLog?.length).toEqual(3);
  });
});
