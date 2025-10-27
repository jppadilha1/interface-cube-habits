import { makeHabitUseCases } from "../../core/factories/makeHabitUseCases";

describe("makeHabitUseCases Factorie", () => {
  it("should create and return all habit use cases", () => {
    const useCases = makeHabitUseCases();

    expect(useCases.create).toBeDefined();
    expect(useCases.readAll).toBeDefined();
    expect(useCases.update).toBeDefined();
    expect(useCases.delet).toBeDefined();
  });
});
