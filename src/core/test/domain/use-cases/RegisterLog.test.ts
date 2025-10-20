import { HabitLog } from "../../../domain/entities/HabitLog";
import { RegisterLog } from "../../../domain/use-cases/RegisterLog";
import { MockHabitLogRepository } from "../../../infra/mocks/MockHabitLogRepository";

describe("RegisterLog UseCase", () => {
  it("Should create log correctly", async () => {
    const HabitLogRepository = MockHabitLogRepository.getIstance();

    await new RegisterLog(HabitLogRepository).execute({
      id: "1",
      habitId: "1",
      doneAt: new Date(),
    });

    const habitLog = await HabitLogRepository.findAll("1");

    expect(habitLog?.length).toBeGreaterThan(0);
    expect(habitLog![0]).toStrictEqual(
      HabitLog.create("1", "1", habitLog![0].doneAt)
    );
  });
});
