import { makeHabitLogUseCase } from "../../core/factories/makeHabitLogsUseCases";

describe("makeHabitLogUseCases Factorie", () => {
  it("should register and find all log use cases", () => {
    const useCases = makeHabitLogUseCase();

    expect(useCases.findAll).toBeDefined();
    expect(useCases.register).toBeDefined();
  });
});
