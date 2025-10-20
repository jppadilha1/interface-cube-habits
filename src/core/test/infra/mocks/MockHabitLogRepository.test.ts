import { HabitLog } from "../../../domain/entities/HabitLog";
import { MockHabitLogRepository } from "../../../infra/mocks/MockHabitLogRepository";

describe("MockHabitLogRepository", () => {
  it("Should create a log correctly", async () => {
    const HabitLogRepository = MockHabitLogRepository.getIstance();
    const log = HabitLog.create("1", "1", new Date());

    await expect(HabitLogRepository.save(log)).resolves.not.toThrow();
    const logData = await HabitLogRepository.findAll("1");
    expect(logData?.length).toBeGreaterThan(0);
  });
});
