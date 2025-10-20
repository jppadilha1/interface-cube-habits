import { makeHabitUseCases } from "../../factories/makeHabitUseCases";

describe("makeHabitUseCases Factorie", () => {
  it("should create and return all habit use cases", () => {
    const useCases = makeHabitUseCases();

    expect(useCases.create).toBeDefined();
    expect(useCases.read).toBeDefined();
    expect(useCases.update).toBeDefined();
    expect(useCases.delet).toBeDefined();
  });
});
